import { Injectable } from '@angular/core';
import * as SC from 'soundcloud';
import {observable} from 'rxjs/symbol/observable';

@Injectable()
export class SoundCloudService {
  constructor() { }

  initialize() {
    SC.initialize({
      client_id: 'ggX0UomnLs0VmW7qZnCzw'
    });
  }
  search(params: string) {
    return SC.get('/tracks', {
      q: params, limit: 30, offset: 50
    }).then(function(tracks) {
      return (tracks);
    });
  }
  saveSearchHistory(searchedItem) {
    const searchHistory = this.getSearchHistory();
    if (searchHistory.length === 5) {
      searchHistory.pop();
    }
    searchHistory.unshift(searchedItem);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }
  getSearchHistory() {
    if ('searchHistory' in localStorage) {
      return JSON.parse(localStorage.getItem('searchHistory'));
    }else {
      return [];
    }
  }
  embedSound(track_url) {
    return SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
      return(oEmbed);
    });
  }

}
