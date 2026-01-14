<!-- Sage App Home Screen (Dark Mode) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage - Home</title>
<!-- Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind Config -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "primary": "#37ec13",
              "primary-dark": "#2ec50f",
              "background-light": "#f6f8f6",
              "background-dark": "#132210",
              "surface-dark": "#1c2e19",
              "surface-light": "#ffffff",
            },
            fontFamily: {
              "display": ["Inter", "sans-serif"]
            },
            borderRadius: {
              "DEFAULT": "0.5rem",
              "lg": "1rem", 
              "xl": "1.5rem", 
              "2xl": "2rem",
              "full": "9999px"
            },
            boxShadow: {
              'swiss': '0 4px 20px rgba(0, 0, 0, 0.2)',
            }
          },
        },
      }
    </script>
<style>
        /* Custom scrollbar hide for cleaner UI */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white antialiased transition-colors duration-300 min-h-screen relative pb-24">
<!-- Top Header -->
<header class="flex items-center justify-between px-6 py-6 sticky top-0 z-10 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
<div class="flex flex-col">
<span class="text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-[#a1b99d]">Thursday, Oct 24</span>
<h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-0.5">Good evening, Sage</h1>
</div>
<button class="relative group overflow-hidden rounded-full size-10 bg-gray-200 dark:bg-surface-dark flex items-center justify-center">
<img alt="User Profile Portrait" class="size-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" data-alt="User Profile Portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVsE7yqyQFdYQmNyAbJ2KF5DftGBhdh7L8BXG_0kahf3TAfH8b1Q2LMQ2h0aHvEb_E0pOSLimbQj79khZQ-NIPX0_c2VsdkUNxHJmAENeO2yXqT61fMDLn14cghB-EvS610SI5WTRmgp2B90zAtLy-AuFqKP34ndJS05gOpwfSJU0W4oNVRL3goR6RQe1_bjWHeNIZc6SqMMvK0xAtUk7cKVdIkCiGRIt6jnwki2SdDtSd-31xOxmjIqQhbhyvuFcOtSvP1Uw-PzgY"/>
</button>
</header>
<!-- Main Content -->
<main class="px-6 space-y-8">
<!-- Hero Card: Daily Reflection -->
<section class="w-full">
<div class="group relative overflow-hidden rounded-xl bg-surface-dark shadow-swiss min-h-[420px] flex flex-col justify-between p-6 @container">
<!-- Background Image with Overlay -->
<div class="absolute inset-0 z-0">
<img alt="Abstract dark fluid waves background" class="w-full h-full object-cover opacity-60 mix-blend-overlay" data-alt="Abstract dark fluid waves background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvxFn1Yp9KjAg3J_kfmCip80PP1ni1g7pL1BxleKEYE_3jjiuPs0onYiUPUAqWwoyilRHSWwiKAu6pK-c0mAY02K5TLcXdVimtKpEe5QSvGD2i3up2mJL0sFp5O1P87iuUOFUetfhalApr6lJBe0VM81oJFQqMDHkysqYWrvF1BMvcJmPM_W8UBIV_h8lIhclKk9ost1Dc9UFMz_dROKxVxaDqddaYpK2TRxqzsC66Us57QcDB2BroXY6-MrtxorJGCM0Pctqa5gQ6"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
</div>
<!-- Card Content -->
<div class="relative z-10 flex justify-between items-start">
<span class="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white border border-white/10">
                        Daily Reflection
                    </span>
<button class="text-white/70 hover:text-white transition-colors">
<span class="material-symbols-outlined">more_horiz</span>
</button>
</div>
<div class="relative z-10 mt-auto">
<h2 class="text-3xl font-bold leading-tight tracking-tight text-white mb-6 max-w-[90%]">
                        What is holding you back today?
                    </h2>
<div class="flex items-center gap-4">
<button class="flex-1 bg-primary hover:bg-primary-dark text-background-dark font-bold text-base h-14 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
<span>Start Reflection</span>
<span class="material-symbols-outlined text-[20px]">arrow_forward</span>
</button>
</div>
</div>
</div>
</section>
<!-- Stats / Progress Row -->
<section class="grid grid-cols-2 gap-4">
<div class="bg-surface-light dark:bg-surface-dark p-4 rounded-lg flex flex-col items-start gap-2 shadow-sm border border-gray-100 dark:border-white/5">
<div class="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-1">
<span class="material-symbols-outlined text-[20px]">local_fire_department</span>
</div>
<span class="text-2xl font-bold text-gray-900 dark:text-white">12</span>
<span class="text-xs text-gray-500 dark:text-[#a1b99d] font-medium uppercase tracking-wide">Day Streak</span>
</div>
<div class="bg-surface-light dark:bg-surface-dark p-4 rounded-lg flex flex-col items-start gap-2 shadow-sm border border-gray-100 dark:border-white/5">
<div class="size-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-1">
<span class="material-symbols-outlined text-[20px]">schedule</span>
</div>
<span class="text-2xl font-bold text-gray-900 dark:text-white">45m</span>
<span class="text-xs text-gray-500 dark:text-[#a1b99d] font-medium uppercase tracking-wide">Mindful Time</span>
</div>
</section>
<!-- Recent Journeys List -->
<section>
<div class="flex items-center justify-between mb-4">
<h3 class="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Recent Journeys</h3>
<button class="text-sm font-medium text-primary hover:text-primary-dark transition-colors">View all</button>
</div>
<div class="flex flex-col gap-3">
<!-- List Item 1 -->
<div class="group flex items-center gap-4 bg-surface-light dark:bg-surface-dark p-4 rounded-lg border border-gray-100 dark:border-white/5 active:bg-gray-50 dark:active:bg-white/5 transition-colors cursor-pointer">
<div class="flex items-center justify-center rounded-lg bg-orange-500/10 shrink-0 size-12 text-orange-400 group-hover:bg-orange-500/20 transition-colors">
<span class="material-symbols-outlined">light_mode</span>
</div>
<div class="flex flex-col justify-center grow">
<p class="text-gray-900 dark:text-white text-base font-semibold leading-normal line-clamp-1">Morning Gratitude</p>
<p class="text-gray-500 dark:text-[#a1b99d] text-sm font-normal leading-normal">5 min • Today</p>
</div>
<span class="material-symbols-outlined text-gray-400 dark:text-white/30">chevron_right</span>
</div>
<!-- List Item 2 -->
<div class="group flex items-center gap-4 bg-surface-light dark:bg-surface-dark p-4 rounded-lg border border-gray-100 dark:border-white/5 active:bg-gray-50 dark:active:bg-white/5 transition-colors cursor-pointer">
<div class="flex items-center justify-center rounded-lg bg-blue-500/10 shrink-0 size-12 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
<span class="material-symbols-outlined">water_drop</span>
</div>
<div class="flex flex-col justify-center grow">
<p class="text-gray-900 dark:text-white text-base font-semibold leading-normal line-clamp-1">Anxiety Check-in</p>
<p class="text-gray-500 dark:text-[#a1b99d] text-sm font-normal leading-normal">10 min • Yesterday</p>
</div>
<span class="material-symbols-outlined text-gray-400 dark:text-white/30">chevron_right</span>
</div>
<!-- List Item 3 -->
<div class="group flex items-center gap-4 bg-surface-light dark:bg-surface-dark p-4 rounded-lg border border-gray-100 dark:border-white/5 active:bg-gray-50 dark:active:bg-white/5 transition-colors cursor-pointer">
<div class="flex items-center justify-center rounded-lg bg-purple-500/10 shrink-0 size-12 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
<span class="material-symbols-outlined">auto_awesome</span>
</div>
<div class="flex flex-col justify-center grow">
<p class="text-gray-900 dark:text-white text-base font-semibold leading-normal line-clamp-1">Future Self Visualization</p>
<p class="text-gray-500 dark:text-[#a1b99d] text-sm font-normal leading-normal">15 min • 2 days ago</p>
</div>
<span class="material-symbols-outlined text-gray-400 dark:text-white/30">chevron_right</span>
</div>
</div>
</section>
<!-- Spacer for FAB and Nav -->
<div class="h-20"></div>
</main>
<!-- Floating Action Button (Ask) -->
<div class="fixed bottom-24 right-6 z-40">
<button class="h-14 bg-primary hover:bg-primary-dark text-background-dark rounded-full px-6 shadow-[0_8px_30px_rgba(55,236,19,0.3)] flex items-center justify-center gap-2 transition-transform active:scale-95">
<span class="material-symbols-outlined text-[24px]">chat_spark</span>
<span class="text-base font-bold">Ask Sage</span>
</button>
</div>
<!-- Bottom Navigation -->
<nav class="fixed bottom-0 w-full bg-background-light/80 dark:bg-[#132210]/95 backdrop-blur-xl border-t border-gray-200 dark:border-white/5 z-50 pb-safe">
<div class="flex items-center justify-around h-20 px-2">
<button class="flex flex-col items-center justify-center w-full gap-1 group">
<span class="material-symbols-outlined text-primary text-[28px] fill-1">home</span>
<span class="text-[10px] font-medium text-primary">Home</span>
</button>
<button class="flex flex-col items-center justify-center w-full gap-1 group">
<span class="material-symbols-outlined text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors text-[28px]">book_2</span>
<span class="text-[10px] font-medium text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300">Journal</span>
</button>
<button class="flex flex-col items-center justify-center w-full gap-1 group">
<span class="material-symbols-outlined text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors text-[28px]">explore</span>
<span class="text-[10px] font-medium text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300">Explore</span>
</button>
<button class="flex flex-col items-center justify-center w-full gap-1 group">
<span class="material-symbols-outlined text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors text-[28px]">person</span>
<span class="text-[10px] font-medium text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300">Profile</span>
</button>
</div>
</nav>
</body></html>

<!-- Sage App Journal Screen (Dark Mode) -->
<!DOCTYPE html>
<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage - Journal</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#37ec13",
                        "background-light": "#f6f8f6",
                        "background-dark": "#132210",
                        "card-dark": "#1a2e17",
                        "card-hover": "#20361d",
                        "text-muted": "#a1b99d",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>::-webkit-scrollbar {
        width: 0px;
        height: 0px;
        background: transparent;
    }
    .swiss-title {
        letter-spacing: -0.02em;
    }
    .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
    .material-symbols-outlined.filled {
        font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }
    .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
</style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-dark font-display antialiased text-white">
<div class="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24">
<header class="sticky top-0 z-40 flex items-center justify-between bg-background-dark/95 px-5 py-4 backdrop-blur-md border-b border-white/5">
<div class="flex size-10 shrink-0 items-center justify-center rounded-full text-white cursor-pointer hover:bg-white/5 transition-colors">
<span class="material-symbols-outlined">menu</span>
</div>
<h1 class="swiss-title flex-1 text-center text-lg font-bold leading-tight tracking-tight">Journal</h1>
<div class="flex size-10 shrink-0 items-center justify-center rounded-full text-white cursor-pointer hover:bg-white/5 transition-colors">
<span class="material-symbols-outlined">search</span>
</div>
</header>
<section class="w-full border-b border-white/5 bg-background-dark pt-2 pb-4">
<div class="flex items-center justify-between px-4">
<span class="text-sm font-medium text-text-muted">September 2023</span>
<span class="material-symbols-outlined text-sm text-text-muted">chevron_right</span>
</div>
<div class="mt-4 flex w-full justify-between px-3">
<button class="group flex flex-col items-center gap-1.5 rounded-full p-2 transition-colors">
<span class="text-[10px] font-medium uppercase text-text-muted/60">Mon</span>
<span class="flex size-8 items-center justify-center rounded-full text-sm font-medium text-white group-hover:bg-white/5">18</span>
</button>
<button class="group flex flex-col items-center gap-1.5 rounded-full p-2 transition-colors">
<span class="text-[10px] font-medium uppercase text-text-muted/60">Tue</span>
<span class="flex size-8 items-center justify-center rounded-full text-sm font-medium text-white group-hover:bg-white/5">19</span>
</button>
<button class="group flex flex-col items-center gap-1.5 rounded-full p-2 transition-colors">
<span class="text-[10px] font-medium uppercase text-text-muted/60">Wed</span>
<span class="flex size-8 items-center justify-center rounded-full text-sm font-medium text-white group-hover:bg-white/5">20</span>
</button>
<button class="group flex flex-col items-center gap-1.5 rounded-full p-2 transition-colors">
<span class="text-[10px] font-medium uppercase text-primary">Thu</span>
<span class="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-background-dark shadow-[0_0_12px_rgba(55,236,19,0.3)]">21</span>
</button>
<button class="group flex flex-col items-center gap-1.5 rounded-full p-2 transition-colors">
<span class="text-[10px] font-medium uppercase text-text-muted/60">Fri</span>
<span class="flex size-8 items-center justify-center rounded-full text-sm font-medium text-white group-hover:bg-white/5">22</span>
</button>
<button class="group flex flex-col items-center gap-1.5 rounded-full p-2 transition-colors">
<span class="text-[10px] font-medium uppercase text-text-muted/60">Sat</span>
<span class="flex size-8 items-center justify-center rounded-full text-sm font-medium text-white group-hover:bg-white/5">23</span>
</button>
<button class="group flex flex-col items-center gap-1.5 rounded-full p-2 transition-colors">
<span class="text-[10px] font-medium uppercase text-text-muted/60">Sun</span>
<span class="flex size-8 items-center justify-center rounded-full text-sm font-medium text-white group-hover:bg-white/5">24</span>
</button>
</div>
</section>
<main class="flex flex-col gap-6 px-4 pt-6">
<section class="flex flex-col gap-4">
<div class="flex items-center gap-6 border-b border-white/10 px-1 pb-1">
<button class="relative pb-3 text-sm font-semibold text-white">
                    All
                    <span class="absolute -bottom-1.5 left-0 h-0.5 w-full bg-primary"></span>
</button>
<button class="relative pb-3 text-sm font-medium text-text-muted hover:text-white transition-colors">
                    Journal only
                </button>
<button class="relative pb-3 text-sm font-medium text-text-muted hover:text-white transition-colors">
                    Insights only
                </button>
</div>
<div class="no-scrollbar flex gap-2 overflow-x-auto pb-1">
<button class="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20">
                    All Tags
                </button>
<button class="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-text-muted transition-colors hover:bg-white/10 hover:text-white">
                    #WorkLife
                </button>
<button class="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-text-muted transition-colors hover:bg-white/10 hover:text-white">
                    #Gratitude
                </button>
<button class="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-text-muted transition-colors hover:bg-white/10 hover:text-white">
                    #Anxiety
                </button>
<button class="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-text-muted transition-colors hover:bg-white/10 hover:text-white">
                    #Relationships
                </button>
</div>
</section>
<section class="flex flex-col gap-4">
<div class="relative flex w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center transition-colors hover:bg-white/[0.04]">
<div class="mb-1 rounded-full bg-white/5 p-3 text-text-muted">
<span class="material-symbols-outlined">edit_note</span>
</div>
<h3 class="swiss-title text-base font-medium text-white">Your journal starts with one honest sentence.</h3>
<p class="mb-2 max-w-[240px] text-xs text-text-muted">Capture your thoughts for today.</p>
<button class="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-background-dark shadow-lg shadow-primary/20 transition-transform active:scale-95">
<span class="material-symbols-outlined text-[18px]">add</span>
                    New entry
                 </button>
</div>
<h3 class="swiss-title mt-2 px-1 text-sm font-semibold uppercase tracking-wider text-text-muted">Previous Days</h3>
<article class="group relative flex cursor-pointer gap-4 overflow-hidden rounded-xl bg-card-dark p-5 shadow-sm transition-all hover:bg-card-hover hover:shadow-md">
<div class="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-primary">
<span class="material-symbols-outlined filled">wb_sunny</span>
</div>
<div class="flex min-w-0 flex-1 flex-col gap-1">
<div class="flex items-baseline justify-between gap-2">
<h4 class="truncate text-base font-semibold text-white">Morning Clarity</h4>
<span class="shrink-0 text-xs text-text-muted/60">Yesterday, 9:00 AM</span>
</div>
<p class="line-clamp-2 text-sm leading-relaxed text-text-muted">
                        Woke up feeling surprisingly refreshed. The dream I had about the ocean seems to have washed away the stress from...
                    </p>
<div class="mt-2 flex items-center gap-2">
<span class="rounded bg-white/5 px-2 py-0.5 text-[10px] font-medium text-text-muted/80">#Gratitude</span>
<span class="rounded bg-white/5 px-2 py-0.5 text-[10px] font-medium text-text-muted/80">#Calm</span>
</div>
</div>
</article>
<article class="group relative flex cursor-pointer gap-4 overflow-hidden rounded-xl bg-card-dark p-5 shadow-sm transition-all hover:bg-card-hover hover:shadow-md">
<div class="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#a1b99d]">
<span class="material-symbols-outlined">cloud</span>
</div>
<div class="flex min-w-0 flex-1 flex-col gap-1">
<div class="flex items-baseline justify-between gap-2">
<h4 class="truncate text-base font-semibold text-white">Heavy thoughts</h4>
<span class="shrink-0 text-xs text-text-muted/60">Tue 19, 8:45 PM</span>
</div>
<p class="line-clamp-2 text-sm leading-relaxed text-text-muted">
                        It’s hard to shake off the conversation from earlier. I keep replaying the words in my head, wondering if I said too much or...
                    </p>
<div class="mt-2 flex items-center gap-2">
<span class="rounded bg-white/5 px-2 py-0.5 text-[10px] font-medium text-text-muted/80">#Anxiety</span>
<span class="rounded bg-white/5 px-2 py-0.5 text-[10px] font-medium text-text-muted/80">#Reflection</span>
</div>
</div>
</article>
<article class="group relative flex cursor-pointer gap-4 overflow-hidden rounded-xl bg-card-dark p-5 shadow-sm transition-all hover:bg-card-hover hover:shadow-md">
<div class="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#a1b99d]">
<span class="material-symbols-outlined">bolt</span>
</div>
<div class="flex min-w-0 flex-1 flex-col gap-1">
<div class="flex items-baseline justify-between gap-2">
<h4 class="truncate text-base font-semibold text-white">Sudden realization</h4>
<span class="shrink-0 text-xs text-text-muted/60">Mon 18, 2:15 PM</span>
</div>
<p class="line-clamp-2 text-sm leading-relaxed text-text-muted">
                        I realized today that I've been holding onto expectations that aren't even mine. It was a lightning bolt moment during...
                    </p>
<div class="mt-2 flex items-center gap-2">
<span class="rounded bg-white/5 px-2 py-0.5 text-[10px] font-medium text-text-muted/80">#Insight</span>
</div>
</div>
</article>
</section>
</main>
<div class="fixed bottom-24 right-4 z-30">
<button class="flex size-14 items-center justify-center rounded-full bg-primary shadow-[0_4px_20px_rgba(55,236,19,0.4)] transition-transform hover:scale-105 active:scale-95">
<span class="material-symbols-outlined text-background-dark" style="font-size: 28px;">edit</span>
</button>
</div>
<nav class="fixed bottom-0 left-0 z-40 w-full border-t border-white/5 bg-background-dark/95 pb-safe pt-2 backdrop-blur-lg">
<div class="flex items-center justify-around pb-4 pt-2">
<button class="flex flex-col items-center justify-center gap-1 text-primary">
<span class="material-symbols-outlined filled">book_2</span>
<span class="text-[10px] font-medium">Journal</span>
</button>
<button class="flex flex-col items-center justify-center gap-1 text-white/40 hover:text-white transition-colors">
<span class="material-symbols-outlined">explore</span>
<span class="text-[10px] font-medium">Guide</span>
</button>
<button class="flex flex-col items-center justify-center gap-1 text-white/40 hover:text-white transition-colors">
<span class="material-symbols-outlined">person</span>
<span class="text-[10px] font-medium">Profile</span>
</button>
</div>
</nav>
<div class="h-safe w-full bg-background-dark"></div>
</div>

</body></html>

