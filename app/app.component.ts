/**
 * Created by linzhenzhen on 17/1/19.
 * 主入口 "壳"
 */
import { Component } from  '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active"> Dashboard </a>
      <a routerLink="/heroes" routerLinkActive="active"> Heroes </a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app.component.css']
})
export class AppComponent {
  // 组件中的属性, 单向数据绑定的'插值表达式'
  title = 'Tour of Heroes';
}
