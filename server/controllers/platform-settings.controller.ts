import { Request, Response } from "express";
import { PlatformSettingsRepository } from "../repositories/platform-settings.repository";

export class PlatformSettingsController {
  /**
   * GET /api/settings
   * Returns the current platform settings.
   */
  static async getSettings(_req: Request, res: Response) {
    try {
      const settings = await PlatformSettingsRepository.getSettings();
      res.json(settings);
    } catch (error) {
      console.error("[settings] Failed to fetch settings:", error);
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  }

  /**
   * PATCH /api/settings
   * Updates the allowAgents toggle. Admin only.
   */
  static async updateSettings(req: Request, res: Response) {
    try {
      const { allowAgents } = req.body;

      if (typeof allowAgents !== "boolean") {
        res.status(400).json({ error: "Invalid value for allowAgents" });
        return;
      }

      const settings = await PlatformSettingsRepository.setAllowAgents(allowAgents);
      res.json(settings);
    } catch (error) {
      console.error("[settings] Failed to update settings:", error);
      res.status(500).json({ error: "Failed to update settings" });
    }
  }
}
