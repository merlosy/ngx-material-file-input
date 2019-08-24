import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  menuOpened = true;

  menuDisplayMode: 'over' | 'push' | 'side';

  constructor(public breakpointObserver: BreakpointObserver){}

  ngOnInit(): void {
    // Improve experience for mobile demo
    this.breakpointObserver
      .observe('(max-width: 992px)')
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
            this.menuDisplayMode = 'over';
        } else {
          this.menuDisplayMode = 'side';
        }
      });
  }

  onNavigate() {
    if (this.menuDisplayMode === 'over') {
      this.menuOpened = false;
    }
  }

}