<!-- Tone Adjustment Bottom Sheet (Dark Mode)  -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage - Tone Adjustment</title>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Tailwind Config -->
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#137fec",
                        "background-light": "#f6f7f8",
                        "background-dark": "#101922",
                        "surface-dark": "#1A222C", // Slightly lighter for cards/inputs
                    },
                    fontFamily: {
                        "display": ["Manrope", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.5rem",
                        "lg": "1rem",
                        "xl": "1.5rem",
                        "2xl": "2rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style>
        /* Custom range slider styling */
        input[type=range] {
            -webkit-appearance: none; 
            background: transparent; 
        }
        
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background: #ffffff;
            cursor: pointer;
            margin-top: -10px; 
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }

        input[type=range]::-webkit-slider-runnable-track {
            width: 100%;
            height: 4px;
            cursor: pointer;
            background: #3b4754;
            border-radius: 2px;
        }
        
        /* Firefox */
        input[type=range]::-moz-range-thumb {
            height: 24px;
            width: 24px;
            border: none;
            border-radius: 50%;
            background: #ffffff;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        
        input[type=range]::-moz-range-track {
            width: 100%;
            height: 4px;
            cursor: pointer;
            background: #3b4754;
            border-radius: 2px;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-black/80 flex items-end justify-center min-h-screen font-display">
<!-- Bottom Sheet Container -->
<!-- Simulating the sheet overlay on top of a dimmed background -->
<div class="w-full max-w-md bg-background-dark rounded-t-[32px] overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
<!-- Drag Handle -->
<div class="flex w-full items-center justify-center pt-4 pb-2">
<div class="h-1.5 w-12 rounded-full bg-gray-600/50"></div>
</div>
<!-- Header -->
<div class="flex items-center justify-between px-6 py-4">
<h2 class="text-white text-xl font-bold leading-tight tracking-tight">Adjust Tone</h2>
<button class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white">
<span class="material-symbols-outlined text-[24px]">close</span>
</button>
</div>
<!-- Scrollable Content -->
<div class="flex-1 overflow-y-auto px-6 pb-6">
<!-- Preview Card -->
<div class="flex gap-4 bg-surface-dark p-4 rounded-xl mb-8 border border-white/5">
<div class="text-primary flex items-start justify-center pt-1 shrink-0">
<span class="material-symbols-outlined text-[24px]">format_quote</span>
</div>
<div class="flex flex-1 flex-col justify-center">
<p class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Current Preview</p>
<p class="text-white/90 text-base font-medium leading-relaxed">
                        Reflecting on your day helps uncover patterns...
                    </p>
</div>
</div>
<!-- Segmented Control: Tone -->
<div class="mb-8">
<label class="block text-white text-base font-bold mb-4">Tone</label>
<div class="flex p-1 bg-surface-dark rounded-xl">
<!-- Option: Practical (Active) -->
<label class="flex-1 relative cursor-pointer group">
<input class="peer sr-only" name="tone" type="radio" value="practical"/>
<div class="h-10 flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 text-gray-400 peer-checked:bg-primary peer-checked:text-white peer-checked:shadow-md hover:text-white">
                            Practical
                        </div>
</label>
<!-- Option: Poetic -->
<label class="flex-1 relative cursor-pointer group">
<input checked="" class="peer sr-only" name="tone" type="radio" value="poetic"/>
<div class="h-10 flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 text-gray-400 peer-checked:bg-primary peer-checked:text-white peer-checked:shadow-md hover:text-white">
                            Poetic
                        </div>
</label>
<!-- Option: Minimal -->
<label class="flex-1 relative cursor-pointer group">
<input class="peer sr-only" name="tone" type="radio" value="minimal"/>
<div class="h-10 flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 text-gray-400 peer-checked:bg-primary peer-checked:text-white peer-checked:shadow-md hover:text-white">
                            Minimal
                        </div>
</label>
<!-- Option: Deep -->
<label class="flex-1 relative cursor-pointer group">
<input class="peer sr-only" name="tone" type="radio" value="deep"/>
<div class="h-10 flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 text-gray-400 peer-checked:bg-primary peer-checked:text-white peer-checked:shadow-md hover:text-white">
                            Deep
                        </div>
</label>
</div>
</div>
<!-- Slider: Balance -->
<div class="mb-6">
<div class="flex items-center justify-between mb-4">
<p class="text-white text-base font-bold">Guidance Style</p>
</div>
<div class="relative w-full h-8 flex items-center">
<!-- Track Background with Gradient for active portion simulation -->
<div class="absolute w-full h-1 bg-surface-dark rounded-full overflow-hidden">
<div class="h-full bg-primary/30 w-1/2"></div>
</div>
<!-- Actual Range Input -->
<input class="w-full relative z-10 focus:outline-none" max="100" min="0" type="range" value="50"/>
</div>
<div class="flex justify-between items-center mt-2 text-xs font-medium text-gray-500 tracking-wide uppercase">
<span>More questions</span>
<span>More statements</span>
</div>
</div>
<!-- Helper Note -->
<div class="text-center mb-8">
<p class="text-sm text-gray-500 font-medium">Keeps the meaning; changes the style.</p>
</div>
<!-- Actions -->
<div class="grid grid-cols-2 gap-4 pb-2">
<button class="h-12 rounded-xl text-white font-bold text-base bg-surface-dark hover:bg-surface-dark/80 transition-colors">
                    Cancel
                </button>
<button class="h-12 rounded-xl text-white font-bold text-base bg-primary hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                    Apply
                </button>
</div>
</div>
<!-- Bottom Safe Area Spacer -->
<div class="h-6 w-full"></div>
</div>
</body></html>

<!-- Sage App Explore Screen (Dark Mode) -->
<!DOCTYPE html>
<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage Explore Screen</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#37ec13",
                        "background-light": "#f6f8f6",
                        "background-dark": "#132210", 
                        "surface-dark": "#1d271c", 
                        "surface-darker": "#0f140e", 
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "2xl": "2rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        body {
            font-family: 'Inter', sans-serif;
            -webkit-font-smoothing: antialiased;
        }.no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark text-gray-900 dark:text-white transition-colors duration-200">
<div class="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto shadow-2xl">
<header class="flex items-center px-6 py-5 justify-between sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-3xl">spa</span>
<h1 class="text-2xl font-bold tracking-tight dark:text-white">Sage</h1>
</div>
<div class="flex items-center justify-end">
<div class="size-10 rounded-full bg-surface-dark border border-white/10 overflow-hidden relative">
<img class="w-full h-full object-cover opacity-80" data-alt="User profile avatar silhouette" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK8LMhZ-oHUCY7DBIHSmDA8X9Kqc1lJtW3-SA54_lnUDHPQcSpwRpDm1DGBsAoLBAKv7RwRNuTpyspHEU_jIu5EALnQijMa2-Of-VPYIL8X08h_t0tdudXvABPFJaQGPfWcLJn9_igSMFztk5YqWi7QxMSZbPIHN9VcAXj2OvssaJfZwtEIcm_j4vF5n8vHkajL3KvUUzWhq_MoMykZVFyl0IqnJZy7xaEIPxWCh4w5RrfbCYjTb9Vpk-A3oMQih2ztaBJMSHQHh1B"/>
</div>
</div>
</header>
<main class="flex-1 flex flex-col px-4 pb-28 space-y-8">
<section class="pt-2">
<div class="relative group">
<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-gray-500 group-focus-within:text-primary transition-colors">search</span>
</div>
<input class="block w-full pl-12 pr-4 py-4 rounded-2xl border-none bg-surface-dark text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:bg-surface-darker transition-all shadow-sm" placeholder="Search themes" type="text"/>
</div>
</section>
<section>
<div class="flex items-center justify-between mb-4 px-1">
<h2 class="text-xl font-bold tracking-tight dark:text-white">Explore Themes</h2>
</div>
<div class="grid grid-cols-2 gap-3">
<div class="group relative flex flex-col justify-end h-32 p-4 rounded-2xl bg-surface-dark border border-white/5 overflow-hidden active:scale-95 transition-all cursor-pointer">
<div class="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center transition-transform group-hover:scale-110 duration-700" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuB97IZLO-mXJD4sPgtRaOKGQRClzc5Yxlk8T3xX1gxHD7nSQbZcN81omYeQMs4bFKtXvkkTdSNKCUgy16i2eIL13uwDXT3HMeyyqdEJbhyd51gRTbpI14IihfEr2VlE2FFmlA9tsPsYPORX51vqnsKK4bUYe3nM9IN6I7WPCXdZW-hBHCNbp5GyJEZbZr7_vQU-dQu1hmOZs-q2d9m-fcG6l6uMObwvjB0Ewyev0UFMZKy7KE9nqz6djvG0WW85AKNWAu6gC7RXMR8k");'></div>
<div class="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent"></div>
<div class="relative z-10 flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-xl">water_drop</span>
<span class="text-white font-semibold">Calm</span>
</div>
</div>
<div class="group relative flex flex-col justify-end h-32 p-4 rounded-2xl bg-surface-dark border border-white/5 overflow-hidden active:scale-95 transition-all cursor-pointer">
<div class="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center transition-transform group-hover:scale-110 duration-700" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCGW4C-hS6hlDiLaPprrK2sNdT7Da_rEeaSQG5KGenh8QspJrOBCJQY5G1JS_T531jY6PTARdpOImNyu-a9XbpJAtm1CCEmzQkVrIG0x0W_NXpR2AwHXwC5sjdUgGvAniu7bl9_t9Rc8uqcxIv2WdM-c_v_CcTgiNQ-SNbX26RzrWYeIkBuBBeKlJgX0gTKcV4Obj39rVNvL4QoU75jTYENq55htIRklNTVh_uOC0qxDWlq50WnBR-rtN82Er6fl9FCCfiJr00JR1Wu");'></div>
<div class="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent"></div>
<div class="relative z-10 flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-xl">bolt</span>
<span class="text-white font-semibold">Action</span>
</div>
</div>
<div class="group relative flex flex-col justify-end h-32 p-4 rounded-2xl bg-surface-dark border border-white/5 overflow-hidden active:scale-95 transition-all cursor-pointer">
<div class="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center transition-transform group-hover:scale-110 duration-700" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsSOM6ACDkTUNKWCxPAj6dk9LUnFtsxy4y0xHsTnyELcIAv7B6cFtRyTSwDhu75Bl_WEmXWHlPdbIb8SNV-ozQFl3cOnO9CILRwTt7SjAEM5yD9uYcMdTjMjyUGGhqbVgPtZLewxrsfRcgotiyRXcT9eLrJod7snTgUkqUETkoxtsvNEGo0kKXf9ZrVyVuzC026HimpcmlFwyylknyxD5VQSKDSuMXhr5gEMIy0OhW20bdQolSirwNf6vWdPnJNfN1OHSOd10K6nmR");'></div>
<div class="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent"></div>
<div class="relative z-10 flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-xl">fingerprint</span>
<span class="text-white font-semibold">Self</span>
</div>
</div>
<div class="group relative flex flex-col justify-end h-32 p-4 rounded-2xl bg-surface-dark border border-white/5 overflow-hidden active:scale-95 transition-all cursor-pointer">
<div class="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center transition-transform group-hover:scale-110 duration-700" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAF58ysdCv1Ed4qfD-x8xq8snS9yF3Y_PP0fqN06YdaDlpX9SwKy0ZZIjdX-WxtgNMMoHDcc3_Vs8H-QVPX3EUASz16p1HPhdDWaFiLAgV6x4W9n8XG2QpLRm8YLkj1wgXfCBePYRigO_HZjh-Sevqf7lus5vQtHPu0S0LZ-nPhiRohOdFb-8vYrDgdmQAbsVY6c1Dk6xEkIKGt30_r3MGKbU7ZkiM6ZyFyEA2U2G3waBHHyiKK0-M3cA9kX1GUKzH3nDSjBNY3dbpC");'></div>
<div class="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent"></div>
<div class="relative z-10 flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-xl">diversity_1</span>
<span class="text-white font-semibold">Relationships</span>
</div>
</div>
<div class="group relative flex flex-col justify-end h-32 p-4 rounded-2xl bg-surface-dark border border-white/5 overflow-hidden active:scale-95 transition-all cursor-pointer">
<div class="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center transition-transform group-hover:scale-110 duration-700" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbkPx0Aqr0cZjlEIGvxZNkz3Iw9ET-k_UzqkeQy8hvSsjpNNOQv51utwl9iacuzgu_RGx38W5J86de-7wwxLfunZYePHccxuIZKClBEstZ1H5LooGrjm7H3qDCKXXvJH-zJOkqGLwEP4Ltq0zKnf2jvHN-fLEXovQuv4ZAdVKTf2eZpB9_hAuwLBgd4HdJ-utITds5RrpoXZ0-6WLK4FL7RhZMaDAu3G8lY1urSdJEpNqyYWKXarE87r7gGvGZXGG0rlB-VzdR3alI");'></div>
<div class="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent"></div>
<div class="relative z-10 flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-xl">waves</span>
<span class="text-white font-semibold">Change</span>
</div>
</div>
<div class="group relative flex flex-col justify-end h-32 p-4 rounded-2xl bg-surface-dark border border-white/5 overflow-hidden active:scale-95 transition-all cursor-pointer">
<div class="absolute inset-0 opacity-30 mix-blend-overlay bg-cover bg-center transition-transform group-hover:scale-110 duration-700" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBK8LMhZ-oHUCY7DBIHSmDA8X9Kqc1lJtW3-SA54_lnUDHPQcSpwRpDm1DGBsAoLBAKv7RwRNuTpyspHEU_jIu5EALnQijMa2-Of-VPYIL8X08h_t0tdudXvABPFJaQGPfWcLJn9_igSMFztk5YqWi7QxMSZbPIHN9VcAXj2OvssaJfZwtEIcm_j4vF5n8vHkajL3KvUUzWhq_MoMykZVFyl0IqnJZy7xaEIPxWCh4w5RrfbCYjTb9Vpk-A3oMQih2ztaBJMSHQHh1B"); filter: blur(2px) grayscale(50%);'></div>
<div class="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent"></div>
<div class="relative z-10 flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-xl">lightbulb</span>
<span class="text-white font-semibold">Meaning</span>
</div>
</div>
</div>
</section>
<section class="@container">
<div class="flex items-center justify-between mb-4 px-1">
<h2 class="text-xl font-bold tracking-tight dark:text-white">Paths</h2>
<a class="text-sm font-medium text-primary hover:text-primary/80" href="#">View all</a>
</div>
<div class="flex flex-col gap-4">
<div class="group relative flex items-center gap-4 p-3 rounded-2xl bg-surface-dark border border-white/5 overflow-hidden hover:bg-white/5 transition-colors cursor-pointer">
<div class="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden">
<img alt="Calm path visual" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB97IZLO-mXJD4sPgtRaOKGQRClzc5Yxlk8T3xX1gxHD7nSQbZcN81omYeQMs4bFKtXvkkTdSNKCUgy16i2eIL13uwDXT3HMeyyqdEJbhyd51gRTbpI14IihfEr2VlE2FFmlA9tsPsYPORX51vqnsKK4bUYe3nM9IN6I7WPCXdZW-hBHCNbp5GyJEZbZr7_vQU-dQu1hmOZs-q2d9m-fcG6l6uMObwvjB0Ewyev0UFMZKy7KE9nqz6djvG0WW85AKNWAu6gC7RXMR8k"/>
<div class="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
</div>
<div class="flex flex-col gap-1 pr-2">
<span class="text-[10px] font-bold tracking-wider text-primary uppercase">7 Days</span>
<h3 class="text-white font-bold text-lg leading-tight">7 Days of Calm</h3>
<p class="text-gray-400 text-xs line-clamp-2">Reclaim your peace of mind through daily guided stillness.</p>
</div>
<div class="ml-auto pr-2 text-gray-500 group-hover:text-primary transition-colors">
<span class="material-symbols-outlined">chevron_right</span>
</div>
</div>
<div class="group relative flex items-center gap-4 p-3 rounded-2xl bg-surface-dark border border-white/5 overflow-hidden hover:bg-white/5 transition-colors cursor-pointer">
<div class="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden">
<img alt="Clarity path visual" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAF58ysdCv1Ed4qfD-x8xq8snS9yF3Y_PP0fqN06YdaDlpX9SwKy0ZZIjdX-WxtgNMMoHDcc3_Vs8H-QVPX3EUASz16p1HPhdDWaFiLAgV6x4W9n8XG2QpLRm8YLkj1wgXfCBePYRigO_HZjh-Sevqf7lus5vQtHPu0S0LZ-nPhiRohOdFb-8vYrDgdmQAbsVY6c1Dk6xEkIKGt30_r3MGKbU7ZkiM6ZyFyEA2U2G3waBHHyiKK0-M3cA9kX1GUKzH3nDSjBNY3dbpC"/>
<div class="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
</div>
<div class="flex flex-col gap-1 pr-2">
<span class="text-[10px] font-bold tracking-wider text-primary uppercase">7 Days</span>
<h3 class="text-white font-bold text-lg leading-tight">7 Days of Clarity</h3>
<p class="text-gray-400 text-xs line-clamp-2">Cut through the noise and find focus in your daily life.</p>
</div>
<div class="ml-auto pr-2 text-gray-500 group-hover:text-primary transition-colors">
<span class="material-symbols-outlined">chevron_right</span>
</div>
</div>
<div class="group relative flex items-center gap-4 p-3 rounded-2xl bg-surface-dark border border-white/5 overflow-hidden hover:bg-white/5 transition-colors cursor-pointer">
<div class="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden">
<img alt="Courage path visual" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGW4C-hS6hlDiLaPprrK2sNdT7Da_rEeaSQG5KGenh8QspJrOBCJQY5G1JS_T531jY6PTARdpOImNyu-a9XbpJAtm1CCEmzQkVrIG0x0W_NXpR2AwHXwC5sjdUgGvAniu7bl9_t9Rc8uqcxIv2WdM-c_v_CcTgiNQ-SNbX26RzrWYeIkBuBBeKlJgX0gTKcV4Obj39rVNvL4QoU75jTYENq55htIRklNTVh_uOC0qxDWlq50WnBR-rtN82Er6fl9FCCfiJr00JR1Wu"/>
<div class="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
</div>
<div class="flex flex-col gap-1 pr-2">
<span class="text-[10px] font-bold tracking-wider text-primary uppercase">7 Days</span>
<h3 class="text-white font-bold text-lg leading-tight">7 Days of Courage</h3>
<p class="text-gray-400 text-xs line-clamp-2">Build resilience and face challenges with a stronger heart.</p>
</div>
<div class="ml-auto pr-2 text-gray-500 group-hover:text-primary transition-colors">
<span class="material-symbols-outlined">chevron_right</span>
</div>
</div>
</div>
</section>
</main>
<div class="fixed bottom-24 right-4 z-50">
<button class="flex items-center gap-2 bg-primary hover:bg-[#2ed60e] text-background-dark py-3 px-5 rounded-full shadow-[0_0_20px_rgba(55,236,19,0.4)] transition-all hover:scale-105 active:scale-95 group">
<span class="material-symbols-outlined text-2xl group-hover:animate-pulse">spark</span>
<span class="font-bold text-sm tracking-wide uppercase">Ask Sage</span>
</button>
</div>
<nav class="fixed bottom-0 left-0 w-full bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-gray-200 dark:border-white/5 pb-6 pt-3 px-6 z-40 max-w-md mx-auto right-0">
<div class="flex justify-between items-center">
<a class="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined text-[24px]">home</span>
<span class="text-[10px] font-medium">Home</span>
</a>
<a class="flex flex-col items-center gap-1 text-primary" href="#">
<span class="material-symbols-outlined text-[24px] filled">explore</span>
<span class="text-[10px] font-medium">Explore</span>
</a>
<a class="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined text-[24px]">menu_book</span>
<span class="text-[10px] font-medium">Journal</span>
</a>
<a class="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined text-[24px]">person</span>
<span class="text-[10px] font-medium">Profile</span>
</a>
</div>
</nav>
</div>

</body></html>

<!-- Sage App Donation Screen (Dark Mode)  -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage - Donation</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#37ec13",
                        "background-light": "#f6f8f6",
                        "background-dark": "#132210", // Deep dark green/black
                        "surface-dark": "#1c2e19", // Slightly lighter for cards
                        "sage-text": "#a1b99d",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: { "DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "2xl": "2rem", "full": "9999px" },
                },
            },
        }
    </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col antialiased selection:bg-primary selection:text-background-dark">
<!-- Top Navigation -->
<div class="relative flex w-full flex-col bg-background-light dark:bg-background-dark pt-2 sticky top-0 z-10">
<div class="flex items-center p-4 justify-between">
<button class="text-white/70 hover:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/5 transition-colors duration-200">
<span class="material-symbols-outlined" style="font-size: 24px;">close</span>
</button>
<div class="flex items-center justify-end">
<button class="text-sage-text hover:text-primary transition-colors text-sm font-bold leading-normal tracking-wide px-3 py-1 rounded-full">
                    Restore
                </button>
</div>
</div>
</div>
<!-- Main Content -->
<div class="flex-1 flex flex-col w-full max-w-md mx-auto px-6 overflow-y-auto pb-6">
<!-- Hero Section -->
<div class="flex flex-col items-center pt-4 pb-8">
<div class="relative w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[#2b3928] to-background-dark flex items-center justify-center border border-white/10 shadow-lg shadow-primary/5">
<span class="material-symbols-outlined text-primary" style="font-size: 32px;">volunteer_activism</span>
</div>
<h1 class="text-white tracking-tight text-[32px] font-bold leading-tight text-center mb-6">
                Keep Sage free<br/>for everyone.
            </h1>
