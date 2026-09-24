import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="landing-page">
      <!-- Navbar -->
      <nav class="navbar">
        <div class="nav-container">
          <div class="brand">
            <svg class="brand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            RouteWise
          </div>
          <div class="nav-links">
            <a href="#how-it-works">How It Works</a>
            <a href="#benefits">Benefits</a>
            <a href="#teams">For Teams</a>
          </div>
          <div class="nav-actions">
            <a routerLink="/planner" class="btn btn-primary">Optimize My Route</a>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <header class="hero">
        <div class="hero-content">
          <h1>Plan smarter.<br><span class="text-gradient">Deliver faster.</span></h1>
          <p class="hero-subtitle">
            RouteWise turns multiple deliveries and field tasks into an efficient, easy-to-follow route — helping individuals and teams spend less time planning and more time moving.
          </p>
          <div class="hero-cta">
            <a routerLink="/planner" class="btn btn-primary btn-large">Optimize My Route</a>
            <a routerLink="/planner" class="btn btn-secondary btn-large">For Teams & Companies</a>
          </div>
        </div>
        
        <div class="hero-visual">
          <div class="isometric-map">
            <!-- 3D CSS Map Elements -->
            <div class="map-base">
              <div class="road horizontal road-1"></div>
              <div class="road horizontal road-2"></div>
              <div class="road vertical road-3"></div>
              <div class="road vertical road-4"></div>
              
              <div class="building b-1"></div>
              <div class="building b-2"></div>
              <div class="building b-3"></div>
              
              <svg class="route-line" viewBox="0 0 400 400">
                <path d="M 80,120 L 250,120 L 250,280 L 150,280" stroke="var(--accent)" stroke-width="6" fill="none" stroke-dasharray="10 10" class="animated-line" />
              </svg>
              
              <div class="marker m-start"></div>
              <div class="marker m-waypoint"></div>
              <div class="marker m-end">
                <div class="pin"></div>
                <div class="pulse"></div>
              </div>
            </div>
          </div>
          
          <!-- Floating UI Cards -->
          <div class="floating-card fc-1">
            <div class="fc-label">Today's Stops</div>
            <div class="fc-value">12 Stops</div>
          </div>
          <div class="floating-card fc-2">
            <div class="fc-label">Estimated Time</div>
            <div class="fc-value">2h 18m</div>
          </div>
          <div class="floating-card fc-3">
            <div class="fc-icon">✓</div>
            <div class="fc-text">Route Ready</div>
          </div>
        </div>
      </header>

      <!-- How It Works Section -->
      <section id="how-it-works" class="section">
        <div class="container">
          <div class="section-header text-center">
            <h2>How RouteWise Works</h2>
            <p>From a chaotic list to a streamlined plan in three simple steps.</p>
          </div>
          <div class="steps-grid">
            <div class="step-card">
              <div class="step-number">01</div>
              <h3>Add Your Stops</h3>
              <p>Enter deliveries, tasks, customer locations, or field visits quickly and easily.</p>
            </div>
            <div class="step-card">
              <div class="step-number">02</div>
              <h3>Prioritize & Organize</h3>
              <p>Mark important stops and make last-minute changes whenever your schedule changes.</p>
            </div>
            <div class="step-card">
              <div class="step-number">03</div>
              <h3>Optimize & Go</h3>
              <p>RouteWise organizes the journey so you can spend less time figuring out where to go and more time completing your work.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Time Management Section -->
      <section id="benefits" class="section bg-alt">
        <div class="container">
          <div class="two-col align-center">
            <div class="text-content">
              <h2>Your day shouldn't be spent planning your day.</h2>
              <p class="lead">RouteWise helps delivery workers and field employees take control of their time and reduce stress.</p>
              
              <ul class="benefit-list">
                <li>
                  <div class="b-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div>
                    <h4>Spend less time planning</h4>
                    <p>Stop manually figuring out the order of multiple stops.</p>
                  </div>
                </li>
                <li>
                  <div class="b-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <h4>Reduce unnecessary travel</h4>
                    <p>Avoid avoidable backtracking and wasted movement with an efficient sequence.</p>
                  </div>
                </li>
                <li>
                  <div class="b-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  </div>
                  <div>
                    <h4>Handle urgent changes</h4>
                    <p>Add a new delivery during the day without manually rebuilding the entire plan.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="visual-content">
              <div class="dashboard-mockup">
                <div class="mockup-header">
                  <div class="dots"><span></span><span></span><span></span></div>
                  <div class="mockup-title">Route Overview</div>
                </div>
                <div class="mockup-body">
                  <div class="m-stop high-priority">
                    <div class="m-dot">1</div>
                    <div class="m-info">
                      <div class="m-title">Downtown Office Complex</div>
                      <div class="m-desc">Priority Delivery</div>
                    </div>
                  </div>
                  <div class="m-stop">
                    <div class="m-dot">2</div>
                    <div class="m-info">
                      <div class="m-title">Westside Cafe</div>
                      <div class="m-desc">Standard Drop-off</div>
                    </div>
                  </div>
                  <div class="m-stop">
                    <div class="m-dot">3</div>
                    <div class="m-info">
                      <div class="m-title">North Park Residence</div>
                      <div class="m-desc">Standard Drop-off</div>
                    </div>
                  </div>
                  <div class="m-summary">
                    <span>Total: 8 Stops</span>
                    <span class="accent-text">Est. 1h 45m</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- For Teams Section -->
      <section id="teams" class="section">
        <div class="container text-center">
          <div class="section-label">Built for teams — coming soon</div>
          <h2 class="section-title">One platform for every route your team runs.</h2>
          <p class="section-subtitle">Company assigns tasks → Employee receives assignments → RouteWise optimizes the route → Employee completes deliveries → Company gets visibility</p>
          
          <div class="teams-grid">
            <div class="team-card">
              <div class="tc-header">
                <div class="avatar">R</div>
                <div>
                  <div class="tc-name">Rahul</div>
                  <div class="tc-role">Driver</div>
                </div>
              </div>
              <div class="tc-stats">
                <div class="stat"><span class="val">8</span> deliveries</div>
                <div class="stat"><span class="val">12:00 PM</span> – 5:00 PM</div>
              </div>
              <div class="tc-status success">Route Active</div>
            </div>
            
            <div class="team-card">
              <div class="tc-header">
                <div class="avatar">P</div>
                <div>
                  <div class="tc-name">Priya</div>
                  <div class="tc-role">Field Tech</div>
                </div>
              </div>
              <div class="tc-stats">
                <div class="stat"><span class="val">6</span> visits</div>
                <div class="stat"><span class="val">10:00 AM</span> – 3:00 PM</div>
              </div>
              <div class="tc-status pending">Pending Start</div>
            </div>
            
            <div class="team-card">
              <div class="tc-header">
                <div class="avatar">A</div>
                <div>
                  <div class="tc-name">Amit</div>
                  <div class="tc-role">Courier</div>
                </div>
              </div>
              <div class="tc-stats">
                <div class="stat"><span class="val">14</span> deliveries</div>
                <div class="stat"><span class="val">9:00 AM</span> – 4:00 PM</div>
              </div>
              <div class="tc-status warning">Route Delayed</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Use Cases Section -->
      <section class="section bg-alt">
        <div class="container">
          <div class="section-header text-center">
            <h2>Who is RouteWise For?</h2>
            <p>Anyone who has multiple locations to visit in a day.</p>
          </div>
          <div class="use-cases-grid">
            <div class="uc-tag">Delivery & Logistics</div>
            <div class="uc-tag">E-commerce</div>
            <div class="uc-tag">Field Service</div>
            <div class="uc-tag">Local Businesses</div>
            <div class="uc-tag">Sales & Reps</div>
            <div class="uc-tag">Independent Couriers</div>
          </div>
        </div>
      </section>

      <!-- Product Preview Section -->
      <section class="section">
        <div class="container">
          <div class="preview-card">
            <div class="preview-content">
              <h2>Ready to see it in action?</h2>
              <p>Experience the RouteWise optimizer today and see how easily you can organize your next trip.</p>
              <a routerLink="/planner" class="btn btn-primary btn-large">Try RouteWise Optimizer</a>
            </div>
            <div class="preview-image-container">
               <div class="preview-ui">
                 <div class="p-sidebar">
                   <div class="p-header">Route Planner</div>
                   <div class="p-stop"><span class="dot"></span> Warehouse (Start)</div>
                   <div class="p-stop"><span class="dot highlight"></span> Client A (High Priority)</div>
                   <div class="p-stop"><span class="dot"></span> Client B</div>
                   <div class="p-btn">Optimize Route</div>
                 </div>
                 <div class="p-map">
                   <div class="p-path"></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Final CTA -->
      <section class="section cta-section text-center">
        <div class="container">
          <h2>Turn a list of stops into a plan.</h2>
          <p class="cta-subtitle">Whether you're delivering independently or coordinating work across a team, RouteWise helps turn scattered locations into a route you can act on.</p>
          <div class="cta-actions">
            <a routerLink="/planner" class="btn btn-primary btn-large">Optimize My Route</a>
            <a routerLink="/planner" class="btn btn-secondary btn-large">For Teams & Companies</a>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <div class="container footer-content">
          <div class="footer-brand">
            <div class="brand">
              <svg class="brand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              RouteWise
            </div>
            <p>Smart route planning for modern delivery and field operations.</p>
          </div>
          <div class="footer-links">
            <div class="link-group">
              <h4>Product</h4>
              <a routerLink="/planner">Optimizer</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#teams">For Teams</a>
            </div>
            <div class="link-group">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
        <div class="container footer-bottom">
          <p>&copy; 2026 RouteWise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `,
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
}
