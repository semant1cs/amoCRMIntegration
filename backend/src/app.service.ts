import axios from 'axios';
import { Injectable } from '@nestjs/common';
import axiosInstanse from './api';

@Injectable()
export class AppService {
  async getLeads() {
    return await axiosInstanse
      .get('https://llongpoblwc.amocrm.ru/api/v4/leads')
      .then(async (response) => {
        const leads = response.data._embedded.leads;
        let filteredLeads = [];
        let normalizedLeads = [];

        await Promise.all(
          leads.map((lead) => axiosInstanse(`https://llongpoblwc.amocrm.ru/api/v4/users/${lead.responsible_user_id}`))
        ).then((results) => {
          filteredLeads = results.map((res) => res.data.name);
        });

        normalizedLeads = this.normalizeLeads(leads, filteredLeads);

        return normalizedLeads;
      })
      .catch((e) => console.log(e));
  }

  normalizeLeads(leads, filteredLeads) {
    return leads.map((lead, index) => {
      return {
        key: lead.id,
        name: lead.name,
        budget: lead.price,
        status: lead.status_id,
        responsible: filteredLeads[index],
        date: lead.created_at,
      };
    });
  }
}