<div class="w-full bg-surface-dark/50 rounded-2xl p-5 border border-white/5 backdrop-blur-sm">
<p class="text-sage-text text-sm font-medium mb-4 uppercase tracking-wider text-center">Your support covers</p>
<div class="space-y-4">
<div class="flex items-center gap-4">
<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2b3928] text-primary">
<span class="material-symbols-outlined" style="font-size: 18px;">dns</span>
</div>
<p class="text-white text-base font-normal">Hosting &amp; server costs</p>
</div>
<div class="flex items-center gap-4">
<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2b3928] text-primary">
<span class="material-symbols-outlined" style="font-size: 18px;">auto_awesome</span>
</div>
<p class="text-white text-base font-normal">Daily reflection curation</p>
</div>
<div class="flex items-center gap-4">
<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2b3928] text-primary">
<span class="material-symbols-outlined" style="font-size: 18px;">block</span>
</div>
<p class="text-white text-base font-normal">An ad-free experience</p>
</div>
</div>
</div>
</div>
<!-- Donation Selector -->
<div class="w-full mt-2">
<h3 class="text-white tracking-tight text-xl font-bold leading-tight text-center pb-5">Choose an amount</h3>
<div class="grid grid-cols-2 gap-3">
<!-- Option 1 -->
<button class="group relative flex h-14 w-full items-center justify-center rounded-xl bg-[#2b3928] hover:bg-[#364932] transition-all duration-200 border border-transparent hover:border-primary/30">
<p class="text-white text-lg font-medium">CHF 2</p>
</button>
<!-- Option 2 (Selected) -->
<button class="group relative flex h-14 w-full items-center justify-center rounded-xl bg-primary shadow-[0_0_20px_rgba(55,236,19,0.25)] transition-all duration-200 transform scale-[1.02]">
<div class="absolute -top-2.5 right-3 bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">MOST POPULAR</div>
<p class="text-background-dark text-lg font-bold">CHF 5</p>
</button>
<!-- Option 3 -->
<button class="group relative flex h-14 w-full items-center justify-center rounded-xl bg-[#2b3928] hover:bg-[#364932] transition-all duration-200 border border-transparent hover:border-primary/30">
<p class="text-white text-lg font-medium">CHF 10</p>
</button>
<!-- Option 4 -->
<button class="group relative flex h-14 w-full items-center justify-center rounded-xl bg-[#2b3928] hover:bg-[#364932] transition-all duration-200 border border-transparent hover:border-primary/30">
<p class="text-white text-lg font-medium">Custom</p>
</button>
</div>
</div>
<!-- Spacer -->
<div class="flex-1 min-h-[40px]"></div>
<!-- Payment Method -->
<div class="w-full mb-6">
<div class="flex items-center justify-between p-4 rounded-xl bg-surface-dark border border-white/5 shadow-sm">
<div class="flex items-center gap-3">
<div class="bg-white text-black p-1 rounded w-8 h-5 flex items-center justify-center">
<span class="material-symbols-outlined text-[16px]">ios</span>
</div>
<div class="flex flex-col">
<span class="text-white text-sm font-medium leading-none">Apple Pay</span>
<span class="text-white/40 text-xs mt-1">Visa •••• 4242</span>
</div>
</div>
<button class="text-primary text-sm font-bold hover:text-primary/80 transition-colors">Change</button>
</div>
</div>
<!-- Donate Action -->
<div class="w-full pb-4">
<button class="w-full h-14 rounded-full bg-primary text-background-dark font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
<span>Donate CHF 5</span>
<span class="material-symbols-outlined text-[20px] font-bold">arrow_forward</span>
</button>
<p class="text-center text-xs text-white/40 mt-4 flex items-center justify-center gap-1.5">
<span class="material-symbols-outlined text-[14px]">lock</span>
                Secure payment processed by Stripe
            </p>
<div class="text-center mt-4">
<button class="text-white/30 text-xs hover:text-white/60 transition-colors">Maybe later</button>
</div>
</div>
</div>
</body></html>

