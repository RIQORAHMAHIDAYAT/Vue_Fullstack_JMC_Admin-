<template>
  <header class="navbar navbar-expand-lg d-print-none sticky-top" id="navbar">
    <div class="container-xl justify-content">
      <button
        class="sidebar-toggler d-none d-lg-block"
        type="button"
        @click="toggleSidebar()"
      >
        <span class="sidebar-icon"></span>
      </button>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebar-menu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-nav flex-row order-md-last ms-md-auto">
        <button
          @click="toggleTheme()"
          class="nav-link px-0 btn-toggle-theme hide-theme-dark"
          title="Enable dark mode"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          type="button"
        >
          <!-- Download SVG icon from http://tabler-icons.io/i/moon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"
            />
          </svg>
        </button>
        <button
          @click="toggleTheme()"
          class="nav-link px-0 btn-toggle-theme hide-theme-light"
          title="Enable light mode"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          type="button"
        >
          <!-- Download SVG icon from http://tabler-icons.io/i/moon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
            <path
              d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"
            ></path>
          </svg>
        </button>
        <div class="nav-item dropdown">
          <a
            href="#"
            class="nav-link d-flex lh-1 text-reset p-0 me-3"
            data-bs-toggle="dropdown"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"
              ></path>
              <path d="M9 17v1a3 3 0 0 0 6 0v-1"></path>
            </svg>
            <span class="badge bg-red"></span>
          </a>
          <div
            class="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card"
          >
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Last updates</h3>
              </div>
              <div class="list-group list-group-flush list-group-hoverable">
                <div class="list-group-item">
                  <div class="row align-items-center">
                    <div class="col-auto">
                      <span
                        class="status-dot status-dot-animated bg-red d-block"
                      ></span>
                    </div>
                    <div class="col text-truncate">
                      <a href="#" class="text-body d-block">Example 1</a>
                      <div class="d-block text-secondary text-truncate mt-n1">
                        Change deprecated html tags to text decoration classes
                        (#29604)
                      </div>
                    </div>
                    <div class="col-auto">
                      <a href="#" class="list-group-item-actions">
                        <!-- Download SVG icon from http://tabler-icons.io/i/star -->
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon text-muted"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path
                            d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="list-group-item">
                  <div class="row align-items-center">
                    <div class="col-auto">
                      <span class="status-dot d-block"></span>
                    </div>
                    <div class="col text-truncate">
                      <a href="#" class="text-body d-block">Example 2</a>
                      <div class="d-block text-secondary text-truncate mt-n1">
                        justify-content:between ⇒ justify-content:space-between
                        (#29734)
                      </div>
                    </div>
                    <div class="col-auto">
                      <a href="#" class="list-group-item-actions show">
                        <!-- Download SVG icon from http://tabler-icons.io/i/star -->
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon text-yellow"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path
                            d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="list-group-item">
                  <div class="row align-items-center">
                    <div class="col-auto">
                      <span class="status-dot d-block"></span>
                    </div>
                    <div class="col text-truncate">
                      <a href="#" class="text-body d-block">Example 3</a>
                      <div class="d-block text-secondary text-truncate mt-n1">
                        Update change-version.js (#29736)
                      </div>
                    </div>
                    <div class="col-auto">
                      <a href="#" class="list-group-item-actions">
                        <!-- Download SVG icon from http://tabler-icons.io/i/star -->
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon text-muted"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path
                            d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="list-group-item">
                  <div class="row align-items-center">
                    <div class="col-auto">
                      <span
                        class="status-dot status-dot-animated bg-green d-block"
                      ></span>
                    </div>
                    <div class="col text-truncate">
                      <a href="#" class="text-body d-block">Example 4</a>
                      <div class="d-block text-secondary text-truncate mt-n1">
                        Regenerate package-lock.json (#29730)
                      </div>
                    </div>
                    <div class="col-auto">
                      <a href="#" class="list-group-item-actions">
                        <!-- Download SVG icon from http://tabler-icons.io/i/star -->
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon text-muted"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path
                            d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="nav-item dropdown">
          <a
            href="#"
            class="nav-link d-flex lh-1 text-reset p-0 dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <span class="bg-primary text-white avatar rounded-circle">
              {{ getInitials("User Name") }}
            </span>
            <div class="d-none d-xl-block ps-2">
              <div class="fw-bold">USER NAME</div>
              <div class="mt-1 small text-primary">USER ROLE</div>
            </div>
          </a>
          <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <a href="?page=profile" class="dropdown-item"
              ><i class="bi bi-person me-2"></i> My Profile</a
            >
            <a href="?page=change-password" class="dropdown-item"
              ><i class="bi bi-key me-2"></i> Change Password</a
            >
            <div class="dropdown-divider"></div>
            <a href="logout.php" class="dropdown-item text-danger"
              ><i class="bi bi-box-arrow-right me-2"></i> Logout</a
            >
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const { toggleTheme } = useTheme();
const { toggleSidebar } = useSidebar();
</script>
