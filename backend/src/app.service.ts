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

        // TODO: доделать работу со сделками, чтобы подсоединялись все принадлежащие сущности!
        const filteredLeads = await this.getResponsibles(leads);

        return leads;
      })
      .catch((e) => console.log(e));
  }

  async getResponsibles(leads) {
    const newLeads = await leads.map(async (lead) => {
      const responsibleUserName = await this.getUser(lead.responsible_user_id);

      return {
        key: lead.id,
        name: lead.name,
        budget: lead.price,
        status: lead.status_id,
        responsible: responsibleUserName,
        date: lead.created_at,
      };
    });

    return newLeads;
  }

  async getUser(responsibleUserId) {
    return await axiosInstanse
      .get(`https://llongpoblwc.amocrm.ru/api/v4/users/${responsibleUserId}`)
      .then((response) => response.data.name);
  }
}