<!-- Choose Tone -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage - Choose Tone</title>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#5bec13",
                        "background-light": "#f6f8f6",
                        "background-dark": "#162210",
                    },
                    fontFamily: {
                        "display": ["Manrope", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased selection:bg-primary selection:text-black">
<div class="relative flex min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark">
<!-- TopAppBar -->
<header class="flex items-center justify-between p-4 pb-2 z-10">
<button class="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined text-slate-900 dark:text-white" style="font-size: 24px;">arrow_back_ios_new</span>
</button>
<h2 class="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Tone</h2>
</header>
<!-- PageIndicators -->
<div class="flex w-full flex-row items-center justify-center gap-2 py-4">
<div class="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-[#43543b]"></div>
<div class="h-1.5 w-8 rounded-full bg-slate-900 dark:bg-white"></div>
<div class="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-[#43543b]"></div>
<div class="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-[#43543b]"></div>
</div>
<!-- Scrollable Content Area -->
<main class="flex-1 overflow-y-auto px-6 pb-32">
<!-- HeadlineText -->
<div class="pb-2 pt-4">
<h1 class="tracking-tight text-3xl font-extrabold leading-tight text-left text-slate-900 dark:text-white">
                    Choose your tone
                </h1>
</div>
<!-- BodyText -->
<div class="pb-6">
<p class="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                    Customize how Sage responds to your reflections.
                </p>
</div>
<!-- TextGrid / Selection Cards -->
<div class="flex flex-col gap-3">
<!-- Card 1: Practical -->
<button class="group flex w-full items-start gap-4 rounded-xl border border-transparent bg-white dark:bg-[#1f271c] p-4 text-left shadow-sm transition-all hover:border-slate-300 dark:hover:border-[#43543b] focus:outline-none ring-offset-2 focus:ring-2 ring-primary">
<div class="flex size-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white group-hover:text-primary transition-colors">
<span class="material-symbols-outlined">work</span>
</div>
<div class="flex flex-col gap-1">
<h3 class="text-base font-bold leading-tight text-slate-900 dark:text-white">Practical</h3>
<p class="text-sm font-medium leading-normal text-slate-500 dark:text-[#a6b99d]">Direct, actionable advice. No fluff.</p>
</div>
</button>
<!-- Card 2: Poetic (Active State) -->
<button class="relative flex w-full items-start gap-4 rounded-xl border-[1.5px] border-primary bg-primary/5 dark:bg-[#1f271c] p-4 text-left shadow-md transition-all">
<div class="absolute top-4 right-4 text-primary">
<span class="material-symbols-outlined filled" style="font-variation-settings: 'FILL' 1;">check_circle</span>
</div>
<div class="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary-dark dark:text-primary">
<span class="material-symbols-outlined">flight</span>
</div>
<div class="flex flex-col gap-1 pr-6">
<h3 class="text-base font-bold leading-tight text-slate-900 dark:text-white">Poetic</h3>
<p class="text-sm font-medium leading-normal text-slate-600 dark:text-slate-300">Metaphorical and gentle guidance.</p>
</div>
</button>
<!-- Card 3: Minimal -->
<button class="group flex w-full items-start gap-4 rounded-xl border border-transparent bg-white dark:bg-[#1f271c] p-4 text-left shadow-sm transition-all hover:border-slate-300 dark:hover:border-[#43543b] focus:outline-none ring-offset-2 focus:ring-2 ring-primary">
<div class="flex size-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white group-hover:text-primary transition-colors">
<span class="material-symbols-outlined">remove_circle_outline</span>
</div>
<div class="flex flex-col gap-1">
<h3 class="text-base font-bold leading-tight text-slate-900 dark:text-white">Minimal</h3>
<p class="text-sm font-medium leading-normal text-slate-500 dark:text-[#a6b99d]">Short, concise prompts. Less is more.</p>
</div>
</button>
<!-- Card 4: Deep -->
<button class="group flex w-full items-start gap-4 rounded-xl border border-transparent bg-white dark:bg-[#1f271c] p-4 text-left shadow-sm transition-all hover:border-slate-300 dark:hover:border-[#43543b] focus:outline-none ring-offset-2 focus:ring-2 ring-primary">
<div class="flex size-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white group-hover:text-primary transition-colors">
<span class="material-symbols-outlined">visibility</span>
</div>
<div class="flex flex-col gap-1">
<h3 class="text-base font-bold leading-tight text-slate-900 dark:text-white">Deep</h3>
<p class="text-sm font-medium leading-normal text-slate-500 dark:text-[#a6b99d]">Philosophical and probing questions.</p>
</div>
</button>
</div>
</main>
<!-- Fixed Bottom Actions -->
<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark dark:to-transparent pt-12 pb-6 px-6 z-20">
<div class="flex flex-col items-center gap-4">
<!-- Skip Action -->
<button class="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
                    Skip for now
                </button>
<!-- Primary CTA -->
<button class="w-full rounded-full bg-primary py-4 px-6 text-center text-base font-bold text-background-dark shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.01] active:scale-[0.98] transition-all">
                    Continue
                </button>
<!-- Privacy Note -->
<div class="flex items-center gap-1.5 opacity-60">
<span class="material-symbols-outlined text-xs text-slate-500 dark:text-slate-400" style="font-size: 14px;">lock</span>
<p class="text-xs font-medium text-slate-500 dark:text-slate-400 text-center">
                        Your reflections stay on your device unless you sync.
                    </p>
</div>
</div>
</div>
</div>
</body></html>

<!-- Explore Empty State (Dark Mode) - No Results -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage - Explore Empty State</title>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Theme Configuration -->
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#37ec13",
                        "background-light": "#f6f8f6",
                        "background-dark": "#132210",
                        "surface-dark": "#1c2e18",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "1rem", 
                        "lg": "2rem", 
                        "xl": "3rem", 
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display antialiased overflow-x-hidden text-slate-900 dark:text-white">
<!-- Top App Bar -->
<header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 pt-12 pb-4 flex items-center justify-between">
<button class="flex items-center justify-center p-2 -ml-2 text-white/80 hover:text-primary transition-colors rounded-full hover:bg-white/5">
<span class="material-symbols-outlined text-[28px]">arrow_back</span>
</button>
<h1 class="text-lg font-bold tracking-tight">Explore</h1>
<div class="w-10"></div> <!-- Spacer for optical centering -->
</header>
<!-- Search Bar Section -->
<div class="px-6 pb-2">
<div class="relative flex items-center w-full h-14 rounded-full bg-surface-dark/50 dark:bg-[#1f301b] border border-white/5 focus-within:border-primary/50 transition-all duration-300">
<div class="pl-5 pr-3 text-white/40 flex items-center justify-center pointer-events-none">
<span class="material-symbols-outlined text-[24px]">search</span>
</div>
<input aria-label="Search" class="w-full bg-transparent border-none text-white placeholder-white/40 focus:ring-0 text-base font-medium h-full px-0" type="text" value="Advanced Meditati..."/>
<button class="pr-5 pl-3 text-white/40 hover:text-white transition-colors flex items-center justify-center h-full">
<span class="material-symbols-outlined text-[20px]">cancel</span>
</button>
</div>
</div>
<!-- Main Content: Empty State -->
<main class="flex-1 flex flex-col items-center justify-center px-8 py-12 w-full max-w-md mx-auto">
<!-- Abstract Visual -->
<div class="mb-8 relative w-40 h-40 flex items-center justify-center">
<!-- Decorative minimal circles -->
<div class="absolute inset-0 border border-white/5 rounded-full scale-100"></div>
<div class="absolute inset-4 border border-white/5 rounded-full scale-90 opacity-70"></div>
<div class="absolute inset-8 border border-white/10 rounded-full scale-75 opacity-50 bg-white/5 backdrop-blur-sm"></div>
<!-- Icon -->
<span class="material-symbols-outlined text-white/20 text-[48px] relative z-10">search_off</span>
</div>
<!-- Text Block -->
<div class="text-center space-y-3 mb-10">
<h2 class="text-2xl font-bold tracking-tight text-white">No results found</h2>
<p class="text-white/60 text-sm leading-relaxed max-w-[280px] mx-auto">
                No matching explorations found. Try adjusting your search, or discover something new!
            </p>
</div>
<!-- Primary Action -->
<button class="bg-primary hover:bg-[#2fd010] active:scale-95 transition-all text-background-dark font-bold text-sm px-8 py-4 rounded-full w-full max-w-[200px] flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(55,236,19,0.3)]">
<span class="material-symbols-outlined text-[20px]">refresh</span>
<span>Clear Search</span>
</button>
</main>
<!-- Suggestions Section -->
<section class="px-6 pb-24">
<h3 class="text-xs font-bold uppercase tracking-widest text-white/30 mb-5 ml-1">Try searching for...</h3>
<div class="flex flex-wrap gap-3">
<button class="group flex items-center gap-2 bg-[#1f301b] border border-white/5 hover:border-primary/50 hover:bg-primary/10 transition-all rounded-full px-5 py-3">
<span class="material-symbols-outlined text-white/50 group-hover:text-primary text-[18px]">spa</span>
<span class="text-sm font-medium text-white/90 group-hover:text-primary">Mindfulness</span>
</button>
<button class="group flex items-center gap-2 bg-[#1f301b] border border-white/5 hover:border-primary/50 hover:bg-primary/10 transition-all rounded-full px-5 py-3">
<span class="material-symbols-outlined text-white/50 group-hover:text-primary text-[18px]">psychology</span>
<span class="text-sm font-medium text-white/90 group-hover:text-primary">Anxiety</span>
</button>
<button class="group flex items-center gap-2 bg-[#1f301b] border border-white/5 hover:border-primary/50 hover:bg-primary/10 transition-all rounded-full px-5 py-3">
<span class="material-symbols-outlined text-white/50 group-hover:text-primary text-[18px]">trending_up</span>
<span class="text-sm font-medium text-white/90 group-hover:text-primary">Growth</span>
</button>
<button class="group flex items-center gap-2 bg-[#1f301b] border border-white/5 hover:border-primary/50 hover:bg-primary/10 transition-all rounded-full px-5 py-3">
<span class="material-symbols-outlined text-white/50 group-hover:text-primary text-[18px]">bedtime</span>
<span class="text-sm font-medium text-white/90 group-hover:text-primary">Sleep</span>
</button>
<button class="group flex items-center gap-2 bg-[#1f301b] border border-white/5 hover:border-primary/50 hover:bg-primary/10 transition-all rounded-full px-5 py-3">
<span class="material-symbols-outlined text-white/50 group-hover:text-primary text-[18px]">self_improvement</span>
<span class="text-sm font-medium text-white/90 group-hover:text-primary">Reflect</span>
</button>
</div>
</section>
<!-- Bottom Navigation -->
<nav class="fixed bottom-0 left-0 right-0 bg-background-dark/90 backdrop-blur-xl border-t border-white/5 pb-8 pt-4 px-8 z-40">
<ul class="flex justify-between items-center max-w-md mx-auto">
<li>
<button class="flex flex-col items-center gap-1 text-white/40 hover:text-white transition-colors">
<span class="material-symbols-outlined text-[24px]">home</span>
<span class="text-[10px] font-medium tracking-wide">Home</span>
</button>
</li>
<li>
<button class="flex flex-col items-center gap-1 text-primary">
<span class="material-symbols-outlined text-[24px] fill-current">explore</span>
<span class="text-[10px] font-medium tracking-wide">Explore</span>
</button>
</li>
<li>
<button class="flex flex-col items-center gap-1 text-white/40 hover:text-white transition-colors">
<span class="material-symbols-outlined text-[24px]">menu_book</span>
<span class="text-[10px] font-medium tracking-wide">Journal</span>
</button>
</li>
<li>
<button class="flex flex-col items-center gap-1 text-white/40 hover:text-white transition-colors">
<span class="material-symbols-outlined text-[24px]">person</span>
<span class="text-[10px] font-medium tracking-wide">Profile</span>
</button>
</li>
</ul>
</nav>
</body></html>

<!-- Sage App Settings Screen (Dark Mode)  -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage App Settings</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;family=Noto+Sans:wght@400;500;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#37ec13",
                        "sage-black": "#121811",
                        "sage-dark": "#1c261b",
                        "sage-light": "#2b3928",
                        "sage-text": "#a1b99d",
                        "background-light": "#f6f8f6",
                        "background-dark": "#121811",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "2xl": "2rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        /* Custom scrollbar hide for cleaner UI */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-display text-white overflow-x-hidden selection:bg-primary selection:text-black">
<div class="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto bg-sage-black shadow-2xl overflow-hidden">
<!-- Header -->
<header class="sticky top-0 z-50 flex items-center bg-sage-black/80 backdrop-blur-md px-4 pt-6 pb-4 justify-between border-b border-white/5">
<button class="text-white flex size-10 shrink-0 items-center justify-center rounded-full active:bg-white/10 transition-colors">
<span class="material-symbols-outlined">arrow_back_ios_new</span>
</button>
<h2 class="text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Settings</h2>
</header>
<!-- Scrollable Content -->
<main class="flex-1 flex flex-col px-4 pb-12 overflow-y-auto no-scrollbar">
<!-- Profile Section -->
<div class="mt-6">
<h3 class="text-sage-text text-xs font-bold uppercase tracking-wider mb-2 ml-2">Profile</h3>
<div class="bg-sage-dark rounded-2xl overflow-hidden">
<!-- Tone Preference -->
<div class="p-4 border-b border-white/5">
<p class="text-white text-sm font-medium mb-3">Tone</p>
<div class="flex h-10 w-full items-center justify-center rounded-lg bg-sage-light p-1">
<label class="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 has-[:checked]:bg-sage-dark has-[:checked]:shadow-sm has-[:checked]:text-white text-sage-text text-xs font-medium transition-all">
<span class="truncate">Gentle</span>
<input checked="" class="invisible w-0 absolute" name="tone" type="radio" value="Gentle"/>
</label>
<label class="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 has-[:checked]:bg-sage-dark has-[:checked]:shadow-sm has-[:checked]:text-white text-sage-text text-xs font-medium transition-all">
<span class="truncate">Direct</span>
<input class="invisible w-0 absolute" name="tone" type="radio" value="Direct"/>
</label>
</div>
</div>
<!-- Narration Toggle -->
<div class="flex items-center justify-between p-4 border-b border-white/5 active:bg-white/5 transition-colors">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-sage-text">record_voice_over</span>
<p class="text-white text-sm font-medium">Narration</p>
</div>
<label class="relative inline-flex items-center cursor-pointer">
<input checked="" class="sr-only peer" type="checkbox"/>
<div class="w-11 h-6 bg-sage-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<!-- Voice Selector -->
<button class="w-full flex items-center justify-between p-4 border-b border-white/5 active:bg-white/5 transition-colors text-left">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-sage-text">graphic_eq</span>
<p class="text-white text-sm font-medium">Voice</p>
</div>
<div class="flex items-center gap-2">
<span class="text-sage-text text-sm">Sage (Default)</span>
<span class="material-symbols-outlined text-sage-text text-sm">chevron_right</span>
</div>
</button>
<!-- Speed Selector -->
<div class="p-4">
<div class="flex justify-between items-center mb-2">
<p class="text-white text-sm font-medium">Speed</p>
<span class="text-primary text-xs font-bold">1.0x</span>
</div>
<input class="w-full h-1 bg-sage-light rounded-lg appearance-none cursor-pointer [&amp;::-webkit-slider-thumb]:appearance-none [&amp;::-webkit-slider-thumb]:h-4 [&amp;::-webkit-slider-thumb]:w-4 [&amp;::-webkit-slider-thumb]:rounded-full [&amp;::-webkit-slider-thumb]:bg-primary" max="2.0" min="0.5" step="0.1" type="range" value="1.0"/>
</div>
</div>
</div>
<!-- Privacy Section -->
<div class="mt-6">
<h3 class="text-sage-text text-xs font-bold uppercase tracking-wider mb-2 ml-2">Privacy</h3>
<div class="bg-sage-dark rounded-2xl overflow-hidden">
<div class="flex items-center justify-between p-4 border-b border-white/5 active:bg-white/5 transition-colors">
<div class="flex flex-col">
<p class="text-white text-sm font-medium">Local-only Storage</p>
<span class="text-xs text-sage-text/70 mt-0.5">Data stays on this device</span>
</div>
<label class="relative inline-flex items-center cursor-pointer">
<input class="sr-only peer" type="checkbox"/>
<div class="w-11 h-6 bg-sage-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div class="flex items-center justify-between p-4 border-b border-white/5 active:bg-white/5 transition-colors">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-sage-text">cloud_sync</span>
<p class="text-white text-sm font-medium">iCloud Sync</p>
</div>
<label class="relative inline-flex items-center cursor-pointer">
<input checked="" class="sr-only peer" type="checkbox"/>
<div class="w-11 h-6 bg-sage-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<button class="w-full flex items-center justify-start p-4 active:bg-red-500/10 transition-colors text-left group">
<span class="material-symbols-outlined text-red-400 group-hover:text-red-500 mr-3">delete_forever</span>
<p class="text-red-400 text-sm font-medium group-hover:text-red-500">Delete all data</p>
</button>
</div>
</div>
<!-- Safety Section -->
<div class="mt-6">
<h3 class="text-sage-text text-xs font-bold uppercase tracking-wider mb-2 ml-2">Safety</h3>
<div class="bg-sage-dark rounded-2xl overflow-hidden">
<div class="flex items-center justify-between p-4 border-b border-white/5 active:bg-white/5 transition-colors">
<div class="flex flex-col">
<p class="text-white text-sm font-medium">Content Limits</p>
<span class="text-xs text-sage-text/70 mt-0.5">Avoid intense topics</span>
</div>
<label class="relative inline-flex items-center cursor-pointer">
<input class="sr-only peer" type="checkbox"/>
<div class="w-11 h-6 bg-sage-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<button class="w-full flex items-center justify-between p-4 active:bg-white/5 transition-colors text-left">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary">sos</span>
<p class="text-white text-sm font-medium">Crisis Help Resources</p>
</div>
<span class="material-symbols-outlined text-sage-text text-sm">open_in_new</span>
</button>
</div>
</div>
<!-- Notifications Section -->
<div class="mt-6">
<h3 class="text-sage-text text-xs font-bold uppercase tracking-wider mb-2 ml-2">Notifications</h3>
<div class="bg-sage-dark rounded-2xl overflow-hidden">
<div class="flex items-center justify-between p-4 active:bg-white/5 transition-colors">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-sage-text">notifications</span>
<p class="text-white text-sm font-medium">Daily Reflection</p>
</div>
<label class="relative inline-flex items-center cursor-pointer">
<input checked="" class="sr-only peer" type="checkbox"/>
<div class="w-11 h-6 bg-sage-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<!-- Time Picker Simulation -->
<div class="px-4 pb-4 pt-0">
<div class="flex justify-between items-center bg-sage-black rounded-xl p-3 border border-white/5">
<span class="text-xs text-sage-text uppercase font-bold tracking-wider">Time</span>
<div class="flex items-center gap-1 text-primary">
<span class="text-xl font-mono font-bold">08:00</span>
<span class="text-sm font-medium ml-1">AM</span>
</div>
</div>
</div>
</div>
</div>
<!-- Donation Card -->
<div class="mt-8 mb-2">
<div class="relative bg-gradient-to-br from-sage-dark to-[#0f1a0e] rounded-2xl p-5 border border-primary/20 shadow-[0_0_15px_rgba(55,236,19,0.05)] overflow-hidden">
<!-- Decorative glow -->
<div class="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
<div class="flex items-start gap-3 mb-4 relative z-10">
<div class="p-2 bg-primary/10 rounded-full text-primary">
<span class="material-symbols-outlined">favorite</span>
</div>
<div>
<h4 class="text-white font-bold text-base">Support Sage</h4>
<p class="text-sage-text text-xs mt-1 leading-relaxed">Your tips help us keep Sage ad-free and focused on your growth.</p>
</div>
</div>
<div class="grid grid-cols-3 gap-3 relative z-10">
<button class="flex flex-col items-center justify-center py-3 px-2 rounded-xl bg-sage-black border border-white/5 hover:border-primary/50 hover:bg-primary/5 active:scale-95 transition-all group">
<span class="text-xs text-sage-text group-hover:text-primary transition-colors">Coffee</span>
<span class="text-white font-bold text-sm mt-1">CHF 2</span>
</button>
<button class="flex flex-col items-center justify-center py-3 px-2 rounded-xl bg-sage-black border border-primary/30 shadow-[0_0_10px_rgba(55,236,19,0.1)] hover:bg-primary/10 active:scale-95 transition-all group relative overflow-hidden">
<div class="absolute inset-0 bg-primary/5"></div>
<span class="text-xs text-primary font-medium relative z-10">Lunch</span>
<span class="text-white font-bold text-sm mt-1 relative z-10">CHF 5</span>
</button>
<button class="flex flex-col items-center justify-center py-3 px-2 rounded-xl bg-sage-black border border-white/5 hover:border-primary/50 hover:bg-primary/5 active:scale-95 transition-all group">
<span class="text-xs text-sage-text group-hover:text-primary transition-colors">Dinner</span>
<span class="text-white font-bold text-sm mt-1">CHF 10</span>
</button>
</div>
</div>
</div>
<!-- About Section -->
<div class="mt-8 mb-8 flex flex-col items-center text-center px-6">
<div class="size-12 bg-sage-dark rounded-xl flex items-center justify-center mb-4">
<span class="material-symbols-outlined text-primary text-3xl">spa</span>
</div>
<h5 class="text-white font-bold text-sm mb-2">About Sage</h5>
<p class="text-sage-text text-xs leading-relaxed max-w-xs mx-auto">
                    Sage is designed to help you explore your inner world through gentle, reflective guidance. We believe in privacy, simplicity, and the power of self-inquiry.
                </p>
<div class="mt-6 flex flex-col gap-2 w-full max-w-xs">
<button class="text-xs text-primary hover:underline">Terms of Service</button>
<button class="text-xs text-primary hover:underline">Privacy Policy</button>
</div>
<p class="text-sage-text/40 text-[10px] mt-6">Version 2.4.0 (Build 192)</p>
</div>
</main>
<!-- Bottom Tab Bar (Contextual visual, static) -->
<div class="sticky bottom-0 bg-sage-black/90 backdrop-blur-lg border-t border-white/5 px-6 py-3 flex justify-between items-center z-50">
<button class="flex flex-col items-center gap-1 text-sage-text hover:text-white transition-colors">
<span class="material-symbols-outlined text-2xl">home_app_logo</span>
<span class="text-[10px] font-medium">Home</span>
</button>
<button class="flex flex-col items-center gap-1 text-sage-text hover:text-white transition-colors">
<span class="material-symbols-outlined text-2xl">history_edu</span>
<span class="text-[10px] font-medium">Journal</span>
</button>
<button class="flex flex-col items-center gap-1 text-primary">
<span class="material-symbols-outlined text-2xl fill-1">settings</span>
<span class="text-[10px] font-medium">Settings</span>
</button>
</div>
</div>
</body></html>

<!-- Sage App Journal Screen (Light Mode) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage Journal</title>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#37ec13",
                        "background-light": "#f6f8f6",
                        "background-dark": "#132210",
                        "surface-dark": "#1e2b1b",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.5rem",
                        "lg": "1rem",
                        "xl": "1.5rem",
                        "2xl": "2rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white selection:bg-primary selection:text-black">
<div class="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24">
<!-- Header -->
<header class="sticky top-0 z-30 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-4 transition-all duration-300">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary" style="font-size: 28px;">spa</span>
<h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Sage</h2>
</div>
<button class="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 dark:bg-surface-dark transition-colors hover:bg-primary/20">
<span class="material-symbols-outlined text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">calendar_today</span>
</button>
</header>
<!-- Greeting Section -->
<div class="px-6 py-2">
<h1 class="text-3xl font-light tracking-tight text-slate-500 dark:text-slate-400">
                Good evening, <span class="text-slate-900 dark:text-white font-semibold">Alex.</span>
</h1>
</div>
<!-- Daily Prompt Card -->
<div class="p-6 pt-4">
<div class="group relative overflow-hidden rounded-2xl bg-slate-900 shadow-lg dark:shadow-none transition-transform active:scale-[0.98]">
<!-- Background Image with Overlay -->
<div class="absolute inset-0 z-0 h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Abstract dark green blurry forest leaves texture" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAUM-c7EoKduA1Fkfj2QhmhRz0MM2c5QnJQbAkkst4L3bsbXOQg6uohcCtjIasgkgHhUY3X4J-G3XsesPJR4HLOsNTq-FPHGw6IOKVZSIOaRwBYeKX5D8xB_9txinBrhsPtskk2wxqK5WwpiayUwknelLlD8ExVWmWaS1qrsNMGwbS0Kt5UmHsNN7UYaH8Xiwz7s5ZWPFTous2s6p4Yj39yUKoh1K61A1uSmCyeVwvDYB31I5mhkZ8V5j7xBEtXPJnP9y7dWRLs-_zP");'>
</div>
<div class="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
<!-- Content -->
<div class="relative z-20 flex flex-col items-start justify-end gap-3 p-6 pt-32">
<div class="inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary backdrop-blur-sm">
                        Daily Prompt
                    </div>
<div class="flex w-full items-end justify-between gap-4">
<div class="flex flex-1 flex-col gap-2">
<h3 class="text-2xl font-bold leading-tight text-white">What energy are you bringing into your space today?</h3>
<p class="text-sm font-medium text-slate-300">Take a moment to center yourself.</p>
</div>
<button class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-[0_0_20px_rgba(55,236,19,0.3)] transition-colors hover:bg-primary">
<span class="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</div>
</div>
</div>
<!-- Section Header -->
<div class="flex items-center justify-between px-6 py-2">
<h3 class="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Recent Entries</h3>
<button class="text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">View All</button>
</div>
<!-- Entries List -->
<div class="flex flex-col gap-3 px-4">
<!-- Item 1 -->
<div class="group flex cursor-pointer items-start gap-4 rounded-xl bg-white p-4 shadow-sm transition-colors hover:bg-slate-50 dark:bg-surface-dark dark:hover:bg-[#253521] dark:shadow-none">
<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-primary">
<span class="material-symbols-outlined" style="font-size: 24px;">cloud</span>
</div>
<div class="flex flex-1 flex-col gap-1">
<div class="flex items-center justify-between">
<p class="text-base font-semibold text-slate-900 dark:text-white">September 24</p>
<span class="text-xs font-medium text-slate-400">8:30 PM</span>
</div>
<p class="line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-300">
                        Felt overwhelmed at first, but the evening walk really helped clear my mind. The air was crisp.
                    </p>
</div>
<div class="flex h-full items-center justify-center pt-2 text-slate-300 dark:text-slate-600 group-hover:text-primary dark:group-hover:text-primary transition-colors">
<span class="material-symbols-outlined text-lg">arrow_forward_ios</span>
</div>
</div>
<!-- Item 2 -->
<div class="group flex cursor-pointer items-start gap-4 rounded-xl bg-white p-4 shadow-sm transition-colors hover:bg-slate-50 dark:bg-surface-dark dark:hover:bg-[#253521] dark:shadow-none">
<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-primary">
<span class="material-symbols-outlined" style="font-size: 24px;">bolt</span>
</div>
<div class="flex flex-1 flex-col gap-1">
<div class="flex items-center justify-between">
<p class="text-base font-semibold text-slate-900 dark:text-white">September 23</p>
<span class="text-xs font-medium text-slate-400">10:15 AM</span>
</div>
<p class="line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-300">
                        A breakthrough in the project! Finally connected the dots on the user flow. Energy is high today.
                    </p>
</div>
<div class="flex h-full items-center justify-center pt-2 text-slate-300 dark:text-slate-600 group-hover:text-primary dark:group-hover:text-primary transition-colors">
<span class="material-symbols-outlined text-lg">arrow_forward_ios</span>
</div>
</div>
<!-- Item 3 -->
<div class="group flex cursor-pointer items-start gap-4 rounded-xl bg-white p-4 shadow-sm transition-colors hover:bg-slate-50 dark:bg-surface-dark dark:hover:bg-[#253521] dark:shadow-none">
<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-primary">
<span class="material-symbols-outlined" style="font-size: 24px;">water_drop</span>
</div>
<div class="flex flex-1 flex-col gap-1">
<div class="flex items-center justify-between">
<p class="text-base font-semibold text-slate-900 dark:text-white">September 20</p>
<span class="text-xs font-medium text-slate-400">9:00 PM</span>
</div>
<p class="line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-300">
                        Quiet day. Spent most of it reading and drinking tea. Not much to report, but felt peaceful.
                    </p>
</div>
<div class="flex h-full items-center justify-center pt-2 text-slate-300 dark:text-slate-600 group-hover:text-primary dark:group-hover:text-primary transition-colors">
<span class="material-symbols-outlined text-lg">arrow_forward_ios</span>
</div>
</div>
</div>
</div>
<!-- Floating Action Button -->
<div class="fixed bottom-24 right-6 z-40">
<button class="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-background-dark shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-200">
<span class="material-symbols-outlined" style="font-size: 32px;">edit</span>
</button>
</div>
<!-- Bottom Navigation -->
<nav class="fixed bottom-0 left-0 z-50 w-full border-t border-slate-200 bg-white/90 dark:border-white/5 dark:bg-[#121811]/90 backdrop-blur-lg pb-safe">
<div class="flex h-20 items-start justify-around pt-4">
<button class="group flex flex-col items-center gap-1">
<span class="material-symbols-outlined text-slate-400 group-hover:text-slate-900 dark:text-slate-500 dark:group-hover:text-white transition-colors">home</span>
<span class="text-[10px] font-medium text-slate-400 group-hover:text-slate-900 dark:text-slate-500 dark:group-hover:text-white transition-colors">Home</span>
</button>
<button class="group flex flex-col items-center gap-1">
<span class="material-symbols-outlined text-primary fill-current">auto_stories</span>
<span class="text-[10px] font-medium text-primary">Journal</span>
</button>
<button class="group flex flex-col items-center gap-1">
<span class="material-symbols-outlined text-slate-400 group-hover:text-slate-900 dark:text-slate-500 dark:group-hover:text-white transition-colors">insights</span>
<span class="text-[10px] font-medium text-slate-400 group-hover:text-slate-900 dark:text-slate-500 dark:group-hover:text-white transition-colors">Insights</span>
</button>
<button class="group flex flex-col items-center gap-1">
<span class="material-symbols-outlined text-slate-400 group-hover:text-slate-900 dark:text-slate-500 dark:group-hover:text-white transition-colors">person</span>
<span class="text-[10px] font-medium text-slate-400 group-hover:text-slate-900 dark:text-slate-500 dark:group-hover:text-white transition-colors">Profile</span>
</button>
</div>
</nav>
<!-- Safe area padding for bottom nav -->
<style>
        .pb-safe {
            padding-bottom: env(safe-area-inset-bottom);
        }
    </style>
</body></html>

<!-- Home Tab -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage - Home</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#13ecc8",
                        "background-light": "#f6f8f8",
                        "background-dark": "#10221f",
                        "surface-dark": "#162b28",
                        "surface-darker": "#0d1c1a",
                    },
                    fontFamily: {
                        "display": ["Lexend", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "2xl": "1rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style>
        /* Custom Range Slider Styling */
        input[type=range] {
            -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
            width: 100%; /* Specific width is required for Firefox. */
            background: transparent; /* Otherwise white in Chrome */
        }
        
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #13ecc8;
            cursor: pointer;
            margin-top: -8px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
            box-shadow: 0 0 10px rgba(19, 236, 200, 0.4);
        }
        
        input[type=range]::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #13ecc8;
            cursor: pointer;
            border: none;
            box-shadow: 0 0 10px rgba(19, 236, 200, 0.4);
        }
        
        input[type=range]::-webkit-slider-runnable-track {
            width: 100%;
            height: 4px;
            cursor: pointer;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
        }
        
        input[type=range]:focus {
            outline: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-display antialiased">
<div class="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24">
<!-- Top Section with Illustration Background -->
<div class="relative w-full">
<!-- Abstract Background Illustration -->
<div class="absolute inset-0 w-full h-full z-0 opacity-40">
<div class="w-full h-full bg-cover bg-center" data-alt="abstract soothing aurora borealis gradient" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBRi0lqw67HZhEEXVckz2u3EAIyfMYTSlt0yoh0LvP0oEUhBatFWA7D1MtPRIK5T6X4rR3B0vNAr9wUT9p9n6FnzmhGcUqpHzMlODpgmPrl_QlIJs3UNiBO8vbRvZumt4S_C6zIqzqSJ1Z77NOrjJ7-pKCTgRyyTIl21CCzweZ7d9PtjMniOFV9e4-uRytTbp3vqFgTxsbAlqoeeza8qsbMdEkwSUEenFF1WNqbQRtZne3J8W3lx1Sr2sTxz0z-CR68Ihd_b_UjSS24'); mask-image: linear-gradient(to bottom, black 0%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);"></div>
</div>
<!-- Header Content -->
<div class="relative z-10 px-6 pt-12 pb-6">
<div class="flex items-center justify-between mb-6">
<!-- App/Brand or simple spacer -->
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-3xl">spa</span>
<h2 class="text-white text-xl font-bold tracking-tight">Sage</h2>
</div>
<!-- Profile Avatar -->
<div class="h-10 w-10 rounded-full bg-white/10 p-0.5 cursor-pointer ring-1 ring-white/20">
<img alt="Profile avatar of a young woman" class="h-full w-full rounded-full object-cover" data-alt="User profile picture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTexO0RaKHVbxnAXU-sf9Xk2MLYB1PKboZsPrPQc6TKAMAqbQojtmzNBW9uURsn_vhDHm1wwfaujC29ZD4QN36z8cCSM1T7z-UV6Z8S-JTjBnDXZ4l7kvM8lW3bRhGwxg64B24_bq_U_Uc1JDeUC7BruygjH3ojcF7vnRQnU43cJj8iW99NfP0IHtK7rDXwT2PZj966rxtBE2fsdKMm__fkoCGEr5L_DplLgZBPYLglKDw774VCxuO2oMuMnNzqg8P_V6_soUDRh5A"/>
</div>
</div>
<!-- Greeting and Streak -->
<div class="flex flex-col gap-1">
<h1 class="text-white text-3xl font-bold leading-tight tracking-tight">Good evening,<br/>Alex</h1>
<!-- Streak Badge (Modified ProfileStats) -->
<div class="flex items-center gap-2 mt-2">
<div class="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 backdrop-blur-sm">
<span class="material-symbols-outlined text-primary text-[18px] fill-1">local_fire_department</span>
<span class="text-white font-semibold text-sm">14 Day Streak</span>
</div>
</div>
</div>
</div>
</div>
<!-- Main Content Area -->
<div class="flex flex-col gap-8 px-4 -mt-2 relative z-10">
<!-- Daily Session Card -->
<div class="w-full bg-surface-dark border border-white/5 rounded-2xl p-5 shadow-xl shadow-black/20">
<div class="flex justify-between items-start mb-6">
<div>
<h2 class="text-white text-xl font-bold">Daily Session</h2>
<p class="text-gray-400 text-sm mt-1 flex items-center gap-1">
<span class="material-symbols-outlined text-base">schedule</span>
                        3 min check-in
                    </p>
</div>
<div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
<span class="material-symbols-outlined">edit_note</span>
</div>
</div>
<!-- Sliders -->
<div class="space-y-6 mb-8">
<!-- Mood Slider -->
<div>
<div class="flex justify-between text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
<span>Calm</span>
<span>Overwhelmed</span>
</div>
<input class="w-full" max="100" min="0" type="range" value="30"/>
</div>
<!-- Energy Slider -->
<div>
<div class="flex justify-between text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
<span>Low Energy</span>
<span>High Energy</span>
</div>
<input class="w-full" max="100" min="0" type="range" value="70"/>
</div>
</div>
<!-- CTA Button -->
<button class="w-full bg-primary hover:bg-[#0fd4b3] text-surface-darker font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
<span>Start Session</span>
<span class="material-symbols-outlined text-lg">arrow_forward</span>
</button>
</div>
<!-- Quick Prompts Section -->
<div>
<div class="flex items-center justify-between px-2 mb-3">
<h3 class="text-white text-lg font-bold">Quick prompts</h3>
<button class="text-primary text-sm font-medium">See all</button>
</div>
<div class="flex overflow-x-auto gap-3 pb-2 hide-scrollbar px-1">
<button class="whitespace-nowrap rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-5 py-2.5 text-sm font-medium transition-all">
                    Stress
                </button>
<button class="whitespace-nowrap rounded-full border border-primary/30 bg-primary/10 text-primary px-5 py-2.5 text-sm font-medium transition-all">
                    Purpose
                </button>
<button class="whitespace-nowrap rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-5 py-2.5 text-sm font-medium transition-all">
                    Relationships
                </button>
<button class="whitespace-nowrap rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-5 py-2.5 text-sm font-medium transition-all">
                    Discipline
                </button>
<button class="whitespace-nowrap rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-5 py-2.5 text-sm font-medium transition-all">
                    Fear
                </button>
<button class="whitespace-nowrap rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-5 py-2.5 text-sm font-medium transition-all">
                    Change
                </button>
</div>
</div>
<!-- Recent Insights List -->
<div>
<div class="flex items-center justify-between px-2 mb-3">
<h3 class="text-white text-lg font-bold">Recent Insights</h3>
</div>
<div class="flex flex-col gap-3">
<!-- Card 1 -->
<div class="group flex items-center gap-4 bg-surface-dark hover:bg-[#1f3834] p-4 rounded-xl border border-white/5 transition-colors cursor-pointer">
<div class="h-12 w-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
<span class="material-symbols-outlined">psychology</span>
</div>
<div class="flex-1 min-w-0">
<div class="flex items-center justify-between mb-0.5">
<h4 class="text-white font-semibold truncate">The Power of Habit</h4>
<span class="text-xs text-gray-500">Oct 24</span>
</div>
<p class="text-gray-400 text-sm truncate">Today I realized that small changes in my morning...</p>
</div>
<span class="material-symbols-outlined text-gray-600 group-hover:text-primary transition-colors">chevron_right</span>
</div>
<!-- Card 2 -->
<div class="group flex items-center gap-4 bg-surface-dark hover:bg-[#1f3834] p-4 rounded-xl border border-white/5 transition-colors cursor-pointer">
<div class="h-12 w-12 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
<span class="material-symbols-outlined">self_improvement</span>
</div>
<div class="flex-1 min-w-0">
<div class="flex items-center justify-between mb-0.5">
<h4 class="text-white font-semibold truncate">Facing Anxiety</h4>
<span class="text-xs text-gray-500">Oct 23</span>
</div>
<p class="text-gray-400 text-sm truncate">Breathing exercises helped me calm down before...</p>
</div>
<span class="material-symbols-outlined text-gray-600 group-hover:text-primary transition-colors">chevron_right</span>
</div>
<!-- Card 3 -->
<div class="group flex items-center gap-4 bg-surface-dark hover:bg-[#1f3834] p-4 rounded-xl border border-white/5 transition-colors cursor-pointer">
<div class="h-12 w-12 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
<span class="material-symbols-outlined">calendar_month</span>
</div>
<div class="flex-1 min-w-0">
<div class="flex items-center justify-between mb-0.5">
<h4 class="text-white font-semibold truncate">Weekly Review</h4>
<span class="text-xs text-gray-500">Oct 20</span>
</div>
<p class="text-gray-400 text-sm truncate">My focus for next week is balancing work and...</p>
</div>
<span class="material-symbols-outlined text-gray-600 group-hover:text-primary transition-colors">chevron_right</span>
</div>
</div>
</div>
<!-- Spacer for Bottom Nav -->
<div class="h-6"></div>
</div>
<!-- Bottom Navigation Bar -->
<div class="fixed bottom-0 left-0 w-full bg-[#10221f]/95 backdrop-blur-md border-t border-white/5 px-6 py-4 pb-8 z-50">
<div class="flex justify-between items-center">
<button class="flex flex-col items-center gap-1 text-primary">
<span class="material-symbols-outlined fill-1">home</span>
<span class="text-[10px] font-medium">Home</span>
</button>
<button class="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300">
<span class="material-symbols-outlined">book_2</span>
<span class="text-[10px] font-medium">Journal</span>
</button>
<button class="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300">
<span class="material-symbols-outlined">explore</span>
<span class="text-[10px] font-medium">Explore</span>
</button>
<button class="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300">
<span class="material-symbols-outlined">person</span>
<span class="text-[10px] font-medium">Profile</span>
</button>
</div>
</div>
</div>
</body></html>

<!-- Sage App Donation Thank You (Dark Mode)  -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage - Donation Thank You</title>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#37ec13",
                        "background-light": "#f6f8f6",
                        "background-dark": "#132210",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="font-display antialiased">
<!-- Main Container -->
<div class="relative flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden text-slate-900 dark:text-white">
<!-- Top Bar -->
<div class="flex items-center p-4 pb-2 justify-between sticky top-0 z-10">
<div class="flex size-12 shrink-0 items-center justify-center rounded-full active:bg-white/10 transition-colors cursor-pointer text-slate-900 dark:text-white">
<span class="material-symbols-outlined" style="font-size: 24px;">close</span>
</div>
</div>
<!-- Main Content Area: Vertically Centered -->
<div class="flex flex-1 flex-col justify-center items-center px-6 py-6 w-full max-w-md mx-auto">
<!-- Success Graphic / Empty State Replacement -->
<div class="flex flex-col items-center gap-8 w-full">
<!-- Icon Container -->
<div class="relative flex items-center justify-center">
<!-- Abstract glowing effect behind -->
<div class="absolute inset-0 rounded-full bg-primary/20 blur-2xl"></div>
<!-- Main Circle -->
<div class="relative flex items-center justify-center w-32 h-32 rounded-full bg-[#1e2f1b] border border-[#2a3f26]">
<span class="material-symbols-outlined text-primary" style="font-size: 48px;">check</span>
</div>
</div>
<!-- Text Content -->
<div class="flex max-w-[480px] flex-col items-center gap-4 text-center">
<h1 class="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
                        Deeply appreciated.
                    </h1>
<p class="text-slate-600 dark:text-gray-300 text-base font-light leading-relaxed max-w-[320px]">
                        Your generosity fuels the growth of Sage. Thank you for supporting our journey towards mindfulness and reflection.
                    </p>
</div>
<!-- Transaction Pill -->
<div class="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#1e2f1b] border border-[#2a3f26]">
<span class="material-symbols-outlined text-primary/60 mr-2" style="font-size: 16px;">receipt_long</span>
<p class="text-primary/80 text-xs font-medium tracking-wide uppercase">
                        Donation #8492 — $5.00
                    </p>
</div>
</div>
</div>
<!-- Bottom Actions -->
<div class="flex flex-col gap-4 px-6 py-8 w-full max-w-md mx-auto">
<!-- Primary Button -->
<button class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-primary text-background-dark hover:opacity-90 active:scale-[0.98] transition-all duration-200">
<span class="text-base font-bold leading-normal tracking-wide">Return to Home</span>
</button>
<!-- Secondary Link -->
<button class="flex w-full items-center justify-center gap-2 py-2 group">
<p class="text-slate-500 dark:text-[#a1b99d] text-sm font-normal group-hover:underline transition-all">
                    Need a receipt?
                </p>
</button>
</div>
<!-- Bottom Spacer/Safe Area -->
<div class="h-5"></div>
</div>
</body></html>

<!-- Sage App Explore Screen (Light Mode) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage App - Explore</title>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#37ec13",
                        "background-light": "#f6f8f6",
                        "background-dark": "#132210", // Deep warm dark green/black
                        "surface-dark": "#1d271c",
                        "surface-light": "#ffffff",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"],
                        "sans": ["Inter", "sans-serif"],
                    },
                    borderRadius: {"DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "2xl": "2rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        /* Custom scrollbar hiding for horizontal scroll */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased selection:bg-primary selection:text-black">
<div class="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24">
<!-- Header -->
<header class="flex items-center px-6 py-5 justify-between sticky top-0 z-20 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
<div class="flex items-center gap-4">
<div class="relative group cursor-pointer">
<div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-transparent group-hover:ring-primary transition-all duration-300" data-alt="Profile picture of a user smiling softly" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZKN4ZPbGatqKLQQvoct6oOV_5hgp9WgyMDRs_QIiZJaEfdCiJ0062wA0o6Il5FnXbelu48jmM6uxaPyoXql9siJtH1Udnej5fyzlD-x5hRTc90eIhxA0cfyZIxT4trUAXTgKeMeQCZgNlT4LWXrLlsuzSAgLBHIFJGpZT02pgs1yT33X9HssbqM0ihC0oXGuxdVPbsjBFH7jdeIuuqYhK7XC4YXCOAlnLNqKH9egQkOCjX5HbYGEHQKuKpB0-UHxpt61VPd8wZSHD");'></div>
<div class="absolute bottom-0 right-0 size-3 bg-primary rounded-full border-2 border-background-light dark:border-background-dark"></div>
</div>
<div class="flex flex-col">
<span class="text-xs font-medium text-slate-500 dark:text-slate-400">Good evening,</span>
<h2 class="text-lg font-bold leading-tight tracking-tight">Alex</h2>
</div>
</div>
<button class="flex items-center justify-center size-10 rounded-full bg-slate-200 dark:bg-[#2b3928] hover:bg-slate-300 dark:hover:bg-[#3a4d36] transition-colors text-slate-700 dark:text-white">
<span class="material-symbols-outlined text-[20px]">search</span>
</button>
</header>
<!-- Main Content -->
<main class="flex flex-col gap-8 px-6 pt-2">
<!-- Daily Focus Card -->
<section class="flex flex-col gap-4">
<div class="relative w-full overflow-hidden rounded-2xl shadow-lg group cursor-pointer">
<!-- Background Image with Overlay -->
<div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Misty dark forest landscape with soft light" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhUk2dlMUaht8KqBz1jKvmPupSM6T16m3cDRHs1IaNekJogUGOAv8j4lESqStdTbRUsxqyekVyrua2g0oahMV4IS82EU_tKEmihL-xECAoyXp4aYotEjulWni0EqdwAfPE52sTBGO2HDraaVLVPOCbcm0Da89XfWljXQ4xhMLsIQe0RdjGd3HbAUPLuujdiq24yiUdm6MssVhs9BYQ8fv7vQFr5GNGYFlxrnBrbkrwcBFymj6pUtvPMkiInnT2B_okqtC_HpbOs_hs");'>
</div>
<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
<!-- Content -->
<div class="relative p-6 flex flex-col items-start justify-end min-h-[320px] h-full">
<div class="mb-auto inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
<span class="material-symbols-outlined text-primary text-[16px]">spark</span>
<span class="text-xs font-semibold text-white tracking-wide uppercase">Daily Focus</span>
</div>
<h2 class="text-3xl font-bold text-white mb-2 leading-tight">Daily Reflection</h2>
<p class="text-slate-300 text-base font-normal mb-6 max-w-[90%]">What is holding you back today? Take a moment to look inward.</p>
<div class="w-full flex items-center justify-between">
<div class="flex -space-x-2">
<div class="size-8 rounded-full border-2 border-black bg-slate-700 bg-cover" data-alt="User avatar 1" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBnJggt13GkaCO93-XEW8Tz_ql5f_wkMreMcLbgkJnPQH6FmqIdLnwszSX1d8ddztg85E7D7cnW0pU44exl-lMpQMLS82vpjwWwW4himOG-Sg9qAs5rfTJYAXsQdYYrSVx52biM7bOmOdwbDD4L_FIeo_QqCYsjkCXDYUq5WQ-BLbAUhBLRCr7KQi1jpIRH5gJ9050Lw9zIXp1MoLv87rT7lzBy4N1JQQ1k3RtzeKvvZin8eN2d_4zfXEEl3wmH96HOdqDDkdZBOWcH")'></div>
<div class="size-8 rounded-full border-2 border-black bg-slate-700 bg-cover" data-alt="User avatar 2" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBiiuigjkDYnm_fZ9-HJLMkhlPR2WD4nOW51bwC8DKWGOaSQH3mHdzIGibQjvs7I2ZbFSnDwjlKGS99OMHoJSWNAMRdSQMVLq7iMpBG4E0QrPITJ-IMAYCAEnUuK8xbX7qfdgB16WCCtVBm7GRucwgQUsP4yEYmXo8w_A_r9CMKTgJu1l4-_zRnNbiQU7Z4HXckR7qhbt6blQtH3fKPXdCSlL2Or2JtJirjM4zrHWPlSyRj1HlzjEnJ28bb_XAoQbp48hdviTo4L5wO")'></div>
<div class="size-8 rounded-full border-2 border-black bg-slate-800 flex items-center justify-center text-[10px] text-white font-medium">+2k</div>
</div>
<button class="h-10 px-6 bg-primary hover:bg-[#2ed60e] active:scale-95 transition-all text-background-dark font-bold text-sm rounded-xl flex items-center gap-2">
<span>Start</span>
<span class="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
</div>
</div>
</section>
<!-- Quick Actions (Chips) -->
<section>
<div class="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6">
<button class="flex shrink-0 items-center justify-center gap-x-2 rounded-xl bg-slate-200 dark:bg-[#2b3928] hover:dark:bg-[#3a4d36] px-5 py-3 transition-colors group">
<span class="material-symbols-outlined text-slate-700 dark:text-primary text-[20px]">edit_note</span>
<p class="text-slate-900 dark:text-white text-sm font-semibold">Journal</p>
</button>
<button class="flex shrink-0 items-center justify-center gap-x-2 rounded-xl bg-slate-200 dark:bg-[#2b3928] hover:dark:bg-[#3a4d36] px-5 py-3 transition-colors">
<span class="material-symbols-outlined text-slate-700 dark:text-primary text-[20px]">air</span>
<p class="text-slate-900 dark:text-white text-sm font-semibold">Breathwork</p>
</button>
<button class="flex shrink-0 items-center justify-center gap-x-2 rounded-xl bg-slate-200 dark:bg-[#2b3928] hover:dark:bg-[#3a4d36] px-5 py-3 transition-colors">
<span class="material-symbols-outlined text-slate-700 dark:text-primary text-[20px]">mood</span>
<p class="text-slate-900 dark:text-white text-sm font-semibold">Log Mood</p>
</button>
<button class="flex shrink-0 items-center justify-center gap-x-2 rounded-xl bg-slate-200 dark:bg-[#2b3928] hover:dark:bg-[#3a4d36] px-5 py-3 transition-colors">
<span class="material-symbols-outlined text-slate-700 dark:text-primary text-[20px]">favorite</span>
<p class="text-slate-900 dark:text-white text-sm font-semibold">Gratitude</p>
</button>
</div>
</section>
<!-- Explore Topics Grid -->
<section>
<div class="flex items-end justify-between mb-4">
<h3 class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Explore Topics</h3>
<a class="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" href="#">View all</a>
</div>
<div class="grid grid-cols-2 gap-4">
<!-- Card 1 -->
<div class="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-slate-100 dark:bg-[#1d271c] h-48 cursor-pointer">
<div class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-70 dark:opacity-50" data-alt="Abstract calming water ripples" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDon8AlOS3xItj5yDDV0cUKbB3P5X1LuK0bNqxWHW-ZxrthlmLeymPVxBcwnurSO3n0oV6XOsDNxGLc80guAApWyNTQY6QAmvM3xGbUPJS3mcG6Di8fhQ7Gz_1GhKuI_Igunz8-RnlC_6HBhQnmWAmObgO4XK31NDCvMakaH-3eJQlNFVjogSJtjmrbt7vzUtR4lAll_koyVr5a3cB-DLuG-yEPp-rIedyWumkQ-sdy-pjfBgmXm4bO5aQTtbNO08PVkqVLuCl-cl2n");'>
</div>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
<div class="relative p-4">
<div class="mb-1 flex size-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
<span class="material-symbols-outlined text-white text-[18px]">self_improvement</span>
</div>
<h4 class="text-white font-bold text-base leading-tight">Inner Peace</h4>
<p class="text-slate-300 text-xs mt-1">5 sessions</p>
</div>
</div>
<!-- Card 2 -->
<div class="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-slate-100 dark:bg-[#1d271c] h-48 cursor-pointer">
<div class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-70 dark:opacity-50" data-alt="Minimalist mountain peak silhouette" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCN3ghijlCKGLMfbPo2XxYeju-w0IVryc64XLNA1X2vwPVeWpxJJeDlwJfefMm0KkRz09nR_0OeD1RIh9c7E4B_YrCuWPpIMVzN1jDEwG1_8MkG4O77JfQMzJKXJJ_BcS6YlKG-yRXxuc24MKKyTXRJs0bVLYGBUCe7WyXM2-F8CX10EHZUWOsrOjjiHOpGNzYubebdFVKycLsWEdzQEIQFhym3Zd5YbJTVnJjsaUhrd7h8d4ts070pQXedZaiH8T1ehUnkWgvGD6uB");'>
</div>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
<div class="relative p-4">
<div class="mb-1 flex size-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
<span class="material-symbols-outlined text-white text-[18px]">trending_up</span>
</div>
<h4 class="text-white font-bold text-base leading-tight">Growth</h4>
<p class="text-slate-300 text-xs mt-1">8 exercises</p>
</div>
</div>
<!-- Card 3 -->
<div class="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-slate-100 dark:bg-[#1d271c] h-48 cursor-pointer">
<div class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-70 dark:opacity-50" data-alt="Soft warm light gradient abstract" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDL12SVXDgqDXu9xMi7Aqzvd1xHVNdboPFmWSKHQNaRnZe2jqTuuXT1McPSAlncr26rXm_zDbvxi813_oHrR3MHXz3PDU_mQE2b6e-RwoUy5GMiN-NwHfoFO9KXy0SzvAPhzL05y37SUjcKWo4FrdsTG9G-rJexchuI0i1NDoobQyvIq9gWD7SXLZzz6MceVX48SxgVwwNbIuCYeTIdBr5N4h3xzXks5bRE3cI8x_OdwU8qTKKAnB0emxNah-4cCi-gE1TDBnhat4Gn");'>
</div>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
<div class="relative p-4">
<div class="mb-1 flex size-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
<span class="material-symbols-outlined text-white text-[18px]">diversity_3</span>
</div>
<h4 class="text-white font-bold text-base leading-tight">Relationships</h4>
<p class="text-slate-300 text-xs mt-1">3 courses</p>
</div>
</div>
<!-- Card 4 -->
<div class="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-slate-100 dark:bg-[#1d271c] h-48 cursor-pointer">
<div class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-70 dark:opacity-50" data-alt="Zen stones balanced in dark setting" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBAuPoBNOX_aaAH4NJOFRFD7bfZwL8GjWBdVCXQ0XpeyXv8awOxRoVKlkjlazRCXSEo0a97r-yHWbooLzuoPeeM29-STswW0Iv25iKKtYaOydvAAxRky3Fbt8bdJU4zAmW6fPYHvsLOopWFb8azg9FtMJmm1VgkPKH15fk6WO36d8ptirtUPt4VX-FRbgRxZPiRFhPtk4-g_QsSaDuwY5w_czVc1qeMq4svIWOKR9jFYl_dNBbQD4i7hOoRRRwnDX2FghveQPVmQMTz");'>
</div>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
<div class="relative p-4">
<div class="mb-1 flex size-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
<span class="material-symbols-outlined text-white text-[18px]">bedtime</span>
</div>
<h4 class="text-white font-bold text-base leading-tight">Sleep</h4>
<p class="text-slate-300 text-xs mt-1">12 sounds</p>
</div>
</div>
</div>
</section>
<div class="h-6"></div> <!-- Spacer -->
</main>
<!-- Floating Action Button -->
<button class="fixed bottom-24 right-6 size-16 bg-primary text-background-dark rounded-full shadow-[0_0_20px_rgba(55,236,19,0.4)] hover:shadow-[0_0_25px_rgba(55,236,19,0.6)] hover:scale-105 active:scale-95 transition-all z-40 flex items-center justify-center">
<span class="material-symbols-outlined text-[32px] font-bold">chat_bubble</span>
</button>
<!-- Bottom Navigation -->
<nav class="fixed bottom-0 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 z-50">
<div class="flex justify-around items-center h-20 px-2 pb-2">
<a class="flex flex-col items-center justify-center w-full gap-1 group" href="#">
<span class="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors text-[28px]">home</span>
<span class="text-[10px] font-medium text-slate-500 group-hover:text-primary">Home</span>
</a>
<a class="flex flex-col items-center justify-center w-full gap-1 group" href="#">
<div class="bg-primary/10 px-4 py-1 rounded-full">
<span class="material-symbols-outlined text-primary text-[28px]">explore</span>
</div>
<span class="text-[10px] font-bold text-primary">Explore</span>
</a>
<a class="flex flex-col items-center justify-center w-full gap-1 group" href="#">
<span class="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors text-[28px]">bookmark</span>
<span class="text-[10px] font-medium text-slate-500 group-hover:text-primary">Saved</span>
</a>
<a class="flex flex-col items-center justify-center w-full gap-1 group" href="#">
<span class="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors text-[28px]">person</span>
<span class="text-[10px] font-medium text-slate-500 group-hover:text-primary">Profile</span>
</a>
</div>
</nav>
</div>
</body></html>

