/**
 * Created by linzhenzhen on 17/1/19.
 * 服务, 模拟获取英雄数据
 * 获取数据, 可以从任何地方获取: 网络服务器, 浏览器的局部存储区, 模拟的数据源
 */
import { Injectable } from '@angular/core';  // 导入装饰器

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from "./hero";
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {

  // 简单调用模拟数据
  //getHeroes(): Hero[] {
  //  return HEROES;
  //}

  // 返回Promise, 模拟了一个超快、零延迟的超级服务器
  //getHeroes(): Promise<Hero[]> {
  //  return Promise.resolve(HEROES);
  //}

  // 模拟 http 请求延迟 2s 在提供数据
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve => setTimeout(resolve, 2000)).then(() => this.getHeroes());
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
  }

  // Get 发起http请求, 模拟 web api
  private heroesUrl = 'app/heroes';

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }

  // Update
  private headers = new Headers({'Content-Type': 'application/json'});

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  // Create
  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Delete
  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}
