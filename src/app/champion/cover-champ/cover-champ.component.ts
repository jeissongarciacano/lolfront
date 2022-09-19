import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentfulService } from 'src/service/contentful.service';

@Component({
  selector: 'app-cover-champ',
  templateUrl: './cover-champ.component.html',
  styleUrls: ['./cover-champ.component.css']
})
export class CoverChampComponent implements OnInit {

  constructor(private route: ActivatedRoute, private contentfulService: ContentfulService) { }

  public champion: any;
  public resp: any;

  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap: any) => {
      const { params } = paramMap
      this.getChampion(params.id);
    })

  }

  getChampion(id: string) {
    this.contentfulService.getChampionId(id).then((champ) => {
      this.champion = champ;
    })
  }

}