<!-- Offline Mode Banner (Dark Mode) - Error State -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage - Offline Mode</title>
<!-- Fonts and Icons -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#37ec13",
                        "background-light": "#f6f8f6",
                        "background-dark": "#132210",
                        "surface-dark": "#1a2c17", // Slightly lighter for cards/surfaces
                        "neutral-dark": "#2b3928",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-display antialiased overflow-hidden">
<div class="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto shadow-2xl overflow-y-auto">
<!-- Header -->
<header class="flex items-center p-4 pt-6 pb-2 justify-between z-10">
<h2 class="text-black dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] flex-1">Sage</h2>
<div class="flex items-center justify-end">
<button class="flex items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-transparent dark:text-white text-black hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined text-[24px]">account_circle</span>
</button>
</div>
</header>
<!-- Offline Banner -->
<!-- Floating, pill-shaped banner as requested in plan -->
<div class="px-4 py-2 sticky top-0 z-50">
<div class="flex items-center justify-between gap-3 bg-[#1e2a1b] dark:bg-[#1f2e1c] border border-white/5 shadow-lg rounded-full px-4 py-3 w-full">
<div class="flex items-center gap-3 overflow-hidden">
<div class="flex items-center justify-center rounded-full bg-primary/10 shrink-0 size-8 text-primary">
<span class="material-symbols-outlined text-[20px]">cloud_off</span>
</div>
<div class="flex flex-col justify-center min-w-0">
<p class="text-white text-sm font-medium leading-tight truncate">You're currently offline</p>
<p class="text-white/60 text-xs font-normal leading-tight truncate">Reflections are saved locally</p>
</div>
</div>
<button class="shrink-0 flex items-center justify-center rounded-full h-8 px-4 bg-primary text-[#121811] text-xs font-bold uppercase tracking-wider hover:bg-[#32d611] transition-colors">
                    Retry
                </button>
