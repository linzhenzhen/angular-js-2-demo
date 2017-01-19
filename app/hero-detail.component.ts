/**
 * Created by linzhenzhen on 17/1/19.
 * 英雄详情页
 */
// Keep the Input import for now, we will remove it later
import { Component, Input, OnInit } from '@angular/core';  // 导入装饰器
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Hero } from './hero';
import { HeroService } from './hero.service';

// 使用 Component 创建元数据
@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: ['hero-detail.component.css']
})

// 导出类
export class HeroDetailComponent implements OnInit {

  // hero属性
  @Input() hero: Hero;

  // switchMap运算符如何将可观察的路由参数中的 id 映射到一个新的Observable, 即HeroService.getHero方法的结果
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.update(this.hero).then(() => this.goBack());
  }
}
