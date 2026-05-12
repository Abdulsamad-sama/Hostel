import db from "@/lib/db";

export class PlatformSettingsRepository {
  private static readonly SINGLETON_ID = "singleton";

  /**
   * Get the current platform settings.
   * If they don't exist, they are created with default values.
   */
  static async getSettings() {
    let settings = await db.platformSettings.findUnique({
      where: { id: this.SINGLETON_ID },
    });

    if (!settings) {
      settings = await db.platformSettings.create({
        data: {
          id: this.SINGLETON_ID,
          allowAgents: true,
        },
      });
    }

    return settings;
  }

  /**
   * Update the allowAgents setting.
   */
  static async setAllowAgents(allow: boolean) {
    return db.platformSettings.upsert({
      where: { id: this.SINGLETON_ID },
      update: { allowAgents: allow },
      create: {
        id: this.SINGLETON_ID,
        allowAgents: allow,
      },
    });
  }
}