</div>
</div>
<!-- Main Content Area (Slightly Dimmed/Context) -->
<main class="flex-1 flex flex-col px-4 pt-2 pb-24 relative">
<!-- Headline -->
<div class="pb-6 pt-4">
<h1 class="text-black dark:text-white tracking-tight text-[32px] font-bold leading-tight">Evening Reflection</h1>
<p class="text-gray-500 dark:text-gray-400 text-sm mt-1">October 24, 2023</p>
</div>
<!-- Main Card -->
<div class="mb-6">
<div class="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl group cursor-pointer transition-transform hover:scale-[0.99]">
<!-- Image Background -->
<div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Abstract dark fluid gradient background with subtle green hues" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA5eg17rlgoSV7UgrN0Sf2xBNBoYQAeLXnzXnsuu8BvJ6Qtr0IqoyjgVPSTqG_twcMnFuZrXbgrBeVvoCpt-KE7MD-M1I8jSXKvgnsNO4RjjZeznKFTRGRWR5V8OC13Zzi15KaAbIYtY1qTZhauYzLByL120PwyadiDEUpv9qldeO57nYSH-v1XX733UeeEneENuuRS93tjNeEtKgMPbqD-09wlMKs8ivyQmbKhqbFz9Nom4CQF3sXXytPx1kMMIJoZQknuz93lW4v8");'>
</div>
<!-- Gradient Overlay -->
<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
<!-- Content -->
<div class="absolute inset-0 flex flex-col justify-end p-6">
<div class="mb-4">
<span class="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-white mb-3">
                                Daily Journal
                            </span>
<h3 class="text-white text-3xl font-bold leading-tight mb-2">How did you feel today?</h3>
<p class="text-white/80 text-base font-medium line-clamp-2">Take a moment to process your emotions and reset for tomorrow.</p>
</div>
<!-- Progress Indicator -->
<div class="w-full bg-white/20 h-1 rounded-full overflow-hidden mt-2">
<div class="w-0 h-full bg-primary transition-all duration-1000 group-hover:w-1/4"></div>
</div>
</div>
</div>
</div>
<!-- Recent List -->
<div class="flex flex-col gap-4">
<div class="flex items-center justify-between">
<h3 class="text-black dark:text-white text-lg font-bold">Recent entries</h3>
<button class="text-primary text-sm font-medium">View all</button>
</div>
<!-- List Item 1 -->
<div class="group flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#1a2c17] hover:bg-gray-50 dark:hover:bg-[#23381f] transition-colors border border-transparent dark:border-white/5">
<div class="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-12">
<span class="material-symbols-outlined">wb_sunny</span>
</div>
<div class="flex flex-col flex-1">
<p class="text-black dark:text-white text-base font-semibold">Morning Clarity</p>
<p class="text-gray-500 dark:text-gray-400 text-sm">Today • 8:30 AM</p>
</div>
<span class="material-symbols-outlined text-gray-400 dark:text-gray-500">chevron_right</span>
</div>
<!-- List Item 2 -->
<div class="group flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#1a2c17] hover:bg-gray-50 dark:hover:bg-[#23381f] transition-colors border border-transparent dark:border-white/5">
<div class="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-12">
<span class="material-symbols-outlined">nightlight</span>
</div>
<div class="flex flex-col flex-1">
<p class="text-black dark:text-white text-base font-semibold">Sleep Prep</p>
<p class="text-gray-500 dark:text-gray-400 text-sm">Yesterday • 10:15 PM</p>
</div>
<span class="material-symbols-outlined text-gray-400 dark:text-gray-500">chevron_right</span>
</div>
</div>
</main>
<!-- FAB (Floating Action Button) -->
<div class="fixed bottom-6 right-6 z-40">
<button class="flex items-center justify-center rounded-full h-16 w-16 bg-primary text-[#121811] shadow-[0_8px_16px_rgba(55,236,19,0.3)] hover:scale-105 active:scale-95 transition-all">
<span class="material-symbols-outlined text-[32px]">add</span>
</button>
</div>
</div>
</body></html>

<!-- Sage App Theme Detail (Dark Mode) - Fear -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage - Fear Theme Detail</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#5bec13",
                        "background-light": "#f6f8f6",
                        "background-dark": "#131811",
                        "surface-dark": "#1a2118",
                        "surface-light": "#ffffff",
                    },
                    fontFamily: {
                        "display": ["Manrope", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "2xl": "2rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        /* Custom scrollbar hiding */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white overflow-x-hidden antialiased selection:bg-primary selection:text-background-dark">
<div class="relative mx-auto flex h-full min-h-screen w-full max-w-md flex-col overflow-hidden bg-background-light dark:bg-background-dark shadow-2xl">
<!-- Sticky Header -->
<header class="sticky top-0 z-50 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 px-4 py-4 backdrop-blur-md">
<button class="flex size-10 items-center justify-center rounded-full text-gray-900 dark:text-white transition-colors hover:bg-black/5 dark:hover:bg-white/10">
<span class="material-symbols-outlined text-2xl">arrow_back</span>
</button>
<div class="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">Sage</div>
<button class="flex size-10 items-center justify-center rounded-full text-gray-900 dark:text-white transition-colors hover:bg-black/5 dark:hover:bg-white/10">
<span class="material-symbols-outlined text-2xl">more_horiz</span>
</button>
</header>
<!-- Main Scrollable Content -->
<main class="flex flex-col gap-8 pb-24 pt-4">
<!-- Hero Section -->
<section class="flex flex-col px-6">
<div class="mb-2 flex items-center gap-2">
<span class="inline-flex size-2 rounded-full bg-primary animate-pulse"></span>
<span class="text-xs font-bold uppercase tracking-widest text-primary">Current Focus</span>
</div>
<h1 class="font-display text-6xl font-bold tracking-tighter text-gray-900 dark:text-white">Fear</h1>
<p class="mt-4 text-lg font-light leading-relaxed text-gray-600 dark:text-gray-300">
                    A signal, not a stop sign. Understanding the mechanism of protection to move forward with clarity.
                </p>
</section>
<!-- CTA Section -->
<section class="px-4">
<button class="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-primary px-6 py-4 transition-transform active:scale-[0.98]">
<span class="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"></span>
<span class="relative flex items-center gap-2 text-lg font-bold tracking-tight text-background-dark">
<span class="material-symbols-outlined">play_circle</span>
                        Start a session
                    </span>
</button>
</section>
<!-- Progress Module -->
<section class="px-4">
<div class="rounded-2xl bg-white dark:bg-surface-dark p-5 shadow-sm border border-gray-100 dark:border-white/5">
<div class="mb-3 flex items-center justify-between">
<h3 class="text-base font-semibold text-gray-900 dark:text-white">Fear Path</h3>
<span class="rounded-full bg-primary/10 px-2 py-1 text-xs font-bold text-primary">Day 3 of 7</span>
</div>
<div class="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
<div class="absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-500 ease-out" style="width: 42%;"></div>
</div>
<p class="mt-3 text-sm text-gray-500 dark:text-gray-400">Next: Unpacking the root cause</p>
</div>
</section>
<!-- Guided Exercises -->
<section class="flex flex-col gap-4 pl-6">
<div class="flex items-center justify-between pr-6">
<h2 class="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Guided Exercises</h2>
<a class="text-xs font-medium text-primary hover:underline" href="#">View all</a>
</div>
<div class="no-scrollbar flex gap-4 overflow-x-auto pb-4 pr-6">
<!-- Exercise Card 1 -->
<div class="flex min-w-[160px] cursor-pointer flex-col justify-between rounded-2xl bg-white dark:bg-surface-dark p-4 shadow-sm transition-all hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-100 dark:border-white/5 aspect-[4/5]">
<div class="flex size-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300">
<span class="material-symbols-outlined">air</span>
</div>
<div>
<h3 class="mb-1 text-lg font-bold text-gray-900 dark:text-white">Breath</h3>
<p class="text-xs text-gray-500 dark:text-gray-400">Calm the nervous system</p>
</div>
<div class="flex items-center justify-between pt-2">
<span class="text-xs font-medium text-gray-400">5 min</span>
<span class="material-symbols-outlined text-gray-300 dark:text-gray-600">arrow_forward</span>
</div>
</div>
<!-- Exercise Card 2 -->
<div class="flex min-w-[160px] cursor-pointer flex-col justify-between rounded-2xl bg-white dark:bg-surface-dark p-4 shadow-sm transition-all hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-100 dark:border-white/5 aspect-[4/5]">
<div class="flex size-10 items-center justify-center rounded-full bg-purple-50 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300">
<span class="material-symbols-outlined">psychology_alt</span>
</div>
<div>
<h3 class="mb-1 text-lg font-bold text-gray-900 dark:text-white">Inquiry</h3>
<p class="text-xs text-gray-500 dark:text-gray-400">What are you protecting?</p>
</div>
<div class="flex items-center justify-between pt-2">
<span class="text-xs font-medium text-gray-400">10 min</span>
<span class="material-symbols-outlined text-gray-300 dark:text-gray-600">arrow_forward</span>
</div>
</div>
<!-- Exercise Card 3 -->
<div class="flex min-w-[160px] cursor-pointer flex-col justify-between rounded-2xl bg-white dark:bg-surface-dark p-4 shadow-sm transition-all hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-100 dark:border-white/5 aspect-[4/5]">
<div class="flex size-10 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-500/20 text-orange-600 dark:text-orange-300">
<span class="material-symbols-outlined">footprint</span>
</div>
<div>
<h3 class="mb-1 text-lg font-bold text-gray-900 dark:text-white">Action</h3>
<p class="text-xs text-gray-500 dark:text-gray-400">One small step forward</p>
</div>
<div class="flex items-center justify-between pt-2">
<span class="text-xs font-medium text-gray-400">15 min</span>
<span class="material-symbols-outlined text-gray-300 dark:text-gray-600">arrow_forward</span>
</div>
</div>
</div>
</section>
<!-- Contrasts Section -->
<section class="px-6">
<h2 class="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Contrasts</h2>
<div class="grid grid-cols-2 gap-3">
<div class="group relative overflow-hidden rounded-2xl bg-white dark:bg-surface-dark p-5 shadow-sm border border-gray-100 dark:border-white/5 transition-colors hover:border-primary/50">
<div class="mb-4 flex size-8 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400">
<span class="material-symbols-outlined text-lg">block</span>
</div>
<h3 class="text-sm font-semibold text-gray-900 dark:text-white">Paralysis</h3>
<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Fear as an enemy causing stagnation.</p>
</div>
<div class="group relative overflow-hidden rounded-2xl bg-white dark:bg-surface-dark p-5 shadow-sm border border-gray-100 dark:border-white/5 transition-colors hover:border-primary/50">
<div class="mb-4 flex size-8 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-primary">
<span class="material-symbols-outlined text-lg">shield</span>
</div>
<h3 class="text-sm font-semibold text-gray-900 dark:text-white">Preparation</h3>
<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Fear as a guide for readiness.</p>
</div>
</div>
</section>
<!-- Common Questions (Accordion Style) -->
<section class="px-6">
<h2 class="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Common Questions</h2>
<div class="flex flex-col gap-3">
<details class="group rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
<summary class="flex cursor-pointer items-center justify-between p-4 font-medium text-gray-900 dark:text-white transition-colors group-hover:bg-gray-50 dark:group-hover:bg-white/5">
<span>Why do I feel this physically?</span>
<span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
</summary>
<div class="px-4 pb-4 pt-0 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                            Fear triggers the amygdala, releasing adrenaline and cortisol. This physical response is evolutionary, designed to prepare you for 'fight or flight', even when the threat is purely emotional.
                        </div>
</details>
<details class="group rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
<summary class="flex cursor-pointer items-center justify-between p-4 font-medium text-gray-900 dark:text-white transition-colors group-hover:bg-gray-50 dark:group-hover:bg-white/5">
<span>Is fear always bad?</span>
<span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
</summary>
<div class="px-4 pb-4 pt-0 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                            No. Fear is information. It highlights what matters to you and where you perceive risk. When understood, it transforms from a wall into a map.
                        </div>
</details>
<details class="group rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
<summary class="flex cursor-pointer items-center justify-between p-4 font-medium text-gray-900 dark:text-white transition-colors group-hover:bg-gray-50 dark:group-hover:bg-white/5">
<span>How do I stop being afraid?</span>
<span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
</summary>
<div class="px-4 pb-4 pt-0 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                            Courage isn't the absence of fear, but acting despite it. The goal isn't to eliminate fear, but to build a relationship with it where it doesn't control your actions.
                        </div>
</details>
</div>
</section>
</main>
<!-- Bottom Fade Gradient for Scroll -->
<div class="pointer-events-none fixed bottom-0 left-0 right-0 z-10 h-24 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent"></div>
</div>
</body></html>

<!-- Response Error State (Dark Mode) - Couldn't Generate -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage - Response Error</title>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Google Fonts: Inter -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Theme Configuration -->
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#37ec13",
                        "background-light": "#f6f8f6",
                        "background-dark": "#132210",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-display antialiased selection:bg-primary selection:text-background-dark">
<div class="relative flex min-h-screen w-full flex-col overflow-hidden">
<!-- TopAppBar -->
<header class="flex items-center p-4 justify-between sticky top-0 z-10">
<button aria-label="Go back" class="text-gray-900 dark:text-white flex size-12 shrink-0 items-center justify-center rounded-full active:bg-black/5 dark:active:bg-white/10 transition-colors">
<span class="material-symbols-outlined" style="font-size: 24px;">arrow_back</span>
</button>
</header>
<!-- Main Content Area: Centered vertically for Swiss layout -->
<main class="flex-1 flex flex-col items-center justify-center px-6 w-full max-w-md mx-auto relative z-0">
<!-- EmptyState / Illustration -->
<div class="flex flex-col items-center gap-8 w-full">
<!-- Circular Icon Container fitting the 'Sage' aesthetic -->
<div class="relative group">
<!-- Abstract glowing effect behind -->
<div class="absolute -inset-1 rounded-full bg-primary/20 blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-700"></div>
<div class="relative bg-background-light dark:bg-[#1a2c16] border border-gray-200 dark:border-white/10 aspect-square h-40 w-40 rounded-full flex items-center justify-center overflow-hidden shadow-2xl">
<!-- Abstract Image representing a pause/disconnect -->
<div class="w-full h-full bg-center bg-no-repeat bg-cover opacity-80 dark:opacity-90 mix-blend-overlay" data-alt="Abstract minimalistic geometric shapes floating in a dark void" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDXfn-wsIXjtiN0rCI6jHtl_1hkrWkBC8XjRfGSoelGpI_HFieYiiI6yB_w43ewea44NIeCXV_veWNOkVFMnrYuYD0S4vnfeFgCu-5czR1fg7Me_L26oTyB_7yBvNHGmF1obxi2qNM81YEBpbCBaLAA3xPSkkchxlfLNZEK35vqboDSkEAxFGtpmLRcwGSZJrKmaukDhO38Em2T-hTVXyTaQeurcdALYpf9-y1z2mfTG2-sCJi9sWGphbZmr4inczl-S7dMqx1-zqce");'>
</div>
<!-- Overlay Icon -->
<div class="absolute inset-0 flex items-center justify-center">
<span class="material-symbols-outlined text-gray-400 dark:text-primary/80" style="font-size: 48px;">link_off</span>
</div>
</div>
</div>
<div class="flex flex-col items-center gap-4 text-center">
<h1 class="text-gray-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                        Connection Pause
                    </h1>
<p class="text-gray-500 dark:text-gray-400 text-base md:text-lg font-normal leading-relaxed max-w-[320px]">
                        Couldn't quite connect. Would you like to try again?
                    </p>
</div>
</div>
</main>
<!-- Action Buttons -->
<div class="flex flex-col gap-3 px-6 pb-8 pt-4 w-full max-w-md mx-auto mt-auto">
<!-- SingleButton: Retry (Primary) -->
<button class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-6 bg-primary hover:bg-[#2ed60f] active:scale-[0.98] transition-all text-background-dark text-lg font-bold leading-normal tracking-wide shadow-[0_0_15px_rgba(55,236,19,0.3)]">
<span class="mr-2 material-symbols-outlined text-[20px] font-bold">refresh</span>
<span class="truncate">Retry</span>
</button>
<!-- SingleButton: Return (Secondary) -->
<button class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-4 bg-transparent active:bg-white/5 transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium leading-normal tracking-wide">
<span class="truncate">Return to Home</span>
</button>
</div>
<!-- Bottom Spacer/Safe Area -->
<div class="h-6 w-full"></div>
</div>
</body></html>

<!-- Narration and Voice Settings -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Narration Settings</title>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#5bec13",
                        "background-light": "#f6f8f6",
                        "background-dark": "#162210",
                        "surface-dark": "#1f271c",
                        "border-dark": "#2e3928",
                        "text-secondary": "#a6b99d",
                    },
                    fontFamily: {
                        "display": ["Manrope", "sans-serif"]
                    },
                    borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
                },
            },
        }
    </script>
