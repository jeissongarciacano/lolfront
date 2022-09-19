import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';

const CONFIG = {
  space: '3z392wln8jjc',
  accessToken:
    'LexQP5EP23jRJ0RhN7819AVk9kzoJI_60WgGO2DTbo4',
  contentTypeIds: {
    lolChampions: 'lolChampions',
    hechizo: 'hechizo',
    itemslol: 'itemslol'
  },
};

@Injectable()
export class ContentfulService {

  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken
  });

  getChampions(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: CONFIG.contentTypeIds.lolChampions
    }, query))
      .then(res => res.items);
  }

  async getChampionId(id: string) {
    const entry = await this.cdaClient.getEntry(id)
    return entry.fields;
  }

  getSpell(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: CONFIG.contentTypeIds.hechizo
    }, query))
      .then(res => res.items);
  }

  getItems(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: CONFIG.contentTypeIds.itemslol
    }, query))
      .then(res => res.items);
  }

}
