/**
 * Created by linzhenzhen on 17/1/19.
 * Dashboard
 */
import { Component, OnInit } from '@angular/core';

import { Hero } from "./hero";
import { HeroService } from "./hero.service";

@Component({
  moduleId: module.id,       // 相对模块家在templateUrl
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  // 创建一个heroes数组属性
  heroes: Hero[] = [];

  // 在构造函数中注入HeroService，并且把它保存在一个私有的heroService字段中
  constructor(private heroService: HeroService) { }

  // 在 Angular 的ngOnInit生命周期钩子里面调用服务来获得英雄数据。
  ngOnInit(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1, 5));
  }
}