<style>
        /* Custom slider styling for webkit */
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background: #5bec13;
            cursor: pointer;
            margin-top: -10px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        }
        input[type=range]::-webkit-slider-runnable-track {
            width: 100%;
            height: 4px;
            cursor: pointer;
            background: #2e3928;
            border-radius: 2px;
        }
        /* Firefox */
        input[type=range]::-moz-range-thumb {
            height: 24px;
            width: 24px;
            border: none;
            border-radius: 50%;
            background: #5bec13;
            cursor: pointer;
        }
        input[type=range]::-moz-range-track {
            width: 100%;
            height: 4px;
            cursor: pointer;
            background: #2e3928;
            border-radius: 2px;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-display antialiased">
<div class="relative flex h-full min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl">
<!-- Header -->
<div class="flex items-center bg-transparent p-4 pb-2 justify-between z-10">
<button class="text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined text-white" style="font-size: 24px;">arrow_back_ios_new</span>
</button>
<h2 class="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Narration Settings</h2>
<button class="flex w-12 items-center justify-end hover:opacity-80 transition-opacity">
<p class="text-primary text-base font-bold leading-normal tracking-[0.015em] shrink-0">Skip</p>
</button>
</div>
<!-- Main Content Scroll Area -->
<div class="flex-1 overflow-y-auto pb-32"> <!-- Added padding-bottom to avoid overlap with fixed footer -->
<!-- Hero Text -->
<div class="pt-6 pb-2">
<h1 class="text-white text-[28px] font-bold leading-tight tracking-[-0.015em] px-6 text-left pb-3">Customize your experience</h1>
<p class="text-text-secondary text-base font-normal leading-relaxed px-6">Adjust how Sage speaks to you during guided reflections.</p>
</div>
<div class="h-6"></div>
<!-- Settings Group -->
<div class="px-4 space-y-4">
<!-- Toggle Item -->
<div class="flex items-center gap-4 bg-surface-dark rounded-xl px-4 min-h-[72px] justify-between border border-border-dark">
<div class="flex flex-col">
<p class="text-white text-base font-bold leading-normal">Enable Narration</p>
<p class="text-text-secondary text-sm font-normal">Hear voice guidance during sessions</p>
</div>
<div class="shrink-0">
<label class="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-border-dark p-0.5 has-[:checked]:justify-end has-[:checked]:bg-primary transition-colors duration-200">
<div class="h-full w-[27px] rounded-full bg-white shadow-sm transform transition-transform duration-200"></div>
<input checked="" class="invisible absolute" type="checkbox"/>
</label>
</div>
</div>
<!-- Voice Selection -->
<div class="flex flex-col bg-surface-dark rounded-xl px-4 py-4 gap-2 border border-border-dark">
<label class="text-white text-base font-bold leading-normal">Voice</label>
<div class="relative w-full">
<select class="appearance-none w-full bg-background-dark text-white border border-border-dark rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-base">
<option value="sage-calm">Sage - Calm (Default)</option>
<option value="sage-energetic">Sage - Energetic</option>
<option value="sage-deep">Sage - Deep</option>
<option value="sage-soft">Sage - Soft Whisper</option>
</select>
<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary">
<span class="material-symbols-outlined">expand_more</span>
</div>
</div>
</div>
<!-- Speed Slider -->
<div class="flex flex-col bg-surface-dark rounded-xl px-4 py-5 gap-4 border border-border-dark">
<div class="flex justify-between items-end">
<label class="text-white text-base font-bold leading-normal">Speaking Speed</label>
<span class="text-primary text-sm font-bold bg-primary/10 px-2 py-0.5 rounded">1.0x</span>
</div>
<div class="pt-2 px-1">
<input class="w-full h-1 bg-border-dark rounded-lg appearance-none cursor-pointer" max="2.0" min="0.5" step="0.1" type="range" value="1.0"/>
<div class="flex justify-between mt-2 text-xs font-medium text-text-secondary">
<span>Slow</span>
<span>Normal</span>
<span>Fast</span>
</div>
</div>
</div>
</div>
<!-- Privacy Note -->
<div class="mt-8 px-8 flex flex-col items-center justify-center text-center gap-2 opacity-80">
<span class="material-symbols-outlined text-text-secondary" style="font-size: 20px;">lock</span>
<p class="text-text-secondary text-xs leading-normal max-w-[280px]">Your reflections stay on your device unless you choose to sync.</p>
</div>
<div class="h-8"></div>
</div>
<!-- Sticky Footer CTA -->
<div class="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-dark via-background-dark to-transparent max-w-md mx-auto">
<button class="w-full h-14 bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all text-background-dark text-lg font-bold rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(91,236,19,0.3)]">
                Finish Setup
            </button>
<div class="h-2"></div> <!-- Space for home indicator on iOS -->
</div>
</div>
</body></html>

<!-- Sage App Journal Screen (Dark Mode) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage - Journal</title>
<!-- Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Theme Configuration -->
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#37ec13",
                        "background-light": "#f6f8f6",
                        "background-dark": "#132210",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        /* Custom scrollbar for webkit */
        ::-webkit-scrollbar {
            width: 0px;
            background: transparent;
        }
        
        /* Swiss typography adjustments */
        .swiss-title {
            letter-spacing: -0.02em;
        }
        
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        
        .material-symbols-outlined.filled {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-display antialiased text-gray-900 dark:text-white">
<div class="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24">
<!-- Header -->
<header class="sticky top-0 z-40 flex items-center justify-between bg-background-dark/90 px-4 py-4 backdrop-blur-md">
<div class="flex size-10 shrink-0 items-center justify-center rounded-full text-white">
<!-- Menu / Profile Icon -->
<span class="material-symbols-outlined">menu</span>
</div>
<h1 class="swiss-title flex-1 text-center text-lg font-bold leading-tight text-white">Journal</h1>
<div class="flex size-10 shrink-0 items-center justify-center">
<button class="flex items-center justify-center text-white transition-opacity hover:opacity-80">
<span class="material-symbols-outlined">calendar_today</span>
</button>
</div>
</header>
<!-- Main Content -->
<main class="flex flex-col gap-6 px-4 pt-2">
<!-- Daily Prompt Card -->
<section class="w-full">
<div class="relative flex aspect-[4/3] w-full flex-col items-start justify-end overflow-hidden rounded-xl bg-gray-800 shadow-lg md:aspect-[21/9]">
<!-- Background Image -->
<div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105" data-alt="Abstract dark green misty forest landscape with gentle light beams" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgqna1LHfzsin4uYGhzpWdWOPGen6e9d1lTVJiatVGDsvv4DoeQw2UH2v5XVpMVH3qliBURKfN9YFUIkR2TsvBW26CcKOQAijMhA4RrEG8D6Y_6sVQZJMmzf7yHIhpj2pQysi9P4oeKDu27aZYEVla7I9BctGplAnQ4zj-Rcwzb2AvNMt7Efd_IscqUl9gMHgkUngnvxeiCF-kKlcDsAB1Q-KoQe3xTA2hkApvCudZMdnEofJ3BTSKd8yRoC5CDDl15f7BWTJd_Myz');">
</div>
<!-- Gradient Overlay -->
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
<!-- Content -->
<div class="relative z-10 flex w-full flex-col gap-2 p-6">
<div class="mb-1 flex items-center gap-2">
<span class="flex size-6 items-center justify-center rounded-full bg-primary/20 text-primary">
<span class="material-symbols-outlined text-[16px]">wb_sunny</span>
</span>
<p class="text-sm font-medium uppercase tracking-wider text-primary">Daily Reflection</p>
</div>
<h2 class="swiss-title max-w-[80%] text-2xl font-bold leading-tight text-white">What brought you peace today?</h2>
<button class="mt-2 flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20">
<span>Start Writing</span>
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
</div>
</section>
<!-- Entries Section -->
<section class="flex flex-col gap-2">
<!-- Section Header -->
<div class="flex items-end justify-between px-1 pb-2 pt-4">
<h3 class="swiss-title text-xl font-bold text-white">Recent Entries</h3>
<button class="text-sm font-medium text-white/60 hover:text-primary">View all</button>
</div>
<!-- Today's Entry -->
<article class="group relative flex cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-lg border border-white/5 bg-[#1a2e17] p-4 transition-all hover:bg-[#20361d]">
<div class="flex items-start gap-4">
<div class="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#2b3928] text-primary">
<span class="material-symbols-outlined filled">circle</span>
</div>
<div class="flex flex-1 flex-col justify-center gap-0.5">
<p class="text-base font-semibold leading-normal text-white">Finding clarity in chaos</p>
<p class="line-clamp-1 text-sm font-normal text-[#a1b99d]">The morning started with a rush of adrenaline but...</p>
<div class="mt-1 flex items-center gap-2 text-xs font-medium text-[#a1b99d]/80">
<span>Today</span>
<span class="size-0.5 rounded-full bg-current"></span>
<span>8:42 PM</span>
</div>
</div>
</div>
<div class="shrink-0 text-white/40 transition-colors group-hover:text-white">
<span class="material-symbols-outlined">chevron_right</span>
</div>
</article>
<!-- Yesterday's Entry -->
<article class="group relative flex cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-lg border border-white/5 bg-[#1a2e17] p-4 transition-all hover:bg-[#20361d]">
<div class="flex items-start gap-4">
<div class="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#2b3928] text-[#a1b99d]">
<span class="material-symbols-outlined">spa</span>
</div>
<div class="flex flex-1 flex-col justify-center gap-0.5">
<p class="text-base font-semibold leading-normal text-white">Gratitude for small moments</p>
<p class="line-clamp-1 text-sm font-normal text-[#a1b99d]">I noticed the way the light hit the trees...</p>
<div class="mt-1 flex items-center gap-2 text-xs font-medium text-[#a1b99d]/80">
<span>Yesterday</span>
<span class="size-0.5 rounded-full bg-current"></span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">sentiment_satisfied</span> Calm</span>
</div>
</div>
</div>
<div class="shrink-0 text-white/40 transition-colors group-hover:text-white">
<span class="material-symbols-outlined">chevron_right</span>
</div>
</article>
<!-- Older Entry -->
<article class="group relative flex cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-lg border border-white/5 bg-[#1a2e17] p-4 transition-all hover:bg-[#20361d]">
<div class="flex items-start gap-4">
<div class="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#2b3928] text-[#a1b99d]">
<span class="material-symbols-outlined">cloud</span>
</div>
<div class="flex flex-1 flex-col justify-center gap-0.5">
<p class="text-base font-semibold leading-normal text-white">Anxiety about upcoming move</p>
<p class="line-clamp-1 text-sm font-normal text-[#a1b99d]">Packing boxes feels overwhelming today...</p>
<div class="mt-1 flex items-center gap-2 text-xs font-medium text-[#a1b99d]/80">
<span>Sept 12</span>
<span class="size-0.5 rounded-full bg-current"></span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">sentiment_dissatisfied</span> Anxious</span>
</div>
</div>
</div>
<div class="shrink-0 text-white/40 transition-colors group-hover:text-white">
<span class="material-symbols-outlined">chevron_right</span>
</div>
</article>
<!-- Older Entry 2 -->
<article class="group relative flex cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-lg border border-white/5 bg-[#1a2e17] p-4 transition-all hover:bg-[#20361d]">
<div class="flex items-start gap-4">
<div class="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#2b3928] text-[#a1b99d]">
<span class="material-symbols-outlined">water_drop</span>
</div>
<div class="flex flex-1 flex-col justify-center gap-0.5">
<p class="text-base font-semibold leading-normal text-white">Rainy day thoughts</p>
<p class="line-clamp-1 text-sm font-normal text-[#a1b99d]">The sound of rain against the window is...</p>
<div class="mt-1 flex items-center gap-2 text-xs font-medium text-[#a1b99d]/80">
<span>Sept 10</span>
<span class="size-0.5 rounded-full bg-current"></span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">sentiment_neutral</span> Reflective</span>
</div>
</div>
</div>
<div class="shrink-0 text-white/40 transition-colors group-hover:text-white">
<span class="material-symbols-outlined">chevron_right</span>
</div>
</article>
</section>
</main>
<!-- Floating Action Button -->
<div class="fixed bottom-24 right-4 z-30">
<button class="flex size-14 items-center justify-center rounded-full bg-primary shadow-[0_4px_20px_rgba(55,236,19,0.4)] transition-transform hover:scale-105 active:scale-95">
<span class="material-symbols-outlined text-black" style="font-size: 28px;">edit</span>
</button>
</div>
<!-- Bottom Navigation -->
<nav class="fixed bottom-0 left-0 z-40 w-full border-t border-white/5 bg-background-dark/95 pb-safe pt-2 backdrop-blur-lg">
<div class="flex items-center justify-around pb-4 pt-2">
<button class="flex flex-col items-center justify-center gap-1 text-primary">
<span class="material-symbols-outlined filled">book_2</span>
<span class="text-[10px] font-medium">Journal</span>
</button>
<button class="flex flex-col items-center justify-center gap-1 text-white/40 hover:text-white transition-colors">
<span class="material-symbols-outlined">explore</span>
<span class="text-[10px] font-medium">Guide</span>
</button>
<button class="flex flex-col items-center justify-center gap-1 text-white/40 hover:text-white transition-colors">
<span class="material-symbols-outlined">person</span>
<span class="text-[10px] font-medium">Profile</span>
</button>
</div>
</nav>
<!-- Safe Area Padding for Bottom Nav -->
<div class="h-safe w-full bg-background-dark"></div>
</div>
<script>
        // Simple JS to handle safe area if needed, though Tailwind pb-safe usually handled via plugins or manual padding
        // Adding manual padding for demonstration since plugin might not be fully active in this environment
        // In a real app, 'pb-safe' utility from tailwind-css-safe-area would be used.
    </script>
</body></html>

<!-- Sage Insight Detail (Dark Mode)  -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage Insight Detail</title>
<!-- Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&amp;display=swap" rel="stylesheet"/>
<!-- Material Icons -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Tailwind Configuration -->
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#5bec13",
                        "background-light": "#f6f8f6",
                        "background-dark": "#162210",
                        "surface-dark": "#1e2b18",
                        "surface-accent": "#2e3928",
                        "text-secondary": "#a6b99d",
                    },
                    fontFamily: {
                        "display": ["Manrope", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.5rem",
                        "lg": "1rem",
                        "xl": "1.5rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased selection:bg-primary selection:text-black">
<div class="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-10">
<!-- TopAppBar -->
<header class="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-transparent dark:border-white/5 transition-colors duration-300">
<button class="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined text-slate-900 dark:text-white text-2xl">arrow_back</span>
</button>
<h2 class="text-slate-900 dark:text-white text-base font-bold tracking-tight opacity-0 sm:opacity-100 transition-opacity">Insight Detail</h2>
<button class="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined text-slate-900 dark:text-white text-2xl">bookmark_border</span>
</button>
</header>
<!-- Main Content Area -->
<main class="flex-1 flex flex-col px-4 sm:px-6 max-w-lg mx-auto w-full">
<!-- Hero Title & Meta -->
<section class="pt-6 pb-6">
<h1 class="text-4xl sm:text-[40px] font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white mb-3">
                    Embracing the Void
                </h1>
<p class="text-slate-500 dark:text-text-secondary text-sm font-medium leading-normal flex items-center gap-2">
<span class="material-symbols-outlined text-base">schedule</span>
                    Oct 24 • 10:42 AM • 2 mins read
                </p>
</section>
<!-- Audio Player -->
<section class="mb-10">
<div class="flex flex-col gap-4 rounded-2xl bg-white dark:bg-surface-accent border border-slate-200 dark:border-white/5 px-5 py-5 shadow-sm">
<div class="flex items-center gap-4 overflow-hidden">
<div class="flex-1 min-w-0">
<p class="text-slate-900 dark:text-white text-base font-bold leading-tight truncate">Insight Narration</p>
<div class="flex items-center gap-2 mt-1">
<span class="material-symbols-outlined text-slate-500 dark:text-text-secondary text-sm">graphic_eq</span>
<p class="text-slate-500 dark:text-text-secondary text-xs font-semibold uppercase tracking-wider">Sage AI • Voice 2</p>
</div>
</div>
<button class="flex shrink-0 items-center justify-center rounded-full size-12 bg-primary text-black hover:scale-105 active:scale-95 transition-transform shadow-[0_0_15px_rgba(91,236,19,0.3)]">
<span class="material-symbols-outlined fill-1" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
</button>
</div>
<div class="pt-2">
<!-- Waveform / Progress Bar -->
<div aria-label="Audio waveform visualization" class="flex h-8 items-center justify-center gap-[3px] opacity-80">
<div class="w-1 h-3 rounded-full bg-slate-300 dark:bg-white/30"></div>
<div class="w-1 h-5 rounded-full bg-slate-400 dark:bg-white/50"></div>
<div class="w-1 h-8 rounded-full bg-primary animate-pulse"></div>
<div class="w-1 h-6 rounded-full bg-primary/80"></div>
<div class="w-1 h-4 rounded-full bg-primary/60"></div>
<div class="w-1 h-3 rounded-full bg-slate-300 dark:bg-white/30"></div>
<div class="w-1 h-5 rounded-full bg-slate-300 dark:bg-white/30"></div>
<div class="w-1 h-2 rounded-full bg-slate-300 dark:bg-white/30"></div>
<div class="w-1 h-6 rounded-full bg-slate-300 dark:bg-white/30"></div>
<div class="w-1 h-4 rounded-full bg-slate-300 dark:bg-white/30"></div>
<div class="w-1 h-3 rounded-full bg-slate-300 dark:bg-white/30"></div>
<div class="w-1 h-2 rounded-full bg-slate-300 dark:bg-white/30"></div>
<div class="flex-1 h-[2px] rounded-full bg-slate-200 dark:bg-white/10 ml-2 relative">
<div class="absolute left-0 top-0 h-full w-[35%] bg-primary rounded-full"></div>
<div class="absolute left-[35%] top-1/2 -translate-y-1/2 size-3 bg-white rounded-full shadow-md"></div>
</div>
</div>
<div class="flex items-center justify-between mt-2">
<p class="text-slate-500 dark:text-text-secondary text-xs font-mono font-medium tracking-wide">1:17</p>
<button class="text-slate-500 dark:text-text-secondary text-xs font-bold bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">1.0x</button>
<p class="text-slate-500 dark:text-text-secondary text-xs font-mono font-medium tracking-wide">2:23</p>
</div>
</div>
</div>
</section>
<hr class="border-slate-200 dark:border-white/10 mb-8"/>
<!-- Content Sections -->
<div class="space-y-10">
<!-- Guidance -->
<article class="group">
<h3 class="text-primary text-xs font-bold tracking-[0.2em] mb-3 uppercase flex items-center gap-2">
<span class="w-1 h-1 rounded-full bg-primary"></span>
                        Guidance
                    </h3>
<p class="text-slate-700 dark:text-slate-200 text-lg sm:text-xl font-medium leading-relaxed">
                        The obstacle is not in the path; the obstacle is the path itself. By leaning into discomfort, you dissolve the barrier between "you" and the "experience."
                    </p>
</article>
<!-- Reflection -->
<article class="group">
<h3 class="text-primary text-xs font-bold tracking-[0.2em] mb-3 uppercase flex items-center gap-2">
<span class="w-1 h-1 rounded-full bg-primary"></span>
                        Reflection
                    </h3>
<p class="text-slate-700 dark:text-slate-200 text-lg sm:text-xl font-medium leading-relaxed">
                        Where in your life are you seeking comfort instead of growth? What specific fear is holding you back right now?
                    </p>
</article>
<!-- Practice -->
<article class="group">
<h3 class="text-primary text-xs font-bold tracking-[0.2em] mb-3 uppercase flex items-center gap-2">
<span class="w-1 h-1 rounded-full bg-primary"></span>
                        Practice
                    </h3>
<p class="text-slate-700 dark:text-slate-200 text-lg sm:text-xl font-medium leading-relaxed">
                        Sit for 5 minutes today without distraction. When the urge to move arises, simply observe it without acting.
                    </p>
</article>
</div>
<hr class="border-slate-200 dark:border-white/10 my-10"/>
<!-- Journaling Section -->
<section class="flex flex-col gap-4">
<div class="flex items-center gap-2 mb-1">
<span class="material-symbols-outlined text-primary text-xl">edit_note</span>
<h3 class="text-slate-900 dark:text-white text-lg font-bold">Journal your thoughts</h3>
</div>
<div class="relative group">
<label class="sr-only" for="journal-entry">Journal Entry</label>
<textarea class="w-full bg-slate-100 dark:bg-surface-accent text-slate-900 dark:text-white rounded-xl p-4 text-base placeholder:text-slate-400 dark:placeholder:text-text-secondary/50 border-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark resize-none transition-all duration-200 ease-in-out" id="journal-entry" placeholder="What resonates? What feels difficult?" rows="4"></textarea>
</div>
<button class="w-full h-12 bg-primary text-background-dark rounded-xl text-base font-bold flex items-center justify-center gap-2 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98]">
                    Save Note
                </button>
</section>
<!-- Tags & Footer Actions -->
<section class="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
<!-- Chips -->
<div class="flex flex-wrap gap-2">
<span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white hover:bg-slate-300 dark:hover:bg-white/20 cursor-pointer transition-colors">
                        #Discipline
                    </span>
<span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white hover:bg-slate-300 dark:hover:bg-white/20 cursor-pointer transition-colors">
                        #Stoicism
                    </span>
<span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white hover:bg-slate-300 dark:hover:bg-white/20 cursor-pointer transition-colors">
                        #Growth
                    </span>
</div>
<!-- Share -->
<button class="flex items-center gap-2 text-slate-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-bold uppercase tracking-wider ml-auto sm:ml-0">
<span class="material-symbols-outlined text-lg">ios_share</span>
                    Share Insight
                </button>
</section>
<!-- Bottom Spacer for Safe Area -->
<div class="h-8"></div>
</main>
</div>
</body></html>

<!-- Home Empty State (Dark Mode) - Recent Insights -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage - Recent Insights Empty State</title>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#37ec13",
                        "background-light": "#f6f8f6",
                        "background-dark": "#132210",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white">
<div class="relative flex h-full min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto border-x border-neutral-800 shadow-2xl">
<!-- Header -->
<header class="flex items-center justify-between px-6 py-5 z-10">
<h1 class="text-white text-2xl font-bold tracking-tight">Sage</h1>
<button class="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined" style="font-size: 24px;">account_circle</span>
</button>
</header>
<!-- Main Content: Empty State -->
<main class="flex-1 flex flex-col items-center justify-center px-6 relative z-10 pb-20">
<!-- Decorative Swiss-style background element -->
<div class="absolute top-1/4 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
<div class="absolute bottom-1/4 -left-20 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
<!-- Empty State Illustration/Icon -->
<div class="relative mb-8">
<!-- Abstract geometric shape -->
<div class="w-32 h-32 rounded-full border border-primary/20 flex items-center justify-center bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-sm">
<span class="material-symbols-outlined text-primary" style="font-size: 48px;">spa</span>
</div>
<!-- Subtle pulsing ring -->
<div class="absolute inset-0 rounded-full border border-primary/10 animate-pulse scale-110"></div>
</div>
<!-- Text Content -->
<div class="flex flex-col items-center text-center gap-3 max-w-[300px]">
<h2 class="text-white text-2xl font-bold tracking-tight">No insights yet</h2>
<p class="text-neutral-400 text-base font-normal leading-relaxed">
                    Your insights will appear here when you start exploring. Let's begin!
                </p>
</div>
<!-- CTA Button -->
<div class="mt-10 w-full max-w-[280px]">
<button class="w-full h-14 bg-primary hover:bg-green-400 text-background-dark font-bold text-base rounded-full transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(55,236,19,0.2)]">
<span class="material-symbols-outlined" style="font-size: 20px;">explore</span>
                    Start Exploring
                </button>
</div>
</main>
<!-- Bottom Navigation -->
<nav class="fixed bottom-0 w-full max-w-md bg-background-dark/80 backdrop-blur-md border-t border-white/5 px-6 pb-6 pt-4 z-20">
<div class="flex justify-between items-center">
<a class="flex flex-col items-center gap-1 flex-1 group" href="#">
<div class="flex items-center justify-center w-12 h-8 rounded-full bg-primary/10 text-primary transition-colors">
<span class="material-symbols-outlined fill-current" style="font-variation-settings: 'FILL' 1; font-size: 24px;">home</span>
</div>
<span class="text-[10px] font-medium text-primary tracking-wide">Home</span>
</a>
<a class="flex flex-col items-center gap-1 flex-1 group" href="#">
<div class="flex items-center justify-center w-12 h-8 rounded-full text-neutral-500 group-hover:text-neutral-300 transition-colors">
<span class="material-symbols-outlined" style="font-size: 24px;">book_2</span>
</div>
<span class="text-[10px] font-medium text-neutral-500 group-hover:text-neutral-300 tracking-wide">Journal</span>
</a>
<a class="flex flex-col items-center gap-1 flex-1 group" href="#">
<div class="flex items-center justify-center w-12 h-8 rounded-full text-neutral-500 group-hover:text-neutral-300 transition-colors">
<span class="material-symbols-outlined" style="font-size: 24px;">person</span>
</div>
<span class="text-[10px] font-medium text-neutral-500 group-hover:text-neutral-300 tracking-wide">Profile</span>
</a>
</div>
</nav>
</div>
</body></html>

<!-- Welcome to Sage -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Welcome to Sage</title>
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Theme Configuration -->
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#5bec13",
                        "background-light": "#f6f8f6",
                        "background-dark": "#162210",
                        "surface-dark": "#1f2e18",
                        "text-primary-dark": "#e8ebe6",
                        "text-secondary-dark": "#9aa596",
                    },
                    fontFamily: {
                        "display": ["Manrope", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "2xl": "1rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        /* Custom subtle fade-in animation */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-display h-screen w-full overflow-hidden flex flex-col items-center justify-between text-gray-900 dark:text-text-primary-dark antialiased transition-colors duration-300">
<!-- Top Navigation / Skip -->
<header class="w-full px-6 pt-12 pb-4 flex justify-end z-10">
<button class="text-sm font-medium text-gray-500 dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary transition-colors">
            Skip
        </button>
</header>
<!-- Main Content Area -->
<main class="flex-1 flex flex-col items-center justify-center px-8 w-full max-w-md relative z-10">
<!-- Background Gradient Glow -->
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 dark:bg-primary/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
<!-- Logo/Icon Area -->
<div class="mb-10 animate-fade-in">
<div class="w-20 h-20 bg-gradient-to-br from-primary to-green-600 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center rotate-3 transform hover:rotate-6 transition-transform duration-500">
<span class="material-icons-round text-background-dark text-4xl">spa</span>
</div>
</div>
<!-- Text Content -->
<div class="text-center space-y-4 animate-fade-in delay-100">
<h1 class="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">
                A quiet place <br/> to <span class="text-primary">reflect.</span>
</h1>
<p class="text-lg text-gray-600 dark:text-text-secondary-dark font-medium leading-relaxed max-w-xs mx-auto">
                Capture your thoughts, track your growth, and find clarity in a private digital sanctuary.
            </p>
</div>
</main>
<!-- Bottom Action Area -->
<footer class="w-full px-6 pb-10 pt-4 max-w-md space-y-6 z-10 animate-fade-in delay-200">
<!-- Buttons Stack -->
<div class="space-y-3">
<button class="w-full bg-primary hover:bg-[#4dd010] active:scale-[0.98] text-background-dark font-bold text-lg py-4 px-6 rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 flex items-center justify-center group">
                Begin
                <span class="material-icons-round ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
<button class="w-full bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 active:scale-[0.98] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-semibold text-lg py-4 px-6 rounded-xl transition-all duration-200">
                Learn more
            </button>
</div>
<!-- Privacy Note -->
<div class="flex items-start justify-center gap-2 px-4 animate-fade-in delay-300">
<span class="material-icons-round text-gray-400 dark:text-green-800/60 text-base mt-0.5">lock</span>
<p class="text-xs text-center text-gray-400 dark:text-text-secondary-dark/60 font-medium leading-snug">
                Your reflections stay on your device unless you choose to sync.
            </p>
</div>
</footer>
<!-- Abstract Background Pattern (Subtle grid) -->
<div class="fixed inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" data-alt="Subtle dot grid pattern background" style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 32px 32px;">
</div>
</body></html>

<!-- Journal Empty State (Dark Mode) - No Entries -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage - Journal Empty State</title>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#37ec13",
                        "background-light": "#f6f8f6",
                        "background-dark": "#132210", // Deep dark green/charcoal
                        "surface-dark": "#1c2e18", // Slightly lighter for nav/cards
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        /* Custom scrollbar hiding for clean UI */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-display antialiased transition-colors duration-200">
<div class="relative flex h-screen w-full max-w-md mx-auto flex-col overflow-hidden shadow-2xl">
<!-- Status Bar Area (Visual Placeholder) -->
<div class="h-10 w-full bg-transparent shrink-0"></div>
<!-- TopAppBar -->
<header class="flex items-center justify-between px-6 py-4 z-10 shrink-0">
<!-- Left: Settings/Menu -->
<button class="flex items-center justify-center size-10 rounded-full text-white hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined !text-[28px]">menu</span>
</button>
<!-- Center: Title -->
<h1 class="text-white text-xl font-extrabold tracking-tight">Journal</h1>
<!-- Right: Calendar -->
<button class="flex items-center justify-center size-10 rounded-full text-white hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined !text-[24px]">calendar_today</span>
</button>
</header>
<!-- Main Content: Empty State -->
<main class="flex-1 flex flex-col items-center justify-center px-8 pb-20 relative">
<!-- Illustration / Visual Centerpiece -->
<div class="relative mb-10 group cursor-default">
<!-- Abstract glow behind -->
<div class="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 opacity-40 animate-pulse"></div>
<!-- Icon container -->
<div class="relative size-32 rounded-full border-[3px] border-white/10 flex items-center justify-center bg-background-dark/50 backdrop-blur-sm z-10">
<div class="bg-center bg-no-repeat bg-cover w-16 h-16 opacity-80" data-alt="Abstract minimal white line art representing an open book or reflection" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBYjpAx_-RfooUg10w6hMU0lvDMgamqht5M9paxiUkTp2V__X46x9odePZYCfmhwy8rH2OjtBYskVCPu1GVxHr0FKSJVmk9ovC2e0mp3_pMXakY2KfIPkQyU31zlxMF1oCOR51G0ZFLpW91AWfmR1OD4gXj-OWVA2w3-PvSXTMkHpLlvyFEmF-vonSBOpK2LbDhFbBPXbgLpPl8pnjDFiSsU86REXKRSL4Ggh0ucC41xzbAOS1n3DTqyVnrwPvp0O0WdTddrOF3R8IO'); mask-image: url('https://placehold.co/100x100/000000/000000'); -webkit-mask-image: url('https://placehold.co/100x100/000000/000000');">
<!-- Using Material Icon as the 'image' for better control in this snippet -->
<span class="material-symbols-outlined text-white/80 !text-[64px] font-thin">auto_stories</span>
</div>
</div>
</div>
<!-- Text Content -->
<div class="flex flex-col items-center gap-3 text-center max-w-[280px]">
<h2 class="text-white text-2xl font-bold tracking-tight leading-tight">Your space to reflect</h2>
<p class="text-white/60 text-base font-normal leading-relaxed">
                    Your thoughts are safe here. <br/>Tap the '+' to begin your first entry.
                </p>
</div>
</main>
<!-- Floating Action Button (FAB) -->
<!-- Positioned absolutely above the bottom nav for the "floating" effect -->
<div class="absolute bottom-24 right-6 z-20">
<button class="flex items-center justify-center size-16 rounded-full bg-primary text-background-dark shadow-[0_4px_24px_rgba(55,236,19,0.4)] hover:scale-105 active:scale-95 transition-all duration-300">
<span class="material-symbols-outlined !text-[32px] font-medium">add</span>
</button>
</div>
<!-- Bottom Navigation -->
<nav class="shrink-0 h-20 bg-background-dark border-t border-white/5 px-6 flex items-start pt-4 justify-between z-10">
<button class="flex flex-col items-center gap-1 w-16 group">
<span class="material-symbols-outlined text-white/40 group-hover:text-white transition-colors !text-[28px]">home</span>
<span class="text-[10px] font-medium text-white/40 group-hover:text-white transition-colors">Home</span>
</button>
<button class="flex flex-col items-center gap-1 w-16 group">
<div class="relative">
<span class="material-symbols-outlined text-primary !text-[28px] drop-shadow-[0_0_8px_rgba(55,236,19,0.5)]">book_2</span>
<!-- Active indicator dot -->
<span class="absolute -bottom-2 left-1/2 -translate-x-1/2 size-1 bg-primary rounded-full"></span>
</div>
<span class="text-[10px] font-bold text-primary mt-1">Journal</span>
</button>
<button class="flex flex-col items-center gap-1 w-16 group">
<span class="material-symbols-outlined text-white/40 group-hover:text-white transition-colors !text-[28px]">insights</span>
<span class="text-[10px] font-medium text-white/40 group-hover:text-white transition-colors">Insights</span>
</button>
<button class="flex flex-col items-center gap-1 w-16 group">
<span class="material-symbols-outlined text-white/40 group-hover:text-white transition-colors !text-[28px]">person</span>
<span class="text-[10px] font-medium text-white/40 group-hover:text-white transition-colors">Profile</span>
</button>
</nav>
<!-- Bottom safe area spacing -->
<div class="h-4 w-full bg-background-dark shrink-0"></div>
</div>
</body></html>

<!-- Sage App Explore Screen (Dark Mode) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage Explore Screen</title>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind Config -->
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#37ec13",
                        "background-light": "#f6f8f6",
                        "background-dark": "#132210", // Using the provided config color
                        "surface-dark": "#1d271c", // Slightly lighter surface for cards
                        "surface-darker": "#0f140e", // Darker background
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "2xl": "2rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        body {
            font-family: 'Inter', sans-serif;
            -webkit-font-smoothing: antialiased;
        }
        /* Custom scrollbar hide for horizontal scroll */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark text-gray-900 dark:text-white transition-colors duration-200">
<div class="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto shadow-2xl">
<!-- Header -->
<header class="flex items-center px-6 py-5 justify-between sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-3xl">spa</span>
<h1 class="text-2xl font-bold tracking-tight dark:text-white">Sage</h1>
</div>
<div class="flex items-center justify-end">
<div class="size-10 rounded-full bg-surface-dark border border-white/10 overflow-hidden relative">
<img class="w-full h-full object-cover opacity-80" data-alt="User profile avatar silhouette" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK8LMhZ-oHUCY7DBIHSmDA8X9Kqc1lJtW3-SA54_lnUDHPQcSpwRpDm1DGBsAoLBAKv7RwRNuTpyspHEU_jIu5EALnQijMa2-Of-VPYIL8X08h_t0tdudXvABPFJaQGPfWcLJn9_igSMFztk5YqWi7QxMSZbPIHN9VcAXj2OvssaJfZwtEIcm_j4vF5n8vHkajL3KvUUzWhq_MoMykZVFyl0IqnJZy7xaEIPxWCh4w5RrfbCYjTb9Vpk-A3oMQih2ztaBJMSHQHh1B"/>
</div>
</div>
</header>
<main class="flex-1 flex flex-col px-4 pb-24 space-y-8">
<!-- Hero Card: Daily Wisdom -->
<section class="@container">
<div class="flex flex-col items-stretch justify-start rounded-2xl shadow-lg bg-white dark:bg-surface-dark overflow-hidden border border-gray-100 dark:border-white/5 transition-transform active:scale-[0.99]">
<div class="relative w-full h-48 bg-center bg-no-repeat bg-cover" data-alt="Abstract calming gradient with soft light" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbkPx0Aqr0cZjlEIGvxZNkz3Iw9ET-k_UzqkeQy8hvSsjpNNOQv51utwl9iacuzgu_RGx38W5J86de-7wwxLfunZYePHccxuIZKClBEstZ1H5LooGrjm7H3qDCKXXvJH-zJOkqGLwEP4Ltq0zKnf2jvHN-fLEXovQuv4ZAdVKTf2eZpB9_hAuwLBgd4HdJ-utITds5RrpoXZ0-6WLK4FL7RhZMaDAu3G8lY1urSdJEpNqyYWKXarE87r7gGvGZXGG0rlB-VzdR3alI");'>
<div class="absolute inset-0 bg-gradient-to-t from-surface-dark via-transparent to-transparent opacity-90"></div>
<div class="absolute top-4 left-4 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
<span class="text-xs font-medium text-white tracking-wider uppercase">Daily Wisdom</span>
</div>
</div>
<div class="flex w-full grow flex-col items-start justify-center gap-4 p-5 -mt-12 relative z-10">
<blockquote class="text-white text-xl md:text-2xl font-semibold leading-tight tracking-tight">
                            "The unexamined life is not worth living."
                        </blockquote>
<div class="w-full flex items-end justify-between gap-4 mt-2">
<div class="flex flex-col gap-1">
<p class="text-gray-400 text-sm font-medium uppercase tracking-wider">— Socrates</p>
</div>
<button class="flex items-center justify-center gap-2 rounded-full h-10 px-5 bg-primary hover:bg-primary/90 text-background-dark text-sm font-bold transition-colors">
<span>Reflect</span>
<span class="material-symbols-outlined text-lg">arrow_forward</span>
</button>
</div>
</div>
</div>
</section>
<!-- Topics Grid -->
<section>
<div class="flex items-center justify-between mb-4 px-1">
<h2 class="text-xl font-bold tracking-tight dark:text-white">Explore Topics</h2>
<a class="text-sm font-medium text-primary hover:text-primary/80" href="#">View all</a>
</div>
<div class="grid grid-cols-2 gap-3">
<!-- Card 1 -->
<div class="group relative flex flex-col justify-end h-40 p-4 rounded-2xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 overflow-hidden transition-all hover:border-primary/50">
<div class="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center transition-transform group-hover:scale-105 duration-700" data-alt="Abstract soft blue geometric shapes" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuB97IZLO-mXJD4sPgtRaOKGQRClzc5Yxlk8T3xX1gxHD7nSQbZcN81omYeQMs4bFKtXvkkTdSNKCUgy16i2eIL13uwDXT3HMeyyqdEJbhyd51gRTbpI14IihfEr2VlE2FFmlA9tsPsYPORX51vqnsKK4bUYe3nM9IN6I7WPCXdZW-hBHCNbp5GyJEZbZr7_vQU-dQu1hmOZs-q2d9m-fcG6l6uMObwvjB0Ewyev0UFMZKy7KE9nqz6djvG0WW85AKNWAu6gC7RXMR8k");'></div>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
<div class="relative z-10 flex flex-col gap-1">
<span class="material-symbols-outlined text-primary mb-1 text-2xl">balance</span>
<p class="text-white text-lg font-bold leading-tight">Emotional Balance</p>
<p class="text-gray-400 text-xs">8 sessions</p>
</div>
</div>
<!-- Card 2 -->
<div class="group relative flex flex-col justify-end h-40 p-4 rounded-2xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 overflow-hidden transition-all hover:border-primary/50">
<div class="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center transition-transform group-hover:scale-105 duration-700" data-alt="Abstract orange and dark geometric shapes" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCGW4C-hS6hlDiLaPprrK2sNdT7Da_rEeaSQG5KGenh8QspJrOBCJQY5G1JS_T531jY6PTARdpOImNyu-a9XbpJAtm1CCEmzQkVrIG0x0W_NXpR2AwHXwC5sjdUgGvAniu7bl9_t9Rc8uqcxIv2WdM-c_v_CcTgiNQ-SNbX26RzrWYeIkBuBBeKlJgX0gTKcV4Obj39rVNvL4QoU75jTYENq55htIRklNTVh_uOC0qxDWlq50WnBR-rtN82Er6fl9FCCfiJr00JR1Wu");'></div>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
<div class="relative z-10 flex flex-col gap-1">
<span class="material-symbols-outlined text-primary mb-1 text-2xl">flag</span>
<p class="text-white text-lg font-bold leading-tight">Goal Setting</p>
<p class="text-gray-400 text-xs">5 sessions</p>
</div>
</div>
<!-- Card 3 -->
<div class="group relative flex flex-col justify-end h-40 p-4 rounded-2xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 overflow-hidden transition-all hover:border-primary/50">
<div class="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center transition-transform group-hover:scale-105 duration-700" data-alt="Dark moody abstract texture" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsSOM6ACDkTUNKWCxPAj6dk9LUnFtsxy4y0xHsTnyELcIAv7B6cFtRyTSwDhu75Bl_WEmXWHlPdbIb8SNV-ozQFl3cOnO9CILRwTt7SjAEM5yD9uYcMdTjMjyUGGhqbVgPtZLewxrsfRcgotiyRXcT9eLrJod7snTgUkqUETkoxtsvNEGo0kKXf9ZrVyVuzC026HimpcmlFwyylknyxD5VQSKDSuMXhr5gEMIy0OhW20bdQolSirwNf6vWdPnJNfN1OHSOd10K6nmR");'></div>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
<div class="relative z-10 flex flex-col gap-1">
<span class="material-symbols-outlined text-primary mb-1 text-2xl">visibility</span>
<p class="text-white text-lg font-bold leading-tight">Shadow Work</p>
<p class="text-gray-400 text-xs">12 sessions</p>
</div>
</div>
<!-- Card 4 -->
<div class="group relative flex flex-col justify-end h-40 p-4 rounded-2xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 overflow-hidden transition-all hover:border-primary/50">
<div class="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center transition-transform group-hover:scale-105 duration-700" data-alt="Abstract connecting lines and nodes" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAF58ysdCv1Ed4qfD-x8xq8snS9yF3Y_PP0fqN06YdaDlpX9SwKy0ZZIjdX-WxtgNMMoHDcc3_Vs8H-QVPX3EUASz16p1HPhdDWaFiLAgV6x4W9n8XG2QpLRm8YLkj1wgXfCBePYRigO_HZjh-Sevqf7lus5vQtHPu0S0LZ-nPhiRohOdFb-8vYrDgdmQAbsVY6c1Dk6xEkIKGt30_r3MGKbU7ZkiM6ZyFyEA2U2G3waBHHyiKK0-M3cA9kX1GUKzH3nDSjBNY3dbpC");'></div>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
<div class="relative z-10 flex flex-col gap-1">
<span class="material-symbols-outlined text-primary mb-1 text-2xl">favorite</span>
<p class="text-white text-lg font-bold leading-tight">Relationships</p>
<p class="text-gray-400 text-xs">6 sessions</p>
</div>
</div>
</div>
</section>
<!-- Quick Grounding Section (Horizontal Scroll) -->
<section>
<div class="flex items-center justify-between mb-4 px-1">
<h2 class="text-xl font-bold tracking-tight dark:text-white">Quick Grounding</h2>
</div>
<div class="flex overflow-x-auto no-scrollbar gap-4 pb-4 -mx-4 px-4 snap-x">
<!-- Audio Card 1 -->
<div class="flex-shrink-0 w-64 snap-start p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
<div class="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined filled">play_arrow</span>
</div>
<div class="flex flex-col">
<h3 class="font-bold text-base dark:text-white">Morning Breath</h3>
<p class="text-xs text-gray-500 dark:text-gray-400">3 min • Focus</p>
</div>
</div>
<!-- Audio Card 2 -->
<div class="flex-shrink-0 w-64 snap-start p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
<div class="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined filled">play_arrow</span>
</div>
<div class="flex flex-col">
<h3 class="font-bold text-base dark:text-white">Body Scan</h3>
<p class="text-xs text-gray-500 dark:text-gray-400">5 min • Relaxation</p>
</div>
</div>
<!-- Audio Card 3 -->
<div class="flex-shrink-0 w-64 snap-start p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
<div class="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined filled">play_arrow</span>
</div>
<div class="flex flex-col">
<h3 class="font-bold text-base dark:text-white">Walking Mindfully</h3>
<p class="text-xs text-gray-500 dark:text-gray-400">10 min • Active</p>
</div>
</div>
</div>
</section>
</main>
<!-- Floating Action Button -->
<div class="fixed bottom-24 right-4 z-50">
<button class="flex items-center gap-2 bg-primary hover:bg-[#2ed60e] text-background-dark py-3 px-5 rounded-full shadow-[0_0_20px_rgba(55,236,19,0.4)] transition-all hover:scale-105 active:scale-95 group">
<span class="material-symbols-outlined text-2xl group-hover:animate-pulse">spark</span>
<span class="font-bold text-sm tracking-wide uppercase">Ask Sage</span>
</button>
</div>
<!-- Bottom Navigation -->
<nav class="fixed bottom-0 left-0 w-full bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-gray-200 dark:border-white/5 pb-6 pt-3 px-6 z-40 max-w-md mx-auto right-0">
<div class="flex justify-between items-center">
<a class="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined text-[24px]">home</span>
<span class="text-[10px] font-medium">Home</span>
</a>
<a class="flex flex-col items-center gap-1 text-primary" href="#">
<span class="material-symbols-outlined text-[24px] filled">explore</span>
<span class="text-[10px] font-medium">Explore</span>
</a>
<a class="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined text-[24px]">menu_book</span>
<span class="text-[10px] font-medium">Journal</span>
</a>
<a class="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined text-[24px]">person</span>
<span class="text-[10px] font-medium">Profile</span>
</a>
</div>
</nav>
</div>
</body></html>