/**
 * Created by linzhenzhen on 17/1/19.
 * 英雄列表
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';


@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: [ 'heroes.component.css' ]

})

export class HeroesComponent implements OnInit {  // OnInit 生命周期钩子

  // 组件中创建一个heroes的数组属性, 不需要定义heroes的数据类型, 由 TypeScript 自动推断
  //heroes = HEROES;
  heroes: Hero[];

  // 组件中类的的对象实例 - 动态选择生成当前对象
  selectedHero: Hero;

  // 初始化
  ngOnInit(): void {
    this.getHeroes();
  }

  // 注入一个Service, 定义一个私有的 service 属性
  // 当创建一个Component实例时, Angular知道需要先提供一个Service实例
  // 创建注入之前, 需要注册一个注册商 Providers 在 @Component 装饰器中
  constructor(
    private router: Router,
    private heroService: HeroService
  ) { }

  // 事件: 选中当前对象 赋值并记录当前选中的对象
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  // 获取模拟数据, Promise被解决时在行动, 做该做的赋值
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  // Add
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  // Delete
  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
  }
}
