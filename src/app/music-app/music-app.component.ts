import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {SoundCloudService} from '../sound-cloud.service';

import {Observable} from 'rxjs/Observable';
import {ArrayType} from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-music',
  templateUrl: './music-app.component.html',
  styleUrls: ['./music-app.component.css']
})
export class MusicAppComponent implements OnInit, OnDestroy {
  private counter = 0;
  tracksResult = <any>[];
  userSearch: string;
  tracksToPresent = <any>[];
  showNextButton = false;
  searchHistory: string[] = [];
  selectedTrackImg = '';

  constructor(private soundCloudService: SoundCloudService) {
  }

  ngOnInit() {
    this.soundCloudService.initialize();
    this.searchHistory = this.soundCloudService.getSearchHistory();
  }

  ngOnDestroy() {
  }

  resetSearchParams() {
    this.tracksResult = [];
    this.counter = 0;
    this.showNextButton = true;
  }

  search(itemToSearch?) {
    this.resetSearchParams();
    this.userSearch = itemToSearch? itemToSearch : this.userSearch;
    const tracks = this.soundCloudService.search(this.userSearch).then((res) => {
      let i, sixTracksArray;
      const chunk = 6, j = res.length;
      for (i = 0, j; i < j; i += chunk) {
        sixTracksArray = res.slice(i, i + chunk);
        this.tracksResult.push(sixTracksArray);
      }
      this.tracksToPresent = this.tracksResult[0];
      this.updateHistory();

    });
  }

  showNextSearchResults() {
    if (this.counter < this.tracksResult.length - 1) {
      this.counter++;
      this.tracksToPresent = this.tracksResult[this.counter];
    }
    if (this.counter === this.tracksResult.length - 1) {
      this.showNextButton = false;
    }
  }

  updateHistory() {
    this.soundCloudService.saveSearchHistory(this.userSearch);
    this.searchHistory = this.soundCloudService.getSearchHistory();
  }

  selectedTrackData(selectedTrack) {
    if (selectedTrack.artwork_url) {
      const imgURL = selectedTrack.artwork_url.replace('large', 'crop');
      this.selectedTrackImg = imgURL;
    }
    this.soundCloudService.embedSound(selectedTrack.permalink_url).then((res) => {
      const iframeHTML = document.getElementsByTagName("iframe");
      iframeHTML[0].src = res.html.match('src\s*=\s*"(.+?)"')[1];
    });
  }
}

