import { PrismaDataSource } from '@/shared/datasource/PrismaDataSource';
import VCard from 'vcard-creator';

export class VcardDataSource extends PrismaDataSource {
  private userDb = this.prisma.user;

  /**
   * Generates a vCard for a user given their ID.
   * @param id_user - The ID of the user.
   * @returns An object containing vCard data, headers, and filename.
   * @throws Will throw an error if the user is not found.
   */
  public async getCreateVcard(id: string) {
    const user = await this.userDb.findFirst({
      where: { idUser: id },
      include: {
        department: true,
        position: true,
      },
    });

    // Check if the user exists
    if (!user) {
      throw new Error('User not found in the database');
    }

    const vCard = new VCard();

    // Add email to vCard if it exists
    if (user.email) {
      vCard.addEmail(user.email, 'WORK');
    }

    // Add phone number to vCard if it exists
    if (user.phoneNumber) {
      vCard.addPhoneNumber(user.phoneNumber, 'CELL');
    }

    // Add full name to vCard if it exists
    if (user.fullName) {
      vCard.addName(user.fullName);
    }

    // Add job title to vCard if it exists
    if (user.position?.title) {
      vCard.addJobtitle(user.position.title);
    }

    const vCardData = vCard.toString();

    const headers = {
      'Content-Type': 'text/vcard',
      'Content-Disposition': `attachment; filename="${user.fullName || 'contact'}.vcf"`,
    };

    return {
      vCardData,
      headers,
      filename: `${user.fullName || 'contact'}.vcf`,
    };
  }
}
