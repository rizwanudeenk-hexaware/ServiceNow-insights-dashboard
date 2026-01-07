import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class WidgetsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getWidgetMappings(): Promise<Record<string, string>> {
    try {
      const supabase = this.supabaseService.getClient();
      const { data, error } = await supabase
        .from('dashboard_widget_mapping')
        .select('name, widget_id')
        .eq('dashboard_id', 1);

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }

      const widgetMappings: Record<string, string> = {};
      for (const row of data) {
        widgetMappings[row.name] = row.widget_id;
      }

      return widgetMappings;
    } catch (error) {
      console.error('Error in getWidgetMappings:', error);
      throw error;
    }
  }
}
