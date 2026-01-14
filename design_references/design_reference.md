<!-- Sage App Home Screen (Light Mode) -->
<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage App Home Screen</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
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
                        "background-dark": "#132210",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: { "DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "full": "9999px" },
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
<body class="bg-background-light dark:bg-background-dark text-neutral-900 dark:text-white font-display antialiased transition-colors duration-300">
<div class="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24">
<!-- Header -->
<header class="sticky top-0 z-20 flex items-center justify-between p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
<div class="flex items-center gap-3">
<div class="relative group cursor-pointer">
<div class="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-white dark:ring-white/10 shadow-sm" data-alt="Profile picture of a user smiling" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBW0hlP_B4oIA3Bx9xEVgqap7pddw0NfzpQe33QLcJEMYTfaIejGw3vNrE0-LWO0Ot3lVwpBv_R4r3FQnw4FnilNUaqlOa_oZ28tEOPdjblicbBrpWJnbiKnkdg4fhqLGjOCKLK3Xwr3HN6SEPBhpdWe8j_ujzaLpI1X14OpIq9MK32ZfpeXwJO0s0DPLdbJcIGG5SoIKkpU6wFtpf5S6Eug3xYnJTlitfUQ5Jut8SNBTNAuhfKJI7e5dSHA9ZnLDgVeOEpgPSOJSTy");'>
</div>
<div class="absolute bottom-0 right-0 size-3 bg-primary rounded-full border-2 border-white dark:border-[#132210]"></div>
</div>
</div>
<div class="flex items-center justify-center">
<h2 class="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">Sage</h2>
</div>
<div class="flex items-center justify-end w-10">
<button class="flex items-center justify-center p-2 rounded-full text-neutral-500 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined">settings</span>
</button>
</div>
</header>
<!-- Greeting Headline -->
<section class="px-5 pt-4 pb-6">
<h1 class="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-white">
                Good morning, <br/>
<span class="text-neutral-400 dark:text-neutral-500">Alex.</span>
</h1>
</section>
<!-- Daily Focus Card -->
<section class="px-4 mb-8">
<div class="relative overflow-hidden rounded-2xl bg-white dark:bg-[#1d271c] shadow-lg shadow-neutral-200/50 dark:shadow-none group transition-transform hover:scale-[1.01] duration-300">
<div class="absolute top-0 left-0 w-full h-2 bg-primary"></div>
<div class="flex flex-col md:flex-row">
<div class="w-full md:w-2/5 aspect-video md:aspect-auto bg-cover bg-center" data-alt="Abstract calming landscape with soft morning light" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBKdkwyJP8ukkqBdy7ZDTDdMLfdQfBdh7l_I4qMiyfgKxDQHxCtiit2kIZ7fj71EsgkpDSGiSuf8eqm3yq__kzihAj39jZmJfKvYCIWHBToVw4QpwH-B6uRDiGn3m9jDvhONymjQ5GtqjkFruhf0fLxfQrhSAH7mT5akEpWPvILTLR_6QjyFqm9id3jg5ly6LPfrdCDiiQwrMOKQGspD_H_1G2Yjn13PbaWu3KcQXfSkeI-7SSYEl_qRyodfhd1hbmIXKIWSsAkduoY");'>
</div>
<div class="p-6 flex flex-col justify-center w-full md:w-3/5 gap-4">
<div class="flex items-center gap-2">
<span class="flex items-center justify-center size-6 rounded-full bg-primary/20 text-green-700 dark:text-green-300">
<span class="material-symbols-outlined text-[16px]">light_mode</span>
</span>
<span class="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Daily Wisdom</span>
</div>
<div>
<h3 class="text-xl font-bold leading-snug mb-2">The only way out is through.</h3>
<p class="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                                Face today's challenges with a calm mind. What is one obstacle you are ready to overcome?
                            </p>
</div>
<div class="pt-2">
<button class="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-[#2ed60e] text-[#121811] text-sm font-semibold rounded-xl transition-all active:scale-95 shadow-md shadow-primary/20">
<span>Reflect Now</span>
<span class="material-symbols-outlined text-lg">arrow_forward</span>
</button>
</div>
</div>
</div>
</div>
</section>
<!-- Section: Guided Reflections -->
<section class="mb-6">
<div class="flex items-center justify-between px-5 mb-4">
<h3 class="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">Guided Reflections</h3>
<button class="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">See All</button>
</div>
<!-- Carousel -->
<div class="flex overflow-x-auto pb-6 px-4 gap-4 [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden snap-x snap-mandatory">
<!-- Card 1 -->
<div class="snap-start shrink-0 w-64 md:w-72 flex flex-col gap-3 group cursor-pointer">
<div class="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
<div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Person meditating by a calm lake" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCau9pHo3v7y-QKLFu38RYnQxpoonzmnkCV-G3QViHbZ_Kj_2a-doZeojiAbT9Xoj00mO597LDTCuWwuVa96FJ325F5CwEn0x_AKGNzxWmaimg8SVYUznbA-sDMEVwS8Yyu_kcWUr_Hu3HLmsuuhtDVf-0mp6u9RfTvIifO36x6bokFHw3CGKCfVjk2dQo0SLCxGF3BQcjYQMvLzu0Y9HF5phPpecfoVVHBfc9JFucWgSN7OE9SCfygafqiuHA9u_YI726j5M-eHeO7");'></div>
<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
<div class="absolute bottom-3 left-3 right-3 flex justify-between items-end">
<span class="px-2 py-1 rounded-md bg-white/20 backdrop-blur-sm text-white text-xs font-medium">5 min</span>
</div>
</div>
<div class="px-1">
<h4 class="text-base font-bold text-neutral-900 dark:text-white leading-tight">Morning Check-in</h4>
<p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Set your intentions for the day ahead.</p>
</div>
</div>
<!-- Card 2 -->
<div class="snap-start shrink-0 w-64 md:w-72 flex flex-col gap-3 group cursor-pointer">
<div class="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
<div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Cozy reading nook with warm lighting" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDYzsDMhMU0msReX_zRH92RgYT6tmc4EUFW7kR6G0GsEgFWzXrHj9jIGvn_HxRb7pb3LP4M3h4XTCWKt3xHRniilQE2rNwy_yQgn6Y_6a61VuGZ4dWjfqa2OGiI5gbkvSTeexTuxqHnKahlA7Dtnve3-dAZpfWe8lSbsOCGy2LPMtFSIpm5LhejIU5iRMDNLNLQk7zibS2EOwMv8irbEjXZIYo64H7DA2TTHVi-j1AiOYpwihlrKzyZGvp2jOZST5e6fsshxQzBUjIj");'></div>
<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
<div class="absolute bottom-3 left-3 right-3 flex justify-between items-end">
<span class="px-2 py-1 rounded-md bg-white/20 backdrop-blur-sm text-white text-xs font-medium">10 min</span>
</div>
</div>
<div class="px-1">
<h4 class="text-base font-bold text-neutral-900 dark:text-white leading-tight">Evening Wind-down</h4>
<p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Release the stress of the day.</p>
</div>
</div>
<!-- Card 3 -->
<div class="snap-start shrink-0 w-64 md:w-72 flex flex-col gap-3 group cursor-pointer">
<div class="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
<div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Forest path with sunlight streaming through trees" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBeJaAOXMUPNwyx9JMusDcKhWXEmIVL4qWGjM3b3Rvyr54c9tZ5Kj0_Y6K7GiKFU0SJXeQvW5Iu3JWyB63rZHGq9JRjkDS7QWrvauz6rkbZtoIn_6DTCcPOPeiO29FNetjIFQEsYtGP5__RAKNuDaoJUJTEPpsOiv8NrKZXG860b8Zn8unKFqWDVgLy7Tqswdo10jmxVVt1KYwri7TvHXkhF2n8h8dpB0dcKOJAVwH_dvAmYoTknN94M2Z7vJRrfWFxH26_sT1Ti0uJ");'></div>
<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
<div class="absolute bottom-3 left-3 right-3 flex justify-between items-end">
<span class="px-2 py-1 rounded-md bg-white/20 backdrop-blur-sm text-white text-xs font-medium">15 min</span>
</div>
</div>
<div class="px-1">
<h4 class="text-base font-bold text-neutral-900 dark:text-white leading-tight">Nature Walk</h4>
<p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Ground yourself in the present moment.</p>
</div>
</div>
</div>
</section>
<!-- Section: Your Journey -->
<section class="px-4 mb-4">
<h3 class="text-lg font-bold text-neutral-900 dark:text-white tracking-tight mb-4 px-1">Your Journey</h3>
<div class="grid grid-cols-2 gap-4">
<div class="bg-white dark:bg-[#1d271c] p-4 rounded-2xl shadow-sm flex flex-col justify-between h-32">
<div class="flex justify-between items-start">
<div class="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
<span class="material-symbols-outlined">bar_chart</span>
</div>
</div>
<div>
<p class="text-2xl font-bold text-neutral-900 dark:text-white">12</p>
<p class="text-xs font-medium text-neutral-500 dark:text-neutral-400">Days Streak</p>
</div>
</div>
<div class="bg-white dark:bg-[#1d271c] p-4 rounded-2xl shadow-sm flex flex-col justify-between h-32">
<div class="flex justify-between items-start">
<div class="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
<span class="material-symbols-outlined">psychology</span>
</div>
</div>
<div>
<p class="text-2xl font-bold text-neutral-900 dark:text-white">85%</p>
<p class="text-xs font-medium text-neutral-500 dark:text-neutral-400">Mood Stability</p>
</div>
</div>
</div>
</section>
</div>
<!-- Floating Action Button (Ask Sage) -->
<div class="fixed bottom-24 right-4 z-40">
<button class="group flex items-center justify-center gap-2 bg-primary text-[#121811] h-14 pl-5 pr-6 rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300">
<span class="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">spark</span>
<span class="font-bold text-base tracking-wide">Ask Sage</span>
</button>
</div>
<!-- Bottom Navigation -->
<div class="fixed bottom-0 w-full bg-white/90 dark:bg-[#132210]/90 backdrop-blur-lg border-t border-neutral-100 dark:border-white/5 pb-6 pt-2 z-30">
<div class="flex justify-around items-center">
<button class="flex flex-col items-center gap-1 p-2 w-16 text-neutral-900 dark:text-white">
<span class="material-symbols-outlined filled">home</span>
<span class="text-[10px] font-medium">Home</span>
</button>
<button class="flex flex-col items-center gap-1 p-2 w-16 text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 transition-colors">
<span class="material-symbols-outlined">menu_book</span>
<span class="text-[10px] font-medium">Journal</span>
</button>
<button class="flex flex-col items-center gap-1 p-2 w-16 text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 transition-colors">
<span class="material-symbols-outlined">insights</span>
<span class="text-[10px] font-medium">Insights</span>
</button>
<button class="flex flex-col items-center gap-1 p-2 w-16 text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 transition-colors">
<span class="material-symbols-outlined">person</span>
<span class="text-[10px] font-medium">Profile</span>
</button>
</div>
</div>
</body></html>

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

<!-- Ask Session Screen -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Ask Sage Session</title>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&amp;display=swap" rel="stylesheet"/>
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
                        "background-dark": "#131811", // Using the dark green/black from the examples
                        "sage-green": "#2e3928",
                        "text-muted": "#a6b99d"
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
        /* Custom scrollbar for clean look */
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
<body class="bg-background-light dark:bg-background-dark font-display h-screen flex flex-col overflow-hidden text-slate-900 dark:text-white antialiased selection:bg-primary selection:text-background-dark">
<!-- Header -->
<header class="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between shrink-0 z-10 border-b border-white/5">
<button class="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
<span class="material-symbols-outlined text-[24px]">arrow_back</span>
</button>
<h2 class="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] text-center">Ask Sage</h2>
<div class="size-12 shrink-0"></div> <!-- Spacer for centering -->
</header>
<!-- Chat Area (Scrollable) -->
<main class="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-6 scroll-smooth">
<!-- User Message -->
<div class="flex items-end gap-3 justify-end animate-fade-in-up">
<div class="flex flex-col gap-1 items-end max-w-[85%]">
<p class="text-slate-500 dark:text-text-muted text-[13px] font-medium pr-1">You</p>
<div class="text-base font-normal leading-relaxed rounded-2xl rounded-tr-sm px-5 py-3.5 bg-primary text-background-dark shadow-sm">
                    I'm feeling overwhelmed by my workload and I don't know where to start.
                </div>
</div>
</div>
<!-- Sage AI Response -->
<div class="flex items-start gap-3">
<!-- Avatar -->
<div class="bg-center bg-no-repeat bg-cover rounded-full size-10 shrink-0 mt-6 border border-white/10 shadow-lg" data-alt="Abstract gradient avatar representing AI Sage" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuADvBMEPnQ-bHjGp7erZ9rvhYV581bjL5X3Hllf0Z6OqkSd6wytaOcQFh5STMKl4iylBCy60yWd5lKWTSy5y0tiydtokBiw15kvPb7XIv9IVt9PH3ew2Ys-vL1aHuggCyOq1uob6VBtDbCsovrg4asPasi06s9q5mgoRBVfBB8KohqGjKl7Bq9vxpYI8YNIn4wjxf7NW9jKCIoD_fJqCoqYmhTVFcMiNQYCFp6UB-f_r4uO0WL5fea-O2CwD6lsJbMrgflJhTSKZuWW");'></div>
<div class="flex flex-col gap-2 flex-1 max-w-[90%]">
<p class="text-slate-500 dark:text-text-muted text-[13px] font-medium pl-1">Sage AI</p>
<!-- Main Complex Bubble -->
<div class="bg-white dark:bg-sage-green rounded-2xl rounded-tl-sm p-5 shadow-sm text-slate-800 dark:text-white space-y-6">
<!-- Section 1: Guidance -->
<div class="space-y-2">
<p class="leading-relaxed text-[15px] opacity-90">
                            It sounds like you're carrying a heavy cognitive load right now. When everything feels urgent, our nervous system often freezes, making even small tasks feel like mountains. This "paralysis" is a natural protective response, not a sign of incompetence. Let's try to gently loosen that grip.
                        </p>
</div>
<hr class="border-slate-200 dark:border-white/10"/>
<!-- Section 2: Reflection Prompts -->
<div class="space-y-3">
<h4 class="text-xs font-bold uppercase tracking-wider opacity-60 flex items-center gap-2">
<span class="material-symbols-outlined text-[16px]">psychology</span>
                            Reflection
                        </h4>
<ul class="space-y-3">
<li class="flex items-start gap-3">
<span class="bg-primary/20 text-primary-dark dark:text-primary rounded-full size-5 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
<span class="text-[15px]">What is one task you can drop today without consequence?</span>
</li>
<li class="flex items-start gap-3">
<span class="bg-primary/20 text-primary-dark dark:text-primary rounded-full size-5 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
<span class="text-[15px]">Where do you feel this pressure in your body right now?</span>
</li>
</ul>
</div>
<!-- Section 3: Micro-practice -->
<div class="relative overflow-hidden rounded-xl bg-slate-50 dark:bg-[#222b1d] border border-primary/20 p-4">
<div class="absolute top-0 left-0 w-1 h-full bg-primary"></div>
<div class="flex items-start gap-3">
<div class="bg-primary/10 text-primary-dark dark:text-primary rounded-lg p-2 shrink-0">
<span class="material-symbols-outlined">timer</span>
</div>
<div>
<h4 class="font-bold text-sm mb-1">90-Second Reset</h4>
<p class="text-sm opacity-80 leading-snug">Box Breathing: Inhale for 4s, Hold for 4s, Exhale for 4s, Hold for 4s. Repeat 3 times.</p>
</div>
</div>
</div>
</div>
<!-- Action Buttons -->
<div class="flex flex-wrap gap-2 mt-1">
<button class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined text-[18px] text-slate-500 dark:text-text-muted">bookmark</span>
<span class="text-xs font-medium">Save Insight</span>
</button>
<button class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined text-[18px] text-slate-500 dark:text-text-muted">volume_up</span>
<span class="text-xs font-medium">Listen</span>
</button>
<button class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined text-[18px] text-slate-500 dark:text-text-muted">tune</span>
<span class="text-xs font-medium">Rewrite tone</span>
</button>
<button class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 dark:bg-primary/20 border border-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors text-primary-dark dark:text-primary">
<span class="material-symbols-outlined text-[18px]">explore</span>
<span class="text-xs font-bold">Go deeper</span>
</button>
</div>
</div>
</div>
<!-- Spacer for bottom fixed area -->
<div class="h-48"></div>
</main>
<!-- Footer / Input Area -->
<footer class="bg-background-light dark:bg-background-dark border-t border-white/5 pt-4 pb-6 px-4 shrink-0 z-20 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)]">
<!-- Suggestion Chips -->
<div class="flex gap-2 overflow-x-auto no-scrollbar mb-4 mask-fade-right">
<button class="whitespace-nowrap px-4 py-2 rounded-full bg-white dark:bg-[#2e3928] border border-slate-200 dark:border-white/10 text-sm font-medium hover:bg-slate-50 dark:hover:border-primary/50 transition-colors">
                I feel stuck
            </button>
<button class="whitespace-nowrap px-4 py-2 rounded-full bg-white dark:bg-[#2e3928] border border-slate-200 dark:border-white/10 text-sm font-medium hover:bg-slate-50 dark:hover:border-primary/50 transition-colors">
                I’m anxious
            </button>
<button class="whitespace-nowrap px-4 py-2 rounded-full bg-white dark:bg-[#2e3928] border border-slate-200 dark:border-white/10 text-sm font-medium hover:bg-slate-50 dark:hover:border-primary/50 transition-colors">
                I’m angry
            </button>
<button class="whitespace-nowrap px-4 py-2 rounded-full bg-white dark:bg-[#2e3928] border border-slate-200 dark:border-white/10 text-sm font-medium hover:bg-slate-50 dark:hover:border-primary/50 transition-colors">
                I need clarity
            </button>
</div>
<!-- Input Field Container -->
<div class="relative flex items-center gap-3">
<div class="relative flex-1 group">
<input class="w-full h-14 pl-5 pr-12 rounded-full bg-slate-100 dark:bg-[#1f261c] border-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-[#2e3928] transition-all" placeholder="What’s alive for you right now?" type="text"/>
<button class="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:text-white/50 dark:hover:text-white transition-colors">
<span class="material-symbols-outlined">mic</span>
</button>
</div>
<button class="size-14 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all text-background-dark">
<span class="material-symbols-outlined fill-current">arrow_upward</span>
</button>
</div>
<!-- Disclaimer -->
<div class="mt-4 text-center">
<a class="text-[11px] text-slate-400 dark:text-white/20 hover:text-slate-600 dark:hover:text-white/40 transition-colors" href="#">
                Not medical advice • Learn more
            </a>
</div>
</footer>
</body></html>

<!-- Tone Adjustment Bottom Sheet (Light Mode)  -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage - Tone Adjustment</title>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#ec4913",
                        "background-light": "#f8f6f6",
                        "background-dark": "#221510",
                        "warm-gray": "#e6dedb",
                        "text-main": "#181311",
                        "text-secondary": "#896b61",
                        "surface": "#ffffff",
                    },
                    fontFamily: {
                        "display": ["Manrope", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "0.25rem", "md": "0.375rem", "lg": "0.5rem", "xl": "0.75rem", "2xl": "1rem", "3xl": "1.75rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        /* Custom range slider styling for a cleaner look */
        input[type=range] {
            -webkit-appearance: none;
            width: 100%;
            background: transparent;
        }
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background: #ec4913;
            cursor: pointer;
            margin-top: -10px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        input[type=range]::-webkit-slider-runnable-track {
            width: 100%;
            height: 4px;
            cursor: pointer;
            background: #e6dedb;
            border-radius: 2px;
        }
        input[type=range]:focus {
            outline: none;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="font-display bg-stone-900 flex flex-col justify-end min-h-screen antialiased overflow-hidden relative">
<!-- Simulated App Background (Blurred) -->
<div class="absolute inset-0 z-0 opacity-40">
<div class="h-full w-full bg-gradient-to-b from-stone-800 to-black"></div>
<div class="absolute top-20 left-4 right-4 h-64 bg-stone-700 rounded-xl opacity-20"></div>
<div class="absolute bottom-1/2 left-4 right-4 h-32 bg-stone-700 rounded-xl opacity-20"></div>
</div>
<!-- Bottom Sheet Container -->
<div class="relative z-10 w-full max-w-md mx-auto bg-background-light rounded-t-3xl shadow-2xl flex flex-col max-h-[90vh]">
<!-- Drag Handle Area -->
<div class="flex flex-col items-center pt-3 pb-2 w-full">
<div class="h-1.5 w-12 rounded-full bg-warm-gray/80"></div>
</div>
<!-- Header -->
<div class="px-6 pb-2 pt-2">
<h3 class="text-text-main tracking-tight text-2xl font-extrabold leading-tight text-center">Adjust Tone</h3>
</div>
<!-- Scrollable Content Area -->
<div class="flex-1 overflow-y-auto px-6 pt-4 pb-8 space-y-8">
<!-- Collapsed Preview Card -->
<div class="bg-surface rounded-xl p-4 border border-warm-gray/30 shadow-sm flex items-center justify-between gap-4 transition-all active:scale-[0.99]">
<div class="flex flex-col gap-1 overflow-hidden">
<p class="text-text-secondary text-xs font-bold uppercase tracking-wider">Current Draft</p>
<p class="text-text-main text-base font-medium leading-normal truncate">Your reflection regarding the pattern of...</p>
</div>
<span class="material-symbols-outlined text-text-secondary shrink-0" style="font-size: 24px;">expand_more</span>
</div>
<!-- Tone Selector (Segmented Control) -->
<div class="space-y-3">
<label class="text-text-main text-sm font-bold ml-1 block">Tone Style</label>
<div class="flex bg-warm-gray/30 p-1 rounded-xl">
<!-- Option 1 -->
<label class="flex-1 cursor-pointer">
<input class="peer sr-only" name="tone" type="radio" value="practical"/>
<div class="h-10 w-full flex items-center justify-center rounded-lg text-sm font-medium text-text-secondary transition-all peer-checked:bg-surface peer-checked:text-primary peer-checked:shadow-sm">
                            Practical
                        </div>
</label>
<!-- Option 2 -->
<label class="flex-1 cursor-pointer">
<input checked="" class="peer sr-only" name="tone" type="radio" value="poetic"/>
<div class="h-10 w-full flex items-center justify-center rounded-lg text-sm font-medium text-text-secondary transition-all peer-checked:bg-surface peer-checked:text-primary peer-checked:shadow-sm">
                            Poetic
                        </div>
</label>
<!-- Option 3 -->
<label class="flex-1 cursor-pointer">
<input class="peer sr-only" name="tone" type="radio" value="minimal"/>
<div class="h-10 w-full flex items-center justify-center rounded-lg text-sm font-medium text-text-secondary transition-all peer-checked:bg-surface peer-checked:text-primary peer-checked:shadow-sm">
                            Minimal
                        </div>
</label>
<!-- Option 4 -->
<label class="flex-1 cursor-pointer">
<input class="peer sr-only" name="tone" type="radio" value="deep"/>
<div class="h-10 w-full flex items-center justify-center rounded-lg text-sm font-medium text-text-secondary transition-all peer-checked:bg-surface peer-checked:text-primary peer-checked:shadow-sm">
                            Deep
                        </div>
</label>
</div>
</div>
<!-- Guidance Slider -->
<div class="space-y-4">
<div class="flex justify-between items-end mb-2">
<label class="text-text-main text-sm font-bold ml-1">Direction</label>
</div>
<div class="relative py-2">
<input class="w-full h-1 bg-warm-gray rounded-lg appearance-none cursor-pointer" max="100" min="0" type="range" value="65"/>
<!-- Custom Track Fill simulation via gradient if needed, but simple CSS above handles track base -->
</div>
<div class="flex justify-between text-xs font-medium text-text-secondary pt-1">
<span>More questions</span>
<span>More statements</span>
</div>
</div>
<!-- Helper Text -->
<div class="text-center pt-2">
<p class="text-text-secondary/80 text-sm font-normal">
                    Keeps the meaning; changes the style.
                </p>
</div>
</div>
<!-- Footer Actions -->
<div class="px-6 py-6 bg-background-light border-t border-warm-gray/20 flex gap-4">
<button class="flex-1 h-12 rounded-xl border border-warm-gray/50 text-text-main font-bold text-base hover:bg-warm-gray/20 transition-colors focus:outline-none focus:ring-2 focus:ring-warm-gray">
                Cancel
            </button>
<button class="flex-1 h-12 rounded-xl bg-primary text-white font-bold text-base shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                Apply
            </button>
</div>
<!-- Safe area spacing for iOS home indicator -->
<div class="h-2 w-full bg-background-light"></div>
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

<!-- Sage Insight Detail (Light Mode)  -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage Insight Detail</title>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
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
                        "surface-light": "#ffffff",
                        "surface-dark": "#1c2a15",
                    },
                    fontFamily: {
                        "display": ["Manrope", "sans-serif"]
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
<body class="bg-surface-light dark:bg-background-dark font-display text-[#131811] dark:text-[#f6f8f6] min-h-screen flex flex-col">
<!-- Top App Bar -->
<header class="sticky top-0 z-50 bg-surface-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-transparent dark:border-white/5">
<button class="flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined text-2xl">arrow_back</span>
</button>
<h2 class="text-base font-bold tracking-tight uppercase">Insight</h2>
<button class="flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-[#131811] dark:text-white">
<span class="material-symbols-outlined text-2xl">bookmark_border</span>
</button>
</header>
<main class="flex-1 overflow-y-auto w-full max-w-md mx-auto px-6 pb-12">
<!-- Headline & Meta -->
<div class="pt-6 pb-8">
<h1 class="text-4xl font-extrabold leading-[1.1] tracking-tighter mb-3 text-[#131811] dark:text-white">
                The Barrier is the Way
            </h1>
<p class="text-gray-500 dark:text-gray-400 text-sm font-medium">Oct 24 • 08:30 AM</p>
</div>
<!-- Audio Player -->
<div class="mb-10 bg-background-light dark:bg-surface-dark rounded-2xl p-4 flex flex-col gap-4">
<div class="flex items-center gap-4">
<div class="size-12 rounded-lg bg-gray-200 dark:bg-gray-700 bg-cover bg-center shrink-0" data-alt="Abstract gradient artwork representing sound waves" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-rovTZCQLUDa8a4TDpl3J2yHU-n3q05YbGWTlKEiTBCTrfdgLPINyH2RcY3aKoY0nfS7Kj4SfyZ1v_z69F7LpvI5zHX_ehgbHwosC3rPzbMDHqjyHQml8x6Ak3b0kVCrI8KmMjNIb21M7fW0IHqtmJ_ioXz_HSxIlLg2d9lJCFBC6iDTXLBKF_rv5ZiTA-9QnO0Sf0saweygwiYmgteC5W5V3pPgoF61K5pgUzGj31pyeEo2ZBcXgobS2sdOoaSNI_6xEf2YbJER9');">
</div>
<div class="flex-1 min-w-0">
<p class="font-bold text-base truncate dark:text-white">Insight Narration</p>
<div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
<span>1x</span>
<span class="size-1 rounded-full bg-gray-400"></span>
<span>Male Voice</span>
</div>
</div>
<button class="size-12 rounded-full bg-primary flex items-center justify-center text-[#131811] hover:scale-105 transition-transform shadow-sm">
<span class="material-symbols-outlined text-2xl font-variation-fill">play_arrow</span>
</button>
</div>
<div class="space-y-1.5">
<div class="relative h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
<div class="absolute top-0 left-0 h-full w-[35%] bg-[#131811] dark:bg-primary rounded-full"></div>
</div>
<div class="flex justify-between text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-wide uppercase">
<span>1:17</span>
<span>2:23</span>
</div>
</div>
</div>
<!-- Content Sections -->
<div class="space-y-10">
<!-- Guidance -->
<section>
<h3 class="text-xs font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase mb-3">Guidance</h3>
<p class="text-lg leading-relaxed font-medium text-[#131811] dark:text-gray-200">
                    Do not turn away from the difficulty. The friction you feel is the material you must work with. It is not an obstacle to the path, but the path itself.
                </p>
</section>
<!-- Reflection -->
<section>
<h3 class="text-xs font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase mb-3">Reflection</h3>
<p class="text-lg leading-relaxed font-medium text-[#131811] dark:text-gray-200">
                    Where are you currently hesitating? Identify the fear beneath the hesitation. Is it a fear of failure, or a fear of success?
                </p>
</section>
<!-- Practice -->
<section>
<h3 class="text-xs font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase mb-3">Practice</h3>
<p class="text-lg leading-relaxed font-medium text-[#131811] dark:text-gray-200">
                    Sit with the sensation of discomfort for 2 minutes today. Do not try to solve it. Just observe it.
                </p>
</section>
</div>
<!-- Divider -->
<div class="h-px w-full bg-gray-100 dark:bg-white/10 my-10"></div>
<!-- Journaling Section -->
<div class="space-y-4">
<label class="block text-xl font-bold tracking-tight text-[#131811] dark:text-white" for="journal-input">
                What resonates? What feels difficult?
            </label>
<div class="relative group">
<textarea class="w-full bg-background-light dark:bg-surface-dark rounded-xl p-4 min-h-[160px] text-base leading-relaxed resize-none border-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-gray-400 dark:text-white dark:placeholder-gray-600" id="journal-input" placeholder="Write your thoughts here..."></textarea>
<div class="absolute bottom-3 right-3 pointer-events-none text-gray-400 text-xs opacity-0 group-focus-within:opacity-100 transition-opacity">
                    Typing...
                </div>
</div>
<button class="w-full h-14 bg-primary rounded-xl flex items-center justify-center gap-2 text-[#131811] font-bold text-base hover:bg-opacity-90 active:scale-[0.99] transition-all">
<span>Save Note</span>
<span class="material-symbols-outlined text-xl">check</span>
</button>
</div>
<!-- Tags & Actions -->
<div class="mt-10 flex flex-col gap-6">
<!-- Tags -->
<div class="flex flex-wrap gap-2">
<span class="px-4 py-2 rounded-full bg-background-light dark:bg-surface-dark border border-transparent hover:border-gray-300 dark:hover:border-gray-600 text-sm font-bold text-gray-600 dark:text-gray-300 transition-colors cursor-pointer">
                    #Discipline
                </span>
<span class="px-4 py-2 rounded-full bg-background-light dark:bg-surface-dark border border-transparent hover:border-gray-300 dark:hover:border-gray-600 text-sm font-bold text-gray-600 dark:text-gray-300 transition-colors cursor-pointer">
                    #Fear
                </span>
<span class="px-4 py-2 rounded-full bg-background-light dark:bg-surface-dark border border-transparent hover:border-gray-300 dark:hover:border-gray-600 text-sm font-bold text-gray-600 dark:text-gray-300 transition-colors cursor-pointer">
                    #Action
                </span>
<button class="px-3 py-2 rounded-full bg-transparent border border-dashed border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    + Add Tag
                </button>
</div>
<!-- Share Action -->
<div class="flex justify-center pt-2">
<button class="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-[#131811] dark:hover:text-white transition-colors font-semibold text-sm py-2">
<span class="material-symbols-outlined text-xl">ios_share</span>
                    Export as Image
                </button>
</div>
</div>
</main>
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

<!-- Sage App Explore Screen (Light Mode) -->
<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage App - Explore</title>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
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
<style>.no-scrollbar::-webkit-scrollbar {
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
<body class="bg-background-light text-slate-900 font-display antialiased selection:bg-primary selection:text-black">
<div class="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24">
<header class="flex items-center px-6 py-6 justify-between sticky top-0 z-20 bg-background-light/90 backdrop-blur-md">
<h1 class="text-3xl font-bold tracking-tight text-slate-900">Explore</h1>
<div class="relative group cursor-pointer">
<div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-transparent group-hover:ring-primary transition-all duration-300 shadow-sm" data-alt="Profile picture" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZKN4ZPbGatqKLQQvoct6oOV_5hgp9WgyMDRs_QIiZJaEfdCiJ0062wA0o6Il5FnXbelu48jmM6uxaPyoXql9siJtH1Udnej5fyzlD-x5hRTc90eIhxA0cfyZIxT4trUAXTgKeMeQCZgNlT4LWXrLlsuzSAgLBHIFJGpZT02pgs1yT33X9HssbqM0ihC0oXGuxdVPbsjBFH7jdeIuuqYhK7XC4YXCOAlnLNqKH9egQkOCjX5HbYGEHQKuKpB0-UHxpt61VPd8wZSHD");'></div>
</div>
</header>
<main class="flex flex-col gap-8 px-6 pt-2">
<div class="relative w-full">
<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-slate-400 text-[24px]">search</span>
</div>
<input class="block w-full pl-12 pr-4 py-4 bg-white border-none rounded-2xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary shadow-sm text-base font-medium transition-shadow hover:shadow-md" placeholder="Search themes" type="text"/>
</div>
<section class="flex flex-col gap-4">
<div class="flex items-center justify-between">
<h3 class="text-xl font-bold text-slate-900 tracking-tight">Themes</h3>
</div>
<div class="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
<button class="flex shrink-0 flex-col items-start justify-between w-32 h-28 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
<div class="p-2 rounded-full bg-blue-50 text-blue-500 group-hover:bg-blue-100 transition-colors">
<span class="material-symbols-outlined text-[20px]">water_drop</span>
</div>
<span class="font-semibold text-slate-900 text-sm">Calm</span>
</button>
<button class="flex shrink-0 flex-col items-start justify-between w-32 h-28 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
<div class="p-2 rounded-full bg-orange-50 text-orange-500 group-hover:bg-orange-100 transition-colors">
<span class="material-symbols-outlined text-[20px]">bolt</span>
</div>
<span class="font-semibold text-slate-900 text-sm">Action</span>
</button>
<button class="flex shrink-0 flex-col items-start justify-between w-32 h-28 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
<div class="p-2 rounded-full bg-purple-50 text-purple-500 group-hover:bg-purple-100 transition-colors">
<span class="material-symbols-outlined text-[20px]">fingerprint</span>
</div>
<span class="font-semibold text-slate-900 text-sm">Self</span>
</button>
<button class="flex shrink-0 flex-col items-start justify-between w-32 h-28 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
<div class="p-2 rounded-full bg-pink-50 text-pink-500 group-hover:bg-pink-100 transition-colors">
<span class="material-symbols-outlined text-[20px]">favorite</span>
</div>
<span class="font-semibold text-slate-900 text-sm">Relationships</span>
</button>
<button class="flex shrink-0 flex-col items-start justify-between w-32 h-28 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
<div class="p-2 rounded-full bg-teal-50 text-teal-500 group-hover:bg-teal-100 transition-colors">
<span class="material-symbols-outlined text-[20px]">waves</span>
</div>
<span class="font-semibold text-slate-900 text-sm">Change</span>
</button>
<button class="flex shrink-0 flex-col items-start justify-between w-32 h-28 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
<div class="p-2 rounded-full bg-yellow-50 text-yellow-600 group-hover:bg-yellow-100 transition-colors">
<span class="material-symbols-outlined text-[20px]">lightbulb</span>
</div>
<span class="font-semibold text-slate-900 text-sm">Meaning</span>
</button>
</div>
</section>
<section class="flex flex-col gap-4 mb-6">
<div class="flex items-end justify-between">
<h3 class="text-xl font-bold text-slate-900 tracking-tight">Paths</h3>
<a class="text-sm font-medium text-slate-500 hover:text-primary transition-colors" href="#">View all</a>
</div>
<div class="flex flex-col gap-4">
<div class="group relative flex overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer">
<div class="w-32 bg-slate-200 bg-cover bg-center shrink-0" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDon8AlOS3xItj5yDDV0cUKbB3P5X1LuK0bNqxWHW-ZxrthlmLeymPVxBcwnurSO3n0oV6XOsDNxGLc80guAApWyNTQY6QAmvM3xGbUPJS3mcG6Di8fhQ7Gz_1GhKuI_Igunz8-RnlC_6HBhQnmWAmObgO4XK31NDCvMakaH-3eJQlNFVjogSJtjmrbt7vzUtR4lAll_koyVr5a3cB-DLuG-yEPp-rIedyWumkQ-sdy-pjfBgmXm4bO5aQTtbNO08PVkqVLuCl-cl2n");'></div>
<div class="flex flex-col justify-center p-5 flex-1 min-w-0">
<div class="flex items-center gap-2 mb-1">
<span class="material-symbols-outlined text-primary text-[16px]">schedule</span>
<span class="text-xs font-semibold text-slate-500 uppercase tracking-wide">7 Days</span>
</div>
<h4 class="text-slate-900 font-bold text-lg leading-tight mb-1 truncate">7 Days of Calm</h4>
<p class="text-slate-500 text-sm line-clamp-2">A gentle guide to finding stillness amidst the chaos of daily life.</p>
</div>
<div class="absolute right-4 top-1/2 -translate-y-1/2 size-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
<span class="material-symbols-outlined text-[20px]">arrow_forward_ios</span>
</div>
</div>
<div class="group relative flex overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer">
<div class="w-32 bg-slate-200 bg-cover bg-center shrink-0" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDL12SVXDgqDXu9xMi7Aqzvd1xHVNdboPFmWSKHQNaRnZe2jqTuuXT1McPSAlncr26rXm_zDbvxi813_oHrR3MHXz3PDU_mQE2b6e-RwoUy5GMiN-NwHfoFO9KXy0SzvAPhzL05y37SUjcKWo4FrdsTG9G-rJexchuI0i1NDoobQyvIq9gWD7SXLZzz6MceVX48SxgVwwNbIuCYeTIdBr5N4h3xzXks5bRE3cI8x_OdwU8qTKKAnB0emxNah-4cCi-gE1TDBnhat4Gn");'></div>
<div class="flex flex-col justify-center p-5 flex-1 min-w-0">
<div class="flex items-center gap-2 mb-1">
<span class="material-symbols-outlined text-primary text-[16px]">schedule</span>
<span class="text-xs font-semibold text-slate-500 uppercase tracking-wide">7 Days</span>
</div>
<h4 class="text-slate-900 font-bold text-lg leading-tight mb-1 truncate">7 Days of Clarity</h4>
<p class="text-slate-500 text-sm line-clamp-2">Clear the mental fog and rediscover your core purpose.</p>
</div>
<div class="absolute right-4 top-1/2 -translate-y-1/2 size-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
<span class="material-symbols-outlined text-[20px]">arrow_forward_ios</span>
</div>
</div>
<div class="group relative flex overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer">
<div class="w-32 bg-slate-200 bg-cover bg-center shrink-0" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCN3ghijlCKGLMfbPo2XxYeju-w0IVryc64XLNA1X2vwPVeWpxJJeDlwJfefMm0KkRz09nR_0OeD1RIh9c7E4B_YrCuWPpIMVzN1jDEwG1_8MkG4O77JfQMzJKXJJ_BcS6YlKG-yRXxuc24MKKyTXRJs0bVLYGBUCe7WyXM2-F8CX10EHZUWOsrOjjiHOpGNzYubebdFVKycLsWEdzQEIQFhym3Zd5YbJTVnJjsaUhrd7h8d4ts070pQXedZaiH8T1ehUnkWgvGD6uB");'></div>
<div class="flex flex-col justify-center p-5 flex-1 min-w-0">
<div class="flex items-center gap-2 mb-1">
<span class="material-symbols-outlined text-primary text-[16px]">schedule</span>
<span class="text-xs font-semibold text-slate-500 uppercase tracking-wide">7 Days</span>
</div>
<h4 class="text-slate-900 font-bold text-lg leading-tight mb-1 truncate">7 Days of Courage</h4>
<p class="text-slate-500 text-sm line-clamp-2">Step into your power and embrace the unknown with confidence.</p>
</div>
<div class="absolute right-4 top-1/2 -translate-y-1/2 size-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
<span class="material-symbols-outlined text-[20px]">arrow_forward_ios</span>
</div>
</div>
</div>
</section>
</main>
<button class="fixed bottom-24 right-6 size-16 bg-primary text-background-dark rounded-full shadow-[0_4px_14px_rgba(55,236,19,0.3)] hover:shadow-[0_6px_20px_rgba(55,236,19,0.5)] hover:scale-105 active:scale-95 transition-all z-40 flex items-center justify-center group">
<span class="material-symbols-outlined text-[32px] font-bold group-hover:rotate-12 transition-transform">chat_bubble</span>
</button>
<nav class="fixed bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-200 z-50">
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

<!-- Sage App Theme Detail (Light Mode) - Fear -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage - Fear Theme Detail</title>
<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&amp;family=Noto+Sans:wght@400;500;700&amp;display=swap" rel="stylesheet"/>
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
              "primary": "#5bec13",
              "background-light": "#F9F9F7", 
              "background-dark": "#162210",
              "surface-light": "#FFFFFF",
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
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        /* Hide scrollbar for clean Swiss look in horizontal scrolls */
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
<body class="bg-background-light dark:bg-background-dark text-[#131811] dark:text-white font-display transition-colors duration-200 antialiased selection:bg-primary selection:text-[#131811]">
<div class="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl">
<!-- Header / TopAppBar -->
<div class="flex items-center p-6 justify-between sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
<button class="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined text-[#131811] dark:text-white" style="font-size: 24px;">arrow_back</span>
</button>
<div class="flex items-center justify-end gap-2">
<button class="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined text-[#131811] dark:text-white" style="font-size: 24px;">ios_share</span>
</button>
<button class="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined text-[#131811] dark:text-white" style="font-size: 24px;">bookmark_border</span>
</button>
</div>
</div>
<!-- Headline Area -->
<div class="px-6 pt-2 pb-6">
<h1 class="text-[#131811] dark:text-white tracking-[-0.03em] text-[56px] font-bold leading-[1.0] mb-5">Fear</h1>
<p class="text-[#131811]/80 dark:text-white/80 text-lg font-medium leading-relaxed max-w-[95%]">
                Navigating the edge of your comfort zone. Understanding the signals your body is sending.
            </p>
</div>
<!-- Progress Component -->
<div class="px-6 pb-8">
<div class="flex flex-col gap-3 p-5 rounded-2xl bg-surface-light dark:bg-white/5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-black/5 dark:border-white/5">
<div class="flex gap-6 justify-between items-center">
<p class="text-[#131811] dark:text-white text-sm font-bold uppercase tracking-wider">Path in progress</p>
<span class="bg-primary/30 text-[#0f2905] dark:text-primary px-2 py-0.5 rounded text-xs font-bold">20%</span>
</div>
<!-- ProgressBar -->
<div class="h-2.5 rounded-full bg-[#dfe6db] dark:bg-white/20 w-full overflow-hidden">
<div class="h-full rounded-full bg-primary shadow-[0_0_10px_rgba(91,236,19,0.5)]" style="width: 20%;"></div>
</div>
<div class="flex justify-between items-center mt-1">
<p class="text-[#6f8961] dark:text-white/60 text-xs font-medium">Session 2 of 5</p>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-[#6f8961] dark:text-white/60 text-[14px]">lock</span>
<p class="text-[#6f8961] dark:text-white/60 text-xs font-medium">Next: Root Cause</p>
</div>
</div>
</div>
</div>
<!-- Primary CTA -->
<div class="px-6 pb-12">
<button class="w-full flex cursor-pointer items-center justify-between rounded-2xl h-[72px] px-8 bg-primary hover:bg-[#4dd60e] transition-all active:scale-[0.98] shadow-lg shadow-primary/20 group text-[#131811]">
<div class="flex flex-col items-start">
<span class="text-xs font-bold uppercase tracking-wider opacity-60">Up Next</span>
<span class="text-lg font-bold tracking-tight">Start Guided Session</span>
</div>
<div class="size-10 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
<span class="material-symbols-outlined group-hover:translate-x-0.5 transition-transform">play_arrow</span>
</div>
</button>
</div>
<!-- Common Questions Section -->
<div class="flex flex-col gap-5 pb-12 border-t border-black/5 dark:border-white/5 pt-10">
<div class="px-6 flex justify-between items-end">
<h3 class="text-[#131811] dark:text-white text-2xl font-bold tracking-tight">Common questions</h3>
</div>
<div class="flex overflow-x-auto gap-4 px-6 no-scrollbar pb-4 snap-x">
<!-- Question Card 1 -->
<div class="snap-start shrink-0 w-[260px] p-6 rounded-2xl bg-surface-light dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-sm flex flex-col justify-between h-[180px] hover:-translate-y-1 transition-transform duration-300">
<div class="size-10 rounded-full bg-primary/20 flex items-center justify-center text-[#194608] dark:text-primary">
<span class="material-symbols-outlined text-2xl">psychology_alt</span>
</div>
<div>
<p class="text-[#131811] dark:text-white font-bold leading-tight text-xl mb-1">Paralysis</p>
<p class="text-[#131811]/60 dark:text-white/60 text-sm leading-normal">Why do I feel unable to move?</p>
</div>
</div>
<!-- Question Card 2 -->
<div class="snap-start shrink-0 w-[260px] p-6 rounded-2xl bg-surface-light dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-sm flex flex-col justify-between h-[180px] hover:-translate-y-1 transition-transform duration-300">
<div class="size-10 rounded-full bg-primary/20 flex items-center justify-center text-[#194608] dark:text-primary">
<span class="material-symbols-outlined text-2xl">shield</span>
</div>
<div>
<p class="text-[#131811] dark:text-white font-bold leading-tight text-xl mb-1">Bad signal?</p>
<p class="text-[#131811]/60 dark:text-white/60 text-sm leading-normal">Is fear always a warning sign?</p>
</div>
</div>
<!-- Question Card 3 -->
<div class="snap-start shrink-0 w-[260px] p-6 rounded-2xl bg-surface-light dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-sm flex flex-col justify-between h-[180px] hover:-translate-y-1 transition-transform duration-300">
<div class="size-10 rounded-full bg-primary/20 flex items-center justify-center text-[#194608] dark:text-primary">
<span class="material-symbols-outlined text-2xl">emergency</span>
</div>
<div>
<p class="text-[#131811] dark:text-white font-bold leading-tight text-xl mb-1">Panic</p>
<p class="text-[#131811]/60 dark:text-white/60 text-sm leading-normal">How to calm down quickly?</p>
</div>
</div>
</div>
</div>
<!-- Practices List -->
<div class="px-6 pb-12">
<div class="flex items-center justify-between mb-5">
<h3 class="text-[#131811] dark:text-white text-2xl font-bold tracking-tight">Practices</h3>
<span class="text-sm font-semibold text-[#131811]/40 dark:text-white/40">3 items</span>
</div>
<div class="flex flex-col gap-3">
<!-- Item 1 -->
<button class="w-full flex items-center gap-5 p-4 rounded-2xl bg-surface-light dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-transparent hover:shadow-md transition-all text-left group">
<div class="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#F0F2EE] dark:bg-white/10 text-[#131811] dark:text-white group-hover:bg-primary group-hover:text-[#131811] transition-colors">
<span class="material-symbols-outlined">air</span>
</div>
<div class="flex-1 min-w-0">
<h4 class="text-[#131811] dark:text-white font-bold text-lg truncate">4-7-8 Breathing</h4>
<div class="flex items-center gap-2 mt-0.5">
<span class="text-[#131811]/50 dark:text-white/50 text-sm font-medium">Physiological reset</span>
<span class="size-1 rounded-full bg-[#131811]/30 dark:bg-white/30"></span>
<span class="text-[#131811]/50 dark:text-white/50 text-sm font-medium">5 min</span>
</div>
</div>
<span class="material-symbols-outlined text-[#131811]/20 dark:text-white/20 group-hover:text-[#131811] transition-colors">arrow_forward</span>
</button>
<!-- Item 2 -->
<button class="w-full flex items-center gap-5 p-4 rounded-2xl bg-surface-light dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-transparent hover:shadow-md transition-all text-left group">
<div class="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#F0F2EE] dark:bg-white/10 text-[#131811] dark:text-white group-hover:bg-primary group-hover:text-[#131811] transition-colors">
<span class="material-symbols-outlined">search</span>
</div>
<div class="flex-1 min-w-0">
<h4 class="text-[#131811] dark:text-white font-bold text-lg truncate">Root Cause Inquiry</h4>
<div class="flex items-center gap-2 mt-0.5">
<span class="text-[#131811]/50 dark:text-white/50 text-sm font-medium">Journaling</span>
<span class="size-1 rounded-full bg-[#131811]/30 dark:bg-white/30"></span>
<span class="text-[#131811]/50 dark:text-white/50 text-sm font-medium">10 min</span>
</div>
</div>
<span class="material-symbols-outlined text-[#131811]/20 dark:text-white/20 group-hover:text-[#131811] transition-colors">arrow_forward</span>
</button>
<!-- Item 3 -->
<button class="w-full flex items-center gap-5 p-4 rounded-2xl bg-surface-light dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-transparent hover:shadow-md transition-all text-left group">
<div class="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#F0F2EE] dark:bg-white/10 text-[#131811] dark:text-white group-hover:bg-primary group-hover:text-[#131811] transition-colors">
<span class="material-symbols-outlined">footprint</span>
</div>
<div class="flex-1 min-w-0">
<h4 class="text-[#131811] dark:text-white font-bold text-lg truncate">Micro-Action</h4>
<div class="flex items-center gap-2 mt-0.5">
<span class="text-[#131811]/50 dark:text-white/50 text-sm font-medium">Action Step</span>
<span class="size-1 rounded-full bg-[#131811]/30 dark:bg-white/30"></span>
<span class="text-[#131811]/50 dark:text-white/50 text-sm font-medium">2 min</span>
</div>
</div>
<span class="material-symbols-outlined text-[#131811]/20 dark:text-white/20 group-hover:text-[#131811] transition-colors">arrow_forward</span>
</button>
</div>
</div>
<!-- Perspectives (Contrasts) -->
<div class="px-6 pb-24">
<h3 class="text-[#131811] dark:text-white text-2xl font-bold tracking-tight mb-5">Perspectives</h3>
<div class="grid grid-cols-2 gap-4">
<!-- Perspective A (Light) -->
<div class="group relative overflow-hidden rounded-[2rem] bg-[#E8EAE6] dark:bg-white/10 p-6 aspect-[4/5] flex flex-col justify-end transition-all hover:scale-[1.02] cursor-pointer">
<div class="absolute top-0 right-0 p-5 opacity-10 group-hover:opacity-20 transition-opacity rotate-12">
<span class="material-symbols-outlined text-[80px]">block</span>
</div>
<h4 class="text-[#131811] dark:text-white font-bold text-xl mb-2">Resistance</h4>
<p class="text-sm font-medium text-[#131811]/60 dark:text-white/60 leading-normal">Fear as a wall that stops you from moving forward.</p>
</div>
<!-- Perspective B (Dark/Contrast) -->
<div class="group relative overflow-hidden rounded-[2rem] bg-[#1a2118] dark:bg-black p-6 aspect-[4/5] flex flex-col justify-end transition-all hover:scale-[1.02] cursor-pointer shadow-xl">
<div class="absolute top-0 right-0 p-5 opacity-10 group-hover:opacity-20 transition-opacity -rotate-12">
<span class="material-symbols-outlined text-white text-[80px]">open_in_full</span>
</div>
<h4 class="text-white font-bold text-xl mb-2">Expansion</h4>
<p class="text-sm font-medium text-white/60 leading-normal">Fear as a teacher showing you where to grow.</p>
</div>
</div>
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

<!-- Sage App Journal Screen (Light Mode) -->
<!DOCTYPE html>
<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage Journal</title>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#37ec13",
                        "primary-dark": "#2ab90e",
                        "background-light": "#f6f8f6",
                        "background-dark": "#132210",
                        "surface-light": "#ffffff",
                        "surface-dark": "#1e2b1b",
                        "text-main": "#0f172a",
                        "text-muted": "#64748b"
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
                        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                    }
                },
            },
        }
    </script>
<style>
        body {
            min-height: max(884px, 100dvh);
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
<body class="bg-background-light font-display antialiased text-text-main selection:bg-primary selection:text-black">
<div class="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24">
<header class="sticky top-0 z-30 flex flex-col bg-background-light/95 backdrop-blur-md transition-all duration-300">
<div class="flex items-center justify-between px-6 py-4">
<h2 class="text-3xl font-bold tracking-tight text-text-main">Journal</h2>
<div class="flex items-center gap-3">
<button class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:bg-slate-50 border border-slate-100">
<span class="material-symbols-outlined text-slate-600" style="font-size: 20px;">search</span>
</button>
<button class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:bg-slate-50 border border-slate-100">
<span class="material-symbols-outlined text-slate-600" style="font-size: 20px;">calendar_month</span>
</button>
</div>
</div>
<div class="w-full overflow-x-auto hide-scrollbar px-6 pb-4">
<div class="flex items-center justify-between min-w-full gap-2">
<div class="flex flex-col items-center gap-1 min-w-[3rem]">
<span class="text-xs font-medium text-slate-400">MON</span>
<button class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">23</button>
</div>
<div class="flex flex-col items-center gap-1 min-w-[3rem]">
<span class="text-xs font-medium text-slate-400">TUE</span>
<button class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">24</button>
</div>
<div class="flex flex-col items-center gap-1 min-w-[3rem]">
<span class="text-xs font-medium text-slate-400">WED</span>
<div class="relative">
<button class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white shadow-lg shadow-slate-900/20">25</button>
<div class="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary"></div>
</div>
</div>
<div class="flex flex-col items-center gap-1 min-w-[3rem]">
<span class="text-xs font-medium text-slate-400">THU</span>
<button class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">26</button>
</div>
<div class="flex flex-col items-center gap-1 min-w-[3rem]">
<span class="text-xs font-medium text-slate-400">FRI</span>
<button class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">27</button>
</div>
<div class="flex flex-col items-center gap-1 min-w-[3rem]">
<span class="text-xs font-medium text-slate-400">SAT</span>
<button class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">28</button>
</div>
<div class="flex flex-col items-center gap-1 min-w-[3rem]">
<span class="text-xs font-medium text-slate-400">SUN</span>
<button class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">29</button>
</div>
</div>
</div>
</header>
<div class="px-6 py-2">
<div class="flex w-full rounded-xl bg-white p-1 shadow-sm border border-slate-100 mb-6">
<button class="flex-1 rounded-lg bg-slate-900 py-2 text-sm font-medium text-white shadow-sm transition-all">All</button>
<button class="flex-1 rounded-lg py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Journal Only</button>
<button class="flex-1 rounded-lg py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Insights Only</button>
</div>
<div class="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
<button class="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-primary hover:text-primary transition-colors">
<span class="material-symbols-outlined text-[16px]">mood</span>
                Mood
            </button>
<button class="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-primary hover:text-primary transition-colors">
<span class="material-symbols-outlined text-[16px]">local_florist</span>
                Gratitude
            </button>
<button class="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-primary hover:text-primary transition-colors">
<span class="material-symbols-outlined text-[16px]">psychology</span>
                Reflection
            </button>
<button class="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-primary hover:text-primary transition-colors">
<span class="material-symbols-outlined text-[16px]">star</span>
                Highlights
            </button>
</div>
</div>
<div class="px-6 py-4">
<div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm border border-slate-100 text-center">
<div class="mb-3 flex justify-center">
<div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
<span class="material-symbols-outlined">edit_note</span>
</div>
</div>
<p class="text-sm font-medium text-slate-500">Your journal starts with one honest sentence.</p>
</div>
</div>
<div class="flex flex-col gap-4 px-6 pb-24">
<div class="flex items-center justify-between pt-2">
<h3 class="text-sm font-bold uppercase tracking-wider text-slate-400">Today</h3>
<span class="text-xs font-medium text-slate-400">Sept 25</span>
</div>
<div class="group relative flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lg border border-transparent hover:border-slate-100">
<div class="flex items-start justify-between">
<div class="flex items-center gap-3">
<div class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-500">
<span class="material-symbols-outlined">sunny</span>
</div>
<div>
<h4 class="font-bold text-slate-900">Morning Clarity</h4>
<span class="text-xs text-slate-400">9:30 AM • Reflection</span>
</div>
</div>
<button class="text-slate-300 hover:text-slate-600">
<span class="material-symbols-outlined text-[20px]">more_horiz</span>
</button>
</div>
<p class="text-sm leading-relaxed text-slate-600 line-clamp-3">
                Woke up feeling surprisingly light. The meditation session last night really shifted something. I'm noticing that when I let go of the need to control the outcome...
            </p>
<div class="mt-1 flex gap-2">
<span class="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500">#mindfulness</span>
<span class="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500">#morning</span>
</div>
</div>
<div class="group relative flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lg border border-transparent hover:border-slate-100">
<div class="flex items-start justify-between">
<div class="flex items-center gap-3">
<div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-500">
<span class="material-symbols-outlined">water_drop</span>
</div>
<div>
<h4 class="font-bold text-slate-900">Afternoon Dip</h4>
<span class="text-xs text-slate-400">2:15 PM • Mood Check</span>
</div>
</div>
<button class="text-slate-300 hover:text-slate-600">
<span class="material-symbols-outlined text-[20px]">more_horiz</span>
</button>
</div>
<p class="text-sm leading-relaxed text-slate-600 line-clamp-3">
                Energy levels crashed a bit after lunch. Need to remember to hydrate more. It's okay to feel slow sometimes. Taking a 10 minute break to reset.
            </p>
</div>
<div class="flex items-center justify-between pt-4">
<h3 class="text-sm font-bold uppercase tracking-wider text-slate-400">Yesterday</h3>
<span class="text-xs font-medium text-slate-400">Sept 24</span>
</div>
<div class="group relative flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lg border border-transparent hover:border-slate-100">
<div class="flex items-start justify-between">
<div class="flex items-center gap-3">
<div class="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 text-purple-500">
<span class="material-symbols-outlined">bedtime</span>
</div>
<div>
<h4 class="font-bold text-slate-900">Evening Wind Down</h4>
<span class="text-xs text-slate-400">10:45 PM • Gratitude</span>
</div>
</div>
<button class="text-slate-300 hover:text-slate-600">
<span class="material-symbols-outlined text-[20px]">more_horiz</span>
</button>
</div>
<p class="text-sm leading-relaxed text-slate-600 line-clamp-3">
                Three things I'm grateful for today: 1. The warm coffee this morning. 2. A call from Sarah. 3. Finishing that book.
            </p>
</div>
</div>
<div class="fixed bottom-24 right-6 z-40">
<button class="group flex h-14 items-center gap-2 rounded-full bg-slate-900 pl-5 pr-6 shadow-xl shadow-slate-900/20 transition-all hover:scale-105 hover:bg-black active:scale-95">
<span class="material-symbols-outlined text-white">edit_square</span>
<span class="font-semibold text-white">New Entry</span>
</button>
</div>
<nav class="fixed bottom-0 left-0 z-50 w-full border-t border-slate-200 bg-white/90 backdrop-blur-lg pb-safe">
<div class="flex h-20 items-start justify-around pt-4">
<button class="group flex flex-col items-center gap-1">
<span class="material-symbols-outlined text-slate-400 group-hover:text-slate-900 transition-colors">home</span>
<span class="text-[10px] font-medium text-slate-400 group-hover:text-slate-900 transition-colors">Home</span>
</button>
<button class="group flex flex-col items-center gap-1">
<span class="material-symbols-outlined text-slate-900 fill-current">auto_stories</span>
<span class="text-[10px] font-medium text-slate-900">Journal</span>
</button>
<button class="group flex flex-col items-center gap-1">
<span class="material-symbols-outlined text-slate-400 group-hover:text-slate-900 transition-colors">insights</span>
<span class="text-[10px] font-medium text-slate-400 group-hover:text-slate-900 transition-colors">Insights</span>
</button>
<button class="group flex flex-col items-center gap-1">
<span class="material-symbols-outlined text-slate-400 group-hover:text-slate-900 transition-colors">person</span>
<span class="text-[10px] font-medium text-slate-400 group-hover:text-slate-900 transition-colors">Profile</span>
</button>
</div>
</nav>
<style>
        .pb-safe {
            padding-bottom: env(safe-area-inset-bottom);
        }
    </style>
</div>

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

<!-- Sage App Settings Screen (Light Mode)  -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage Settings</title>
<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
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
                        "background-light": "#F9FAF8",
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
        /* Custom styles for range slider to match design */
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #37ec13;
            cursor: pointer;
            margin-top: -8px; 
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        input[type=range]::-webkit-slider-runnable-track {
            width: 100%;
            height: 4px;
            cursor: pointer;
            background: #e5e7eb;
            border-radius: 2px;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-display text-[#121811] dark:text-white transition-colors duration-200">
<!-- Main App Container -->
<div class="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-background-light dark:bg-background-dark">
<!-- Top Bar -->
<div class="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
<button class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined text-[24px]">arrow_back</span>
</button>
</div>
<!-- Page Title -->
<div class="px-6 pb-6 pt-2">
<h1 class="text-3xl font-bold tracking-tight text-[#121811] dark:text-white">Settings</h1>
</div>
<!-- Scrollable Content Area -->
<div class="flex-1 flex flex-col gap-8 px-4 pb-12">
<!-- Section: Profile -->
<section>
<h3 class="ml-4 mb-2 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Profile</h3>
<div class="bg-white dark:bg-[#1A2618] rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
<!-- Tone Preference -->
<div class="p-4 border-b border-gray-100 dark:border-gray-800">
<label class="block text-sm font-medium mb-3 text-[#121811] dark:text-white">Tone Preference</label>
<div class="flex h-10 w-full items-center justify-center rounded-xl bg-[#f1f4f0] dark:bg-white/5 p-1">
<label class="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg has-[:checked]:bg-white dark:has-[:checked]:bg-[#2C3A29] has-[:checked]:shadow-sm transition-all text-gray-500 has-[:checked]:text-[#121811] dark:has-[:checked]:text-primary text-sm font-medium">
<span class="truncate">Gentle</span>
<input checked="" class="hidden" name="tone" type="radio" value="Gentle"/>
</label>
<label class="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg has-[:checked]:bg-white dark:has-[:checked]:bg-[#2C3A29] has-[:checked]:shadow-sm transition-all text-gray-500 has-[:checked]:text-[#121811] dark:has-[:checked]:text-primary text-sm font-medium">
<span class="truncate">Direct</span>
<input class="hidden" name="tone" type="radio" value="Direct"/>
</label>
</div>
</div>
<!-- Narration Toggle -->
<div class="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 min-h-[56px]">
<div class="flex items-center gap-3">
<div class="flex items-center justify-center size-8 rounded-full bg-[#f1f4f0] dark:bg-white/10 text-[#121811] dark:text-white shrink-0">
<span class="material-symbols-outlined text-[18px]">graphic_eq</span>
</div>
<span class="text-base font-normal">Narration</span>
</div>
<label class="relative inline-flex items-center cursor-pointer">
<input checked="" class="sr-only peer" type="checkbox" value=""/>
<div class="w-[51px] h-[31px] bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[27px] after:w-[27px] after:shadow-sm after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<!-- Voice Select -->
<div class="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 min-h-[56px]">
<div class="flex items-center gap-3">
<div class="flex items-center justify-center size-8 rounded-full bg-[#f1f4f0] dark:bg-white/10 text-[#121811] dark:text-white shrink-0">
<span class="material-symbols-outlined text-[18px]">record_voice_over</span>
</div>
<span class="text-base font-normal">Voice</span>
</div>
<div class="relative group">
<select class="appearance-none bg-transparent pl-4 pr-7 py-2 text-right text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 focus:outline-none cursor-pointer transition-colors text-base">
<option>Echo</option>
<option selected="">Alloy</option>
<option>Fable</option>
</select>
<span class="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">chevron_right</span>
</div>
</div>
<!-- Speed Slider -->
<div class="p-4">
<div class="flex justify-between mb-3 items-center">
<div class="flex items-center gap-3">
<div class="flex items-center justify-center size-8 rounded-full bg-[#f1f4f0] dark:bg-white/10 text-[#121811] dark:text-white shrink-0">
<span class="material-symbols-outlined text-[18px]">speed</span>
</div>
<span class="text-base font-normal">Speed</span>
</div>
<span class="text-sm font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md">1.0x</span>
</div>
<input class="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" max="2.0" min="0.5" step="0.1" type="range" value="1.0"/>
<div class="flex justify-between mt-2 text-xs text-gray-400 px-1">
<span>0.5x</span>
<span>2.0x</span>
</div>
</div>
</div>
</section>
<!-- Section: Privacy -->
<section>
<h3 class="ml-4 mb-2 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Privacy</h3>
<div class="bg-white dark:bg-[#1A2618] rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
<!-- Local Only -->
<div class="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 min-h-[56px]">
<span class="text-base font-normal">Local-only Storage</span>
<label class="relative inline-flex items-center cursor-pointer">
<input checked="" class="sr-only peer" type="checkbox" value=""/>
<div class="w-[51px] h-[31px] bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[27px] after:w-[27px] after:shadow-sm after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<!-- Cloud Sync -->
<div class="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 min-h-[56px]">
<span class="text-base font-normal">Cloud Sync</span>
<label class="relative inline-flex items-center cursor-pointer">
<input class="sr-only peer" type="checkbox" value=""/>
<div class="w-[51px] h-[31px] bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[27px] after:w-[27px] after:shadow-sm after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<!-- Delete Data -->
<button class="w-full flex items-center p-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
<span class="text-base font-normal">Delete all data</span>
</button>
</div>
</section>
<!-- Section: Safety -->
<section>
<h3 class="ml-4 mb-2 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Safety</h3>
<div class="bg-white dark:bg-[#1A2618] rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
<!-- Content Limits -->
<div class="p-4 border-b border-gray-100 dark:border-gray-800">
<div class="flex justify-between items-center mb-3">
<label class="text-base font-normal text-[#121811] dark:text-white">Content Limits</label>
<span class="material-symbols-outlined text-gray-400 text-lg">info</span>
</div>
<div class="flex h-10 w-full items-center justify-center rounded-xl bg-[#f1f4f0] dark:bg-white/5 p-1">
<label class="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg has-[:checked]:bg-white dark:has-[:checked]:bg-[#2C3A29] has-[:checked]:shadow-sm transition-all text-gray-500 has-[:checked]:text-[#121811] dark:has-[:checked]:text-primary text-sm font-medium">
<span class="truncate">Strict</span>
<input checked="" class="hidden" name="limits" type="radio" value="Strict"/>
</label>
<label class="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg has-[:checked]:bg-white dark:has-[:checked]:bg-[#2C3A29] has-[:checked]:shadow-sm transition-all text-gray-500 has-[:checked]:text-[#121811] dark:has-[:checked]:text-primary text-sm font-medium">
<span class="truncate">Open</span>
<input class="hidden" name="limits" type="radio" value="Open"/>
</label>
</div>
</div>
<!-- Crisis Help -->
<a class="flex items-center justify-between p-4 group hover:bg-red-50/50 transition-colors" href="#">
<div class="flex items-center gap-3">
<div class="flex items-center justify-center size-8 rounded-full bg-red-50 text-red-500 shrink-0">
<span class="material-symbols-outlined text-[18px]">support</span>
</div>
<span class="text-base font-normal text-red-500 group-hover:text-red-600">Crisis Help Resources</span>
</div>
<span class="material-symbols-outlined text-gray-300 group-hover:text-red-400 text-[20px]">open_in_new</span>
</a>
</div>
</section>
<!-- Section: Notifications -->
<section>
<h3 class="ml-4 mb-2 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Notifications</h3>
<div class="bg-white dark:bg-[#1A2618] rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
<!-- Daily Reminder Toggle -->
<div class="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 min-h-[56px]">
<span class="text-base font-normal">Daily Reminder</span>
<label class="relative inline-flex items-center cursor-pointer">
<input checked="" class="sr-only peer" type="checkbox" value=""/>
<div class="w-[51px] h-[31px] bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[27px] after:w-[27px] after:shadow-sm after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<!-- Time Picker Simulation -->
<button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
<span class="text-base font-normal">Time</span>
<div class="bg-[#f1f4f0] dark:bg-white/10 px-3 py-1.5 rounded-lg text-sm font-medium text-[#121811] dark:text-white">
                            08:00 AM
                        </div>
</button>
</div>
</section>
<!-- Section: Support Sage -->
<section>
<div class="bg-white dark:bg-[#1A2618] rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-5 relative overflow-hidden">
<div class="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
<div class="flex items-start justify-between mb-5 relative z-10">
<div>
<h3 class="text-lg font-bold">Support Sage</h3>
<p class="text-sm text-gray-500 mt-1">Help us keep the lights on.</p>
</div>
<div class="flex items-center justify-center size-10 bg-primary/10 rounded-full text-primary">
<span class="material-symbols-outlined text-[24px]">favorite</span>
</div>
</div>
<div class="grid grid-cols-3 gap-3 relative z-10">
<button class="flex flex-col items-center justify-center py-3 px-2 rounded-xl border border-gray-100 dark:border-gray-800 bg-[#f9faf8] dark:bg-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all group">
<span class="text-[10px] font-bold uppercase text-gray-400 mb-1 tracking-wider">Small</span>
<span class="font-bold text-[#121811] dark:text-white">CHF 2</span>
</button>
<!-- Selected Option -->
<button class="flex flex-col items-center justify-center py-3 px-2 rounded-xl border-2 border-primary bg-primary shadow-sm shadow-primary/20 transform scale-105 transition-all relative">
<div class="absolute -top-2 bg-black/80 text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Popular</div>
<span class="text-[10px] font-bold uppercase text-[#121811]/60 mb-1 tracking-wider">Medium</span>
<span class="font-bold text-[#121811]">CHF 5</span>
</button>
<button class="flex flex-col items-center justify-center py-3 px-2 rounded-xl border border-gray-100 dark:border-gray-800 bg-[#f9faf8] dark:bg-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all group">
<span class="text-[10px] font-bold uppercase text-gray-400 mb-1 tracking-wider">Large</span>
<span class="font-bold text-[#121811] dark:text-white">CHF 10</span>
</button>
</div>
</div>
</section>
<!-- About / Footer -->
<section class="mt-4 px-4 text-center">
<p class="text-sm font-medium text-gray-500 mb-2 italic serif">"To guide you inward, towards clarity."</p>
<div class="flex items-center justify-center gap-2">
<span class="size-1.5 rounded-full bg-primary"></span>
<p class="text-xs text-gray-400">Sage v2.4.0 (1042)</p>
</div>
</section>
<!-- Spacer for bottom safe area -->
<div class="h-6"></div>
</div>
</div>
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

<!-- Sage App Donation Screen (Light Mode)  -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage App Donation Screen</title>
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
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
                        "text-main": "#121811",
                        "text-muted": "#6b7280",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
                    spacing: {
                        '18': '4.5rem',
                    }
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        /* Custom scrollbar hiding for cleaner look */
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
<body class="font-display bg-background-light dark:bg-background-dark antialiased selection:bg-primary selection:text-black">
<div class="relative flex min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark">
<!-- TopAppBar -->
<div class="flex items-center justify-between p-6 pb-2">
<button class="text-text-main dark:text-white flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined text-[28px]">close</span>
</button>
<!-- Optional subtle brand mark or empty -->
<div class="w-10"></div>
</div>
<!-- Scrollable Content Area -->
<div class="flex-1 flex flex-col px-6 overflow-y-auto no-scrollbar pb-32">
<!-- HeadlineText -->
<div class="pt-8 pb-4 text-center">
<h2 class="text-text-main dark:text-white tracking-tight text-[32px] font-bold leading-[1.1] mb-4">
                    Keep it free<br/>for everyone.
                </h2>
<!-- BodyText -->
<p class="text-text-muted dark:text-gray-400 text-[17px] font-normal leading-relaxed max-w-[280px] mx-auto">
                    Your support helps us maintain independence and quality content.
                </p>
</div>
<!-- Spacer -->
<div class="h-8"></div>
<!-- ListItems (Transparency List) -->
<div class="flex flex-col gap-3">
<!-- Item 1 -->
<div class="flex items-center gap-4 bg-white dark:bg-white/5 px-5 py-4 rounded-2xl border border-transparent shadow-sm dark:border-white/5">
<div class="text-text-main dark:text-white flex items-center justify-center rounded-xl bg-background-light dark:bg-white/10 shrink-0 size-12">
<span class="material-symbols-outlined text-[24px]">eco</span>
</div>
<div class="flex flex-col">
<p class="text-text-main dark:text-white text-[15px] font-medium leading-tight">Sustainable hosting</p>
<p class="text-text-muted dark:text-gray-400 text-xs mt-0.5">Carbon-neutral servers</p>
</div>
</div>
<!-- Item 2 -->
<div class="flex items-center gap-4 bg-white dark:bg-white/5 px-5 py-4 rounded-2xl border border-transparent shadow-sm dark:border-white/5">
<div class="text-text-main dark:text-white flex items-center justify-center rounded-xl bg-background-light dark:bg-white/10 shrink-0 size-12">
<span class="material-symbols-outlined text-[24px]">auto_awesome</span>
</div>
<div class="flex flex-col">
<p class="text-text-main dark:text-white text-[15px] font-medium leading-tight">Thoughtful curation</p>
<p class="text-text-muted dark:text-gray-400 text-xs mt-0.5">Human-led discovery</p>
</div>
</div>
<!-- Item 3 -->
<div class="flex items-center gap-4 bg-white dark:bg-white/5 px-5 py-4 rounded-2xl border border-transparent shadow-sm dark:border-white/5">
<div class="text-text-main dark:text-white flex items-center justify-center rounded-xl bg-background-light dark:bg-white/10 shrink-0 size-12">
<span class="material-symbols-outlined text-[24px]">bolt</span>
</div>
<div class="flex flex-col">
<p class="text-text-main dark:text-white text-[15px] font-medium leading-tight">Ad-free experience</p>
<p class="text-text-muted dark:text-gray-400 text-xs mt-0.5">Zero tracking or popups</p>
</div>
</div>
</div>
<!-- Spacer -->
<div class="h-10"></div>
<!-- Tipping Options Header -->
<div class="flex justify-between items-end mb-4 px-1">
<span class="text-sm font-semibold text-text-main dark:text-white uppercase tracking-wider opacity-60">Select Amount</span>
<span class="text-xs text-text-muted dark:text-gray-500">One-time</span>
</div>
<!-- Tipping Chips Grid -->
<div class="grid grid-cols-4 gap-3">
<!-- Option 1 -->
<button class="group flex flex-col items-center justify-center h-14 rounded-full border border-gray-200 bg-white hover:border-primary/50 focus:bg-primary focus:border-primary focus:text-black transition-all duration-200 dark:bg-white/5 dark:border-white/10 dark:text-white dark:focus:bg-primary dark:focus:text-black">
<span class="text-sm font-semibold">2</span>
<span class="text-[10px] opacity-60 group-focus:opacity-80">CHF</span>
</button>
<!-- Option 2 (Selected State Simulation) -->
<button class="relative flex flex-col items-center justify-center h-14 rounded-full border border-primary bg-primary text-black shadow-lg shadow-primary/20 transition-all duration-200 scale-105">
<span class="text-sm font-bold">5</span>
<span class="text-[10px] opacity-80 font-medium">CHF</span>
<!-- Checkmark badge -->
<div class="absolute -top-1 -right-1 bg-white dark:bg-black rounded-full p-[2px]">
<span class="material-symbols-outlined text-[14px] text-primary block">check_circle</span>
</div>
</button>
<!-- Option 3 -->
<button class="group flex flex-col items-center justify-center h-14 rounded-full border border-gray-200 bg-white hover:border-primary/50 focus:bg-primary focus:border-primary focus:text-black transition-all duration-200 dark:bg-white/5 dark:border-white/10 dark:text-white dark:focus:bg-primary dark:focus:text-black">
<span class="text-sm font-semibold">10</span>
<span class="text-[10px] opacity-60 group-focus:opacity-80">CHF</span>
</button>
<!-- Custom -->
<button class="group flex flex-col items-center justify-center h-14 rounded-full border border-gray-200 bg-white hover:border-primary/50 focus:bg-primary focus:border-primary focus:text-black transition-all duration-200 dark:bg-white/5 dark:border-white/10 dark:text-white dark:focus:bg-primary dark:focus:text-black">
<span class="material-symbols-outlined text-[20px] mb-[-2px]">edit</span>
</button>
</div>
</div>
<!-- Sticky Bottom Action -->
<div class="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background-light via-background-light to-transparent pt-12 dark:from-background-dark dark:via-background-dark">
<button class="w-full flex items-center justify-between px-2 bg-text-main dark:bg-white text-white dark:text-black h-16 rounded-full shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200">
<div class="flex items-center justify-center w-12 h-12 bg-white/10 dark:bg-black/10 rounded-full ml-1">
<span class="material-symbols-outlined">fingerprint</span>
</div>
<span class="text-[17px] font-semibold tracking-wide">Donate CHF 5</span>
<div class="flex items-center justify-center w-12 h-12 rounded-full mr-1">
<span class="material-symbols-outlined">arrow_forward</span>
</div>
</button>
<p class="text-center text-xs text-text-muted dark:text-gray-500 mt-4">
                Secure payment via Apple Pay. <br/> No recurring charges.
            </p>
</div>
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

<!-- Sage App Donation Thank You (Light Mode)  -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage App Donation Thank You</title>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
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
              "sage-dark": "#121811",
              "sage-gray": "#688961",
            },
            fontFamily: {
              "display": ["Inter", "Noto Sans", "sans-serif"]
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
        body { font-family: 'Inter', 'Noto Sans', sans-serif; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48; }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark min-h-screen flex flex-col relative overflow-hidden text-sage-dark dark:text-white antialiased selection:bg-primary/40 selection:text-sage-dark">
<!-- Decorative Ambient Background -->
<div class="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" data-alt="Abstract soft green gradient blob in the top right corner"></div>
<div class="fixed bottom-0 left-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" data-alt="Abstract soft green gradient blob in the bottom left corner"></div>
<!-- Main Content Area -->
<main class="flex-1 flex flex-col justify-center px-6 py-10 max-w-lg mx-auto w-full z-10">
<!-- Status Indicator -->
<div class="flex flex-col gap-8 mb-4">
<!-- Icon Container -->
<div class="w-20 h-20 rounded-2xl bg-white dark:bg-white/5 shadow-sm border border-black/5 dark:border-white/10 flex items-center justify-center">
<span class="material-symbols-outlined text-[40px] text-primary">spa</span>
</div>
<!-- Hero Text Block -->
<div class="flex flex-col gap-6">
<h1 class="text-sage-dark dark:text-white text-[40px] font-bold leading-[1.1] tracking-[-0.03em]">
                    Your generosity helps us grow.
                </h1>
<p class="text-sage-dark/80 dark:text-white/80 text-lg font-normal leading-relaxed max-w-[90%]">
                    Thank you for supporting Sage. Your contribution keeps our journey of self-exploration accessible to everyone.
                </p>
</div>
</div>
<!-- Receipt / Meta Info -->
<div class="mt-8 pt-8 border-t border-black/5 dark:border-white/10">
<div class="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-sage-gray dark:text-white/60">
<div class="flex items-center gap-2 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-full">
<span class="material-symbols-outlined text-[16px]">receipt</span>
<span class="font-mono tracking-tight">ID: #839201</span>
</div>
<a class="group flex items-center gap-1 font-medium hover:text-primary transition-colors underline decoration-black/20 dark:decoration-white/20 underline-offset-4 hover:decoration-primary" href="#">
                    View Receipt
                    <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_outward</span>
</a>
</div>
</div>
</main>
<!-- Bottom CTA -->
<footer class="px-6 py-6 pb-10 w-full max-w-lg mx-auto z-10">
<button class="w-full relative overflow-hidden cursor-pointer h-14 rounded-full bg-primary hover:bg-[#32d611] active:scale-[0.99] transition-all duration-200 flex items-center justify-center shadow-lg shadow-primary/20">
<span class="relative z-10 text-sage-dark text-base font-bold tracking-[0.015em]">Return to Home</span>
</button>
</footer>
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

<!-- Home Empty State (Light Mode) - Recent Insights -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage - Home Empty State</title>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Google Fonts: Inter -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
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
                        "primary": "#37ec13",
                        "background-light": "#f6f8f6",
                        "background-dark": "#132210",
                        "surface-light": "#ffffff",
                        "surface-dark": "#1c2e18",
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
<body class="font-display bg-background-light dark:bg-background-dark text-[#121811] dark:text-white antialiased transition-colors duration-200">
<div class="relative flex h-auto min-h-screen w-full flex-col overflow-hidden">
<!-- TopAppBar -->
<header class="sticky top-0 z-50 flex items-center justify-between px-6 py-5 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
<!-- Logo (Left Aligned for Swiss feel) -->
<div class="flex items-center gap-2">
<h1 class="text-2xl font-black tracking-tighter text-[#121811] dark:text-white">Sage</h1>
<div class="h-2 w-2 rounded-full bg-primary mt-1"></div>
</div>
<!-- Right Action (Profile/Settings) -->
<button class="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined text-[#121811] dark:text-white" style="font-size: 24px;">settings</span>
</button>
</header>
<!-- Main Content (Empty State) -->
<main class="flex-1 flex flex-col px-6 pt-4 pb-28">
<!-- Swiss Design Element: Decorative Grid Line -->
<div class="w-full h-px bg-neutral-200 dark:bg-white/10 mb-8"></div>
<div class="flex flex-col gap-8 w-full max-w-md mx-auto sm:mx-0">
<!-- Hero Visual -->
<!-- Using a placeholder that represents abstract geometric forms suitable for Swiss design -->
<div class="relative w-full aspect-square max-w-[320px] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-surface-dark group/image">
<div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&amp;w=1000&amp;auto=format&amp;fit=crop')] bg-cover bg-center opacity-90 dark:opacity-80 transition-transform duration-700 group-hover/image:scale-105" data-alt="Abstract flowing geometric liquid shapes in neutral tones">
</div>
<!-- Overlay for text readability if needed, though mostly relying on whitespace -->
<div class="absolute inset-0 bg-gradient-to-t from-background-light/20 to-transparent dark:from-background-dark/20"></div>
</div>
<!-- Typography Block -->
<div class="flex flex-col gap-4 items-start text-left">
<h2 class="text-4xl font-bold tracking-tight leading-[1.1] text-[#121811] dark:text-white">
                        A fresh<br/>start.
                    </h2>
<p class="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-[320px]">
                        Your insights will appear here when you start exploring. Let's begin!
                    </p>
</div>
<!-- Primary Action Button -->
<button class="group flex w-full sm:w-auto min-w-[160px] cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-full h-14 px-8 bg-primary text-[#121811] text-base font-bold leading-normal tracking-[0.015em] transition-transform active:scale-95 hover:shadow-lg hover:shadow-primary/20 mt-2">
<span>Start Exploring</span>
<span class="material-symbols-outlined transition-transform group-hover:translate-x-1" style="font-size: 20px;">arrow_forward</span>
</button>
</div>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 right-0 z-40 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-xl border-t border-neutral-100 dark:border-white/5 px-6 pb-8 pt-4">
<div class="flex justify-between items-center max-w-md mx-auto">
<!-- Home (Active) -->
<a class="flex flex-col items-center gap-1 min-w-[64px] group" href="#">
<div class="flex h-8 w-14 items-center justify-center rounded-full bg-primary/20 dark:bg-primary/30 transition-colors">
<span class="material-symbols-outlined text-[#121811] dark:text-white filled" style="font-variation-settings: 'FILL' 1;">home</span>
</div>
<span class="text-xs font-semibold text-[#121811] dark:text-white">Home</span>
</a>
<!-- Journal -->
<a class="flex flex-col items-center gap-1 min-w-[64px] group text-neutral-500 hover:text-[#121811] dark:text-neutral-400 dark:hover:text-white transition-colors" href="#">
<div class="flex h-8 w-14 items-center justify-center rounded-full group-hover:bg-neutral-100 dark:group-hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined" style="font-size: 24px;">book_2</span>
</div>
<span class="text-xs font-medium">Journal</span>
</a>
<!-- Explore -->
<a class="flex flex-col items-center gap-1 min-w-[64px] group text-neutral-500 hover:text-[#121811] dark:text-neutral-400 dark:hover:text-white transition-colors" href="#">
<div class="flex h-8 w-14 items-center justify-center rounded-full group-hover:bg-neutral-100 dark:group-hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined" style="font-size: 24px;">explore</span>
</div>
<span class="text-xs font-medium">Explore</span>
</a>
<!-- Profile -->
<a class="flex flex-col items-center gap-1 min-w-[64px] group text-neutral-500 hover:text-[#121811] dark:text-neutral-400 dark:hover:text-white transition-colors" href="#">
<div class="flex h-8 w-14 items-center justify-center rounded-full group-hover:bg-neutral-100 dark:group-hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined" style="font-size: 24px;">person</span>
</div>
<span class="text-xs font-medium">Profile</span>
</a>
</div>
</nav>
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

<!-- Explore Empty State (Light Mode) - No Results -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage - Explore Empty State</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
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
                        "background-light": "#F9F9F7", 
                        "background-dark": "#132210",
                        "surface-light": "#ffffff",
                        "surface-dark": "#1e2b1b",
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
<body class="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-gray-100 min-h-screen flex flex-col overflow-hidden">
<!-- Top Status Bar Area (simulated) -->
<div class="w-full h-12 bg-background-light dark:bg-background-dark shrink-0"></div>
<!-- Main Content Area -->
<div class="flex-1 flex flex-col relative w-full max-w-md mx-auto h-full overflow-y-auto no-scrollbar pb-24">
<!-- Header -->
<header class="flex items-center px-6 pb-4 justify-between bg-background-light dark:bg-background-dark sticky top-0 z-10">
<button class="flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
<span class="material-symbols-outlined text-gray-900 dark:text-white" style="font-size: 28px;">arrow_back</span>
</button>
<h1 class="text-gray-900 dark:text-white text-xl font-bold tracking-tight">Explore</h1>
<div class="w-10"></div> <!-- Spacer for optical centering -->
</header>
<!-- Search Bar -->
<div class="px-6 py-2">
<div class="relative w-full">
<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-gray-400 dark:text-gray-500" style="font-size: 20px;">search</span>
</div>
<input class="block w-full pl-11 pr-12 py-3.5 bg-white dark:bg-surface-dark border-none rounded-full text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none shadow-sm text-base font-medium" type="text" value="Astral Projection"/>
<div class="absolute inset-y-0 right-0 pr-2 flex items-center">
<button class="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-gray-600 dark:text-gray-500">
<span class="material-symbols-outlined filled" style="font-size: 20px; font-variation-settings: 'FILL' 1;">cancel</span>
</button>
</div>
</div>
</div>
<!-- Empty State Container -->
<div class="flex flex-col items-center justify-center flex-1 px-8 py-12 text-center">
<!-- Abstract Illustration Area -->
<div class="relative w-48 h-48 mb-8 flex items-center justify-center">
<!-- Decorative abstract circles -->
<div class="absolute inset-0 border border-primary/20 rounded-full scale-100 animate-pulse"></div>
<div class="absolute inset-4 border border-primary/30 rounded-full scale-90"></div>
<div class="absolute inset-10 bg-primary/5 rounded-full scale-75 blur-xl"></div>
<!-- Icon -->
<span class="material-symbols-outlined text-gray-900 dark:text-white relative z-10" style="font-size: 64px; font-weight: 200;">spa</span>
</div>
<!-- Main Message -->
<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">Nothing quite like that</h2>
<p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-[280px] mb-8">
                We couldn't find any explorations matching your search. Perhaps try a different keyword?
            </p>
<!-- Primary Action -->
<button class="bg-primary hover:bg-primary/90 text-background-dark dark:text-background-dark font-bold py-3.5 px-8 rounded-full transition-all active:scale-95 shadow-lg shadow-primary/20 w-full max-w-[200px] mb-12">
                Clear Search
            </button>
<!-- Suggestions Section -->
<div class="w-full border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col items-center">
<h3 class="text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase tracking-widest mb-4">Or try these topics</h3>
<div class="flex flex-wrap gap-3 justify-center">
<button class="group flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-700 rounded-full hover:border-primary/50 hover:bg-primary/5 transition-all">
<span class="material-symbols-outlined text-gray-400 group-hover:text-primary text-sm">center_focus_strong</span>
<span class="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">Focus</span>
</button>
<button class="group flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-700 rounded-full hover:border-primary/50 hover:bg-primary/5 transition-all">
<span class="material-symbols-outlined text-gray-400 group-hover:text-primary text-sm">bedtime</span>
<span class="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">Sleep</span>
</button>
<button class="group flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-700 rounded-full hover:border-primary/50 hover:bg-primary/5 transition-all">
<span class="material-symbols-outlined text-gray-400 group-hover:text-primary text-sm">trending_up</span>
<span class="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">Growth</span>
</button>
</div>
</div>
</div>
</div>
<!-- Bottom Navigation Bar (Floating Style) -->
<div class="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-surface-dark/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 pb-safe z-50">
<div class="flex justify-around items-center h-16 max-w-md mx-auto px-2">
<button class="flex flex-col items-center justify-center w-16 h-full gap-1 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
<span class="material-symbols-outlined" style="font-size: 24px;">home</span>
<span class="text-[10px] font-medium">Home</span>
</button>
<button class="flex flex-col items-center justify-center w-16 h-full gap-1 text-gray-900 dark:text-white">
<div class="bg-primary/20 dark:bg-primary/20 px-4 py-1 rounded-full flex items-center justify-center">
<span class="material-symbols-outlined text-gray-900 dark:text-primary filled" style="font-size: 24px; font-variation-settings: 'FILL' 1;">explore</span>
</div>
<span class="text-[10px] font-bold text-gray-900 dark:text-primary">Explore</span>
</button>
<button class="flex flex-col items-center justify-center w-16 h-full gap-1 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
<span class="material-symbols-outlined" style="font-size: 24px;">book_2</span>
<span class="text-[10px] font-medium">Journal</span>
</button>
<button class="flex flex-col items-center justify-center w-16 h-full gap-1 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
<span class="material-symbols-outlined" style="font-size: 24px;">person</span>
<span class="text-[10px] font-medium">Profile</span>
</button>
</div>
<!-- Safe area spacing for iOS home indicator -->
<div class="h-1 w-full"></div>
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

<!-- Journal Empty State (Light Mode) - No Entries -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage - Journal Empty State</title>
<!-- Fonts and Icons -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
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
<body class="font-display bg-background-light dark:bg-background-dark text-[#121811] dark:text-white antialiased selection:bg-primary selection:text-[#121811]">
<div class="relative flex h-full min-h-screen w-full flex-col overflow-hidden pb-24 group/design-root">
<!-- Header Section -->
<header class="pt-14 pb-2 px-6">
<h1 class="text-[#121811] dark:text-white tracking-tighter text-[42px] font-bold leading-none text-left">
                Journal
            </h1>
</header>
<!-- Main Content Area -->
<main class="flex-1 flex flex-col w-full px-6 pt-8">
<!-- Abstract Illustration Container -->
<!-- Swiss Design: Asymmetry created by centering the visual weight of the image but keeping alignment left for text -->
<div class="w-full flex justify-center py-8">
<div class="relative w-64 h-64 @container">
<!-- Abstract Line Art / Soft Shape Placeholder -->
<div class="w-full h-full rounded-full overflow-hidden relative z-10">
<div class="w-full h-full bg-center bg-no-repeat bg-cover opacity-90 mix-blend-multiply dark:mix-blend-normal transform scale-110" data-alt="Minimalist abstract beige and white organic shapes resembling folded paper" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA_PhWRgbp3Ae8kzRFQGgyO9zyc5n48uVak-KoaU6dQjIl6QSRBaIlqxLHH_ss21fKVNWgjEsHd8uO6Ex-jssAETnFWKpiCa6vsUh0TlvBiJ2WD9HRWVL4I5qaKUXSh5eHkg2eYhBYMrKxefMxXKuzbHrDO15qfCFyqzCexeXWtQSGCSjBns2zrPNxDL-1Irqj4h8zh6mPeutjwNg5UDhz_IBgfbqFCwgxGZiap-1FLMsVtY9MRbbcZx3ieEnnWfX0VgW2LIM9Pcct-");'>
</div>
</div>
<!-- Decorative subtle blurs for depth -->
<div class="absolute top-10 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-2xl dark:bg-primary/10"></div>
</div>
</div>
<!-- Message Block -->
<div class="w-full max-w-sm mt-4 space-y-4">
<h2 class="text-[#121811] dark:text-white tracking-tight text-[32px] font-bold leading-tight text-left">
                    Start your journey
                </h2>
<p class="text-[#121811]/70 dark:text-white/70 text-lg font-normal leading-relaxed text-left">
                    Your thoughts are safe here. Tap the '+' to begin your first entry.
                </p>
</div>
</main>
<!-- Floating Action Button (FAB) -->
<div class="fixed bottom-24 right-6 z-30">
<button class="flex items-center justify-center w-16 h-16 rounded-full bg-primary shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group">
<span class="material-symbols-outlined text-[#121811] text-[32px] font-normal group-hover:rotate-90 transition-transform duration-300">add</span>
</button>
</div>
<!-- Bottom Navigation Bar -->
<nav class="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-[#132210]/90 backdrop-blur-xl border-t border-black/5 dark:border-white/5 z-20 pb-safe">
<div class="flex justify-around items-end h-[88px] pb-6 px-2">
<!-- Home Tab -->
<button class="flex flex-col items-center justify-center w-16 gap-1.5 text-gray-400 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-colors group">
<span class="material-symbols-outlined text-[28px] group-hover:-translate-y-0.5 transition-transform duration-200" data-weight="300">home</span>
<span class="text-[10px] font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">Home</span>
</button>
<!-- Journal Tab (Active) -->
<button class="flex flex-col items-center justify-center w-16 gap-1.5 text-[#121811] dark:text-white relative">
<div class="relative p-1">
<span class="material-symbols-outlined text-[28px] fill-current" data-fill="1">book_2</span>
<!-- Active Indicator Dot -->
<span class="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full ring-2 ring-white dark:ring-[#132210]"></span>
</div>
<span class="text-[10px] font-bold tracking-wide">Journal</span>
</button>
<!-- Explore Tab -->
<button class="flex flex-col items-center justify-center w-16 gap-1.5 text-gray-400 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-colors group">
<span class="material-symbols-outlined text-[28px] group-hover:-translate-y-0.5 transition-transform duration-200" data-weight="300">explore</span>
<span class="text-[10px] font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">Explore</span>
</button>
<!-- Profile Tab -->
<button class="flex flex-col items-center justify-center w-16 gap-1.5 text-gray-400 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-colors group">
<span class="material-symbols-outlined text-[28px] group-hover:-translate-y-0.5 transition-transform duration-200" data-weight="300">person</span>
<span class="text-[10px] font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">Profile</span>
</button>
</div>
</nav>
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

<!-- Offline Mode Banner (Light Mode) - Error State -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage - Offline Mode</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#df8020",
                        "background-light": "#f8f7f6",
                        "background-dark": "#211911",
                        "surface-light": "#ffffff",
                        "surface-dark": "#2c241b",
                        "text-primary-light": "#171411",
                        "text-secondary-light": "#877564",
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
<body class="bg-background-light dark:bg-background-dark font-display text-text-primary-light antialiased overflow-hidden">
<div class="relative mx-auto flex h-full min-h-screen w-full max-w-md flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden shadow-xl">
<!-- Top Status Bar Area (Simulated for iOS) -->
<div class="h-12 w-full bg-background-light dark:bg-background-dark shrink-0"></div>
<!-- App Header -->
<div class="flex items-center bg-background-light dark:bg-background-dark px-4 pb-2 justify-between">
<div class="text-text-primary-light flex size-12 shrink-0 items-center justify-start cursor-pointer">
<span class="material-symbols-outlined text-[28px]">menu</span>
</div>
<h2 class="text-text-primary-light text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Sage</h2>
</div>
<!-- Offline Banner -->
<!-- Floating pill design as requested for Swiss aesthetic -->
<div class="px-4 py-2 sticky top-0 z-50">
<div class="flex items-center gap-3 bg-surface-light dark:bg-surface-dark px-4 py-3 rounded-full shadow-sm border border-[#e6e1dc] dark:border-[#3d3228]">
<div class="flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;">wifi_off</span>
</div>
<div class="flex-1 flex flex-col justify-center">
<p class="text-text-primary-light dark:text-white text-sm font-medium leading-tight">You're currently offline.</p>
<p class="text-text-secondary-light text-xs font-normal leading-tight mt-0.5">Some features may be limited.</p>
</div>
<div class="shrink-0">
<button class="flex items-center justify-center text-primary text-sm font-semibold leading-normal hover:bg-primary/10 rounded-full px-3 py-1 transition-colors">
                        Retry
                    </button>
</div>
</div>
</div>
<!-- Main Content Area -->
<div class="flex-1 overflow-y-auto pb-20">
<!-- Headline -->
<div class="px-4 pt-4 pb-2">
<h1 class="text-text-primary-light dark:text-white tracking-tight text-[32px] font-bold leading-tight">Good Morning, Alex</h1>
<p class="text-text-secondary-light text-base mt-1">Ready for your moment of pause?</p>
</div>
<!-- Daily Reflection Card -->
<div class="p-4">
<div class="relative bg-cover bg-center flex flex-col items-stretch justify-end rounded-xl h-[360px] overflow-hidden shadow-sm group cursor-pointer" data-alt="Abstract soft gradient background with warm orange and cream hues evoking a sunrise" style='background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAVXIZfSxIbznG1YDQrYCstSEt14zrnu7lRizt6rT_f_Tv-QPYKpoUIoZnUgviu2pplrPhpvP3gg4K9v6xeqAJ5TgyzUTE9JSDT3EIepTEbsI26_1ltDNhoisMxAcbjNpzscSySFSAZoicgiolP5LyFpZjQuQ4-Xo2GaC25ZLSIIMpAhQx7KkqP4Fqqn5LgGvWgZbSued7E6sdpdbOvOygE6GsoZxLkXwrdlm6Q53OPeO1KyLJ1QbH0HXe4VplzgZu4xi4-01HSL3qN");'>
<!-- Card content -->
<div class="flex w-full items-end justify-between gap-4 p-6 z-10">
<div class="flex flex-1 flex-col gap-2">
<span class="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-medium text-white w-fit">
<span class="material-symbols-outlined text-[16px]">wb_sunny</span>
                                Daily Prompt
                            </span>
<p class="text-white tracking-tight text-3xl font-bold leading-tight">Finding Stillness</p>
<p class="text-white/90 text-base font-medium leading-relaxed max-w-[280px]">Where do you feel most at peace in your daily routine?</p>
</div>
<div class="shrink-0">
<div class="size-10 rounded-full bg-white flex items-center justify-center text-primary shadow-lg group-hover:scale-105 transition-transform">
<span class="material-symbols-outlined">arrow_forward</span>
</div>
</div>
</div>
</div>
</div>
<!-- Recent Entries Section -->
<div class="px-4 pt-4">
<div class="flex items-center justify-between mb-3">
<h3 class="text-text-primary-light dark:text-white text-lg font-bold">Recent Insights</h3>
<a class="text-primary text-sm font-medium" href="#">View all</a>
</div>
<div class="flex flex-col gap-3">
<!-- List Item 1 -->
<div class="flex items-center gap-4 bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-[#e6e1dc] dark:border-[#3d3228]">
<div class="bg-primary/10 text-primary flex items-center justify-center rounded-lg shrink-0 size-12">
<span class="material-symbols-outlined">favorite</span>
</div>
<div class="flex-1 min-w-0">
<p class="text-text-primary-light dark:text-white text-base font-semibold truncate">Gratitude Practice</p>
<p class="text-text-secondary-light text-sm truncate">Yesterday • 5 mins</p>
</div>
<span class="material-symbols-outlined text-text-secondary-light text-[20px]">chevron_right</span>
</div>
<!-- List Item 2 -->
<div class="flex items-center gap-4 bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-[#e6e1dc] dark:border-[#3d3228]">
<div class="bg-primary/10 text-primary flex items-center justify-center rounded-lg shrink-0 size-12">
<span class="material-symbols-outlined">psychology</span>
</div>
<div class="flex-1 min-w-0">
<p class="text-text-primary-light dark:text-white text-base font-semibold truncate">Mindful Breathing</p>
<p class="text-text-secondary-light text-sm truncate">Oct 24 • 10 mins</p>
</div>
<span class="material-symbols-outlined text-text-secondary-light text-[20px]">chevron_right</span>
</div>
</div>
</div>
<div class="h-10"></div>
</div>
<!-- Bottom Navigation -->
<div class="border-t border-[#f4f2f0] dark:border-[#3d3228] bg-surface-light dark:bg-surface-dark px-4 pb-6 pt-2 absolute bottom-0 w-full">
<div class="flex gap-2">
<a class="flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-primary" href="#">
<span class="material-symbols-outlined text-[24px] font-variation-settings-fill">home</span>
<p class="text-xs font-medium leading-normal tracking-[0.015em]">Home</p>
</a>
<a class="flex flex-1 flex-col items-center justify-end gap-1 text-text-secondary-light hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined text-[24px]">book_2</span>
<p class="text-xs font-medium leading-normal tracking-[0.015em]">Journal</p>
</a>
<a class="flex flex-1 flex-col items-center justify-end gap-1 text-text-secondary-light hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined text-[24px]">auto_awesome</span>
<p class="text-xs font-medium leading-normal tracking-[0.015em]">Insights</p>
</a>
</div>
</div>
</div>
<style>
        .font-variation-settings-fill {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
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

<!-- Response Error State (Light Mode) - Couldn't Generate -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage - Response Error</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
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
<body class="bg-background-light dark:bg-background-dark font-display antialiased text-[#121811] dark:text-white transition-colors duration-200">
<div class="relative flex h-full min-h-screen w-full flex-col overflow-hidden group/design-root">
<!-- Header: TopAppBar -->
<header class="flex items-center justify-between px-4 py-4 z-10">
<button class="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer text-[#121811] dark:text-white">
<span class="material-symbols-outlined text-[28px]">chevron_left</span>
</button>
<!-- Empty div for spacing balance if needed, or actions on right -->
<div class="w-10"></div>
</header>
<!-- Main Content: EmptyState variant -->
<main class="flex-1 flex flex-col items-center justify-center px-6 pb-20">
<div class="flex flex-col items-center gap-8 w-full max-w-md animate-in fade-in zoom-in duration-500">
<!-- Abstract Illustration -->
<!-- Using a specific placeholder to represent the abstract swiss minimalist art -->
<div class="relative flex items-center justify-center w-48 h-48 mb-2">
<div class="w-full h-full bg-center bg-contain bg-no-repeat opacity-80 mix-blend-multiply dark:mix-blend-normal" data-alt="Abstract minimalist line drawing of two disconnected geometric shapes" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDvmIvNSyAlrNNophZLvWb-hqHkdN6fHN3FrFBbGeCSuf93_KbGYj6L3rSVDBnBO0mXN64SbwG2p3zMTeS4g0JCK2sRtFapG876TBq_AoVP9NZqHfw5XruO7W3pVyJekYj1S_MyWV-_vCD3hH82ro-HbSTWxpugZB6wt1bebCm5A3y83_yPahcdnwZN5QHTdjaa0dK7XTLSGTtN4YXASIhqb2Q5y18_7iotdyLc1R713OrGVp9KNvnWNzvMuowU1SX3G138mZkFWFBx");'>
</div>
</div>
<!-- Text Content -->
<div class="flex flex-col items-center gap-3 text-center">
<h1 class="text-[#121811] dark:text-white text-3xl font-bold leading-tight tracking-tight">
                        Couldn't quite connect.
                    </h1>
<p class="text-gray-500 dark:text-gray-400 text-base font-normal leading-relaxed max-w-[280px]">
                        Would you like to try again? Sometimes the path needs a second step.
                    </p>
</div>
<!-- Actions -->
<div class="flex flex-col items-center gap-5 w-full mt-4">
<!-- Primary Button: Pill shaped, primary color -->
<button class="flex w-full max-w-[240px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-primary hover:brightness-95 active:scale-95 transition-all shadow-sm">
<span class="text-[#121811] text-base font-bold leading-normal tracking-[0.015em]">Retry</span>
</button>
<!-- Secondary Link: SingleButton variant -->
<button class="cursor-pointer text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-[#121811] dark:hover:text-white transition-colors py-2">
                        Return Home
                    </button>
</div>
</div>
</main>
<!-- Bottom spacing filler -->
<div class="h-6"></div>
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

<!-- Sage App Onboarding 1 (Light Mode) -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage Onboarding</title>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&amp;display=swap" rel="stylesheet"/>
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
                    },
                    fontFamily: {
                        "display": ["Manrope", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        /* Custom scrollbar hide for cleaner UI */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
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
<body class="bg-background-light dark:bg-background-dark text-[#111817] dark:text-[#f6f8f8] font-display antialiased selection:bg-primary selection:text-background-dark">
<div class="relative flex h-full min-h-screen w-full flex-col overflow-hidden">
<!-- Header -->
<header class="flex items-center justify-center p-4 pt-6 pb-2 w-full z-10">
<h2 class="text-[#111817] dark:text-white text-lg font-extrabold leading-tight tracking-[0.1em] uppercase">SAGE</h2>
</header>
<!-- Main Content Wrapper -->
<main class="flex-1 flex flex-col items-center justify-center px-6 w-full max-w-md mx-auto relative">
<!-- Hero Visual -->
<!-- Using a simplified container for the abstract Swiss-style geometric shape -->
<div class="w-full flex justify-center py-8 mb-4">
<div class="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-xl shadow-primary/10">
<!-- Abstract gradient background representing clarity and warmth -->
<div class="absolute inset-0 bg-gradient-to-tr from-[#dbe6e4] via-[#f0f4f3] to-primary/20 dark:from-[#1a2e2b] dark:via-[#152926] dark:to-primary/10"></div>
<!-- Inner geometric accent -->
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-[1px] border-primary/30 flex items-center justify-center bg-white/30 dark:bg-black/10 backdrop-blur-sm" data-alt="Abstract geometric circles representing mindfulness">
<div class="w-32 h-32 rounded-full bg-primary/20 blur-2xl"></div>
<div class="w-24 h-24 rounded-full border-[1px] border-[#111817]/10 dark:border-white/10"></div>
</div>
</div>
</div>
<!-- Typography Group -->
<div class="flex flex-col items-center gap-2 mb-8">
<h1 class="text-[#111817] dark:text-white tracking-tight text-[32px] sm:text-[40px] font-extrabold leading-[1.1] text-center">
                    Find your clarity
                </h1>
<p class="text-[#111817]/70 dark:text-white/70 text-base sm:text-lg font-medium leading-relaxed text-center max-w-[320px]">
                    A sanctuary for your thoughts. Discover patterns in your life through guided reflection.
                </p>
</div>
<!-- Page Indicators -->
<div class="flex flex-row items-center justify-center gap-3 py-4 mb-4">
<div class="h-2.5 w-2.5 rounded-full bg-[#111817] dark:bg-primary transition-all duration-300"></div>
<div class="h-2.5 w-2.5 rounded-full bg-[#dbe6e4] dark:bg-white/20"></div>
<div class="h-2.5 w-2.5 rounded-full bg-[#dbe6e4] dark:bg-white/20"></div>
</div>
</main>
<!-- Bottom Actions -->
<footer class="w-full px-6 pb-10 pt-2 flex flex-col gap-4 max-w-md mx-auto">
<!-- Primary Button -->
<!-- Using text-background-dark on primary background for accessible contrast -->
<button class="w-full h-14 bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all rounded-lg flex items-center justify-center group">
<span class="text-background-dark text-lg font-bold tracking-tight">Begin Journey</span>
<span class="material-symbols-outlined ml-2 text-background-dark text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
<!-- Secondary Link -->
<button class="w-full py-2 text-sm font-semibold text-[#111817]/60 dark:text-white/60 hover:text-[#111817] dark:hover:text-white transition-colors">
                Already have an account? <span class="underline decoration-1 underline-offset-4 decoration-primary/50">Log in</span>
</button>
</footer>
</div>
</body></html>

<!-- Sage App Onboarding 2 (Light Mode) -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage App Onboarding</title>
<!-- Google Fonts: Inter -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#32d411",
                        "background-light": "#f6f8f6",
                        "background-dark": "#132210",
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
                    backgroundImage: {
                        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                    }
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
<body class="antialiased">
<div class="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display overflow-hidden group/design-root">
<!-- Top Navigation Area -->
<div class="flex w-full items-center justify-between px-6 pt-12 pb-4 z-10">
<!-- Page Indicators (Step 2 of 3) -->
<div class="flex flex-row items-center justify-start gap-2.5">
<!-- Step 1 -->
<div class="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
<!-- Step 2 (Active) -->
<div class="h-2 w-8 rounded-full bg-primary"></div>
<!-- Step 3 -->
<div class="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
</div>
<!-- Skip Button -->
<button class="flex items-center justify-end rounded-full px-2 py-1 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
<span class="text-slate-500 dark:text-slate-400 text-sm font-semibold leading-normal tracking-[0.015em]">Skip</span>
</button>
</div>
<!-- Main Content Area -->
<div class="flex flex-1 flex-col justify-between px-6 pb-8 pt-2">
<!-- Visual / Illustration Card -->
<!-- Using a large rounded card for the main visual to create that 'soft' Swiss look -->
<div class="relative flex-1 w-full overflow-hidden rounded-2xl bg-white dark:bg-white/5 shadow-sm mb-8">
<div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105" data-alt="Abstract minimalist illustration of tangled green lines smoothing out into a single straight line, representing clarity and thought processing" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuC6u0kCzorSHJiD0FS5Rl2Lr1e9ZC86lg1BkB7Kq5vyW-uNI4L0rAkFzlyA6H-rFg6dblqYQktcX2bTO9T4_3h8kDd3hX-D0-7yiZuirUSCtuNFBCMI_5OVe3Ala025FFDOJPVKaaHaskE2YRnyf6JrW_Rkk1e1I4c6TtKiLSmfzKWhdZa-gdyXPJzMueJnu_3uq3sSAEUd6_uRJZQTRyafzBYhoBysOJqGDoQOnfmG9BHs7eaUH7sFjAGTnX-oWBfSzXHk8AvakeS3");'>
<!-- Overlay for text readability if needed, or just artistic tint -->
<div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-light/20 dark:to-background-dark/80"></div>
</div>
</div>
<!-- Content Section -->
<div class="flex flex-col items-start gap-6">
<!-- Text Block -->
<div class="flex flex-col gap-3 pr-4">
<h1 class="text-[#121811] dark:text-white text-3xl font-extrabold leading-tight tracking-tight">
                    Unravel Your <br/>
<span class="text-primary decoration-2 underline-offset-4">Thoughts</span>
</h1>
<p class="text-slate-600 dark:text-slate-300 text-base font-normal leading-relaxed max-w-[90%]">
                    Sage guides you through daily prompts designed to turn noise into insight. Take a moment to pause and reflect.
                </p>
</div>
<!-- Primary Action Button -->
<!-- Using the requested primary color and pill shape -->
<button class="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-primary h-14 text-[#121811] shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 active:scale-[0.98]">
<div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
<span class="relative z-10 text-base font-bold tracking-wide">Continue</span>
<span class="material-symbols-outlined relative z-10 ml-2 text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
</button>
</div>
</div>
</div>
</body></html>

<!-- Sage App Onboarding 3 (Light Mode) -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage App Onboarding</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#e8ba30",
                        "background-light": "#f8f7f6",
                        "background-dark": "#211d11",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark transition-colors duration-300 font-display selection:bg-primary/30">
<div class="relative flex h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark">
<!-- Main Content Wrapper -->
<div class="flex-1 flex flex-col justify-between px-6 pt-6 pb-8">
<!-- Top Section: Hero Graphic -->
<div class="w-full h-[55%] flex flex-col">
<div class="relative w-full h-full overflow-hidden rounded-xl bg-gray-100 dark:bg-white/5 group">
<div class="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-105" data-alt="Abstract minimalist geometric shapes in warm yellow and beige Swiss style" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCv6pQqjK1RSd2muaHqgm6zZEI0fgyiv0dxXXweyZntWVUPt4RdDp3Cp8mn80WXnqL8KaSYzk8pkauUBus4tD1X4b3QZlGEt_BuRK_n5uEe62Mqays766ZqJQExLw1IwU1Eg_TXQ_1OA543x5G4R2-_xa31wncJjcypcyELIbTFe3Gtph40U_n-p_kONDSIpjMo_pJCJ9GLiYDAMI3TvZTvGgctPJj87qkFBk1X6Tob27K4JQXISbEiAUgYAnzlYLfwSJc7YZDnD-8d");'>
</div>
<!-- Subtle overlay to ensure aesthetic cohesion -->
<div class="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
</div>
</div>
<!-- Middle Section: Text Content -->
<div class="flex flex-col justify-end gap-2 mt-8">
<h1 class="text-[#181611] dark:text-[#f8f7f6] tracking-tight text-[40px] font-bold leading-[1.1] text-left">
                    Clarify your mind.
                </h1>
<p class="text-gray-600 dark:text-gray-300 text-lg font-normal leading-relaxed text-left max-w-[90%] pt-2">
                    Sage guides you through daily introspection to find the answers already inside you.
                </p>
</div>
<!-- Bottom Section: Navigation & Actions -->
<div class="flex flex-col gap-8 mt-auto pt-8">
<!-- Page Indicators -->
<div class="flex w-full flex-row items-center justify-start gap-2">
<div class="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors"></div>
<div class="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors"></div>
<div class="h-2 w-8 rounded-full bg-primary transition-all duration-300"></div>
</div>
<!-- CTA Button -->
<div class="flex flex-col gap-4">
<button class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 bg-primary text-[#181611] text-base font-bold leading-normal tracking-wide hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 shadow-sm">
<span class="truncate">Start Reflection</span>
</button>
<button class="text-sm text-gray-500 dark:text-gray-400 font-medium hover:text-[#181611] dark:hover:text-white transition-colors">
                        Already have an account? <span class="text-[#181611] dark:text-[#f8f7f6] underline decoration-gray-300 underline-offset-4">Log in</span>
</button>
</div>
</div>
</div>
</div>
</body></html>

<!-- Sage App Ask/Chat Session (Light Mode) -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage App - Ask/Chat Session</title>
<!-- Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#4fe830",
                        "background-light": "#f6f8f6",
                        "background-dark": "#142111",
                        "text-main": "#121811",
                        "text-muted": "#698863",
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
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
        
        .chat-bubble-sage {
            border-bottom-left-radius: 4px;
        }
        
        .chat-bubble-user {
            border-bottom-right-radius: 4px;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-white dark:bg-background-dark text-text-main font-display antialiased h-screen flex flex-col overflow-hidden selection:bg-primary/30">
<!-- Top Navigation -->
<header class="flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
<button class="text-text-main flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
<span class="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
</button>
<div class="flex flex-col items-center">
<h2 class="text-text-main text-lg font-bold leading-tight tracking-[-0.015em]">Sage</h2>
<span class="text-xs text-text-muted font-medium">Deep Dive: Career Purpose</span>
</div>
<button class="text-text-main flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
<span class="material-symbols-outlined text-2xl">more_horiz</span>
</button>
</header>
<!-- Chat Stream -->
<main class="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-6">
<!-- Sage Message 1 -->
<div class="flex items-end gap-3">
<div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0 shadow-sm" data-alt="Abstract green organic shape representing sage" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCWCZin5M1y4_EiyLRuMrfB3dN0uAiUY2NU7upk-xPg4SZBXHv1eaqMZfMUvBzcAFVi0EIuLeAttSh0OIp3OdsZo0AtX7XRZHfcqiDGWFvssDwZj6BX6b7z5x_cugwMRXTAINKGfUnD69IM06PrerOU5wGlGMN3-T_RrAklehbyHJMpa9NrDAS1fKwlqq4eXP-jan-25HlnKaTbIKx_APt7xrrkS7wKCoNEeGWmj2HU8Zz3lGY4icd9ECbsuosGYmViSfew2-ChpUp0");'></div>
<div class="flex flex-1 flex-col gap-1 items-start">
<div class="flex items-center gap-2 ml-1">
<p class="text-text-muted text-[11px] font-medium uppercase tracking-wider">Sage</p>
<span class="text-gray-300 text-[10px]">•</span>
<p class="text-gray-400 text-[10px]">10:42 AM</p>
</div>
<div class="text-[15px] font-normal leading-relaxed flex max-w-[85%] rounded-2xl rounded-bl-none px-5 py-3 bg-background-light dark:bg-gray-800 text-text-main shadow-sm border border-gray-50 dark:border-gray-700">
                    What is holding you back from making that decision today?
                </div>
</div>
</div>
<!-- User Message 1 -->
<div class="flex items-end gap-3 justify-end">
<div class="flex flex-1 flex-col gap-1 items-end">
<div class="flex items-center gap-2 mr-1">
<p class="text-gray-400 text-[10px]">10:45 AM</p>
</div>
<div class="text-[15px] font-normal leading-relaxed flex max-w-[85%] rounded-2xl rounded-br-none px-5 py-3 bg-primary text-text-main shadow-md shadow-primary/20">
                    I think I'm afraid of choosing the wrong path.
                </div>
</div>
<!-- Hidden User Avatar for cleaner Swiss look, or keep small -->
<!-- <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-8 shrink-0" data-alt="User profile photo placeholder" style='background-image: url("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop");'></div> -->
</div>
<!-- Sage Message 2 -->
<div class="flex items-end gap-3">
<div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0 shadow-sm" data-alt="Abstract green organic shape representing sage" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAs8IGTy1GmklGi2k1iwSwps7yG36e98FiGIKwcMWmO6j-7hY4mMDWibt8-geAEqWOkK5EdnT2V3mZW7J2XlITrR1lc_behKIW88ecgMHAheapcfnlCoPIdzHz8oNnl4n7Fkz35mNyevxvOh9WhrrYOdJ6j-3mvb15s-WBNcFuReAEH6iSIuttaKa4kIBLI7o_Z8Ajtm76-jnlos1kHMHS-QoE6Jb7yzZDrab8H3V9ArA7410rIpuVZj_06hhcq9gMi2vSVHPr-8rG-");'></div>
<div class="flex flex-1 flex-col gap-1 items-start">
<div class="flex items-center gap-2 ml-1">
<p class="text-text-muted text-[11px] font-medium uppercase tracking-wider">Sage</p>
<span class="text-gray-300 text-[10px]">•</span>
<p class="text-gray-400 text-[10px]">10:46 AM</p>
</div>
<div class="text-[15px] font-normal leading-relaxed flex max-w-[85%] rounded-2xl rounded-bl-none px-5 py-3 bg-background-light dark:bg-gray-800 text-text-main shadow-sm border border-gray-50 dark:border-gray-700">
                    That is a natural fear. If there were no wrong paths, just different lessons, how would you choose?
                </div>
</div>
</div>
<!-- Typing Indicator -->
<div class="flex items-end gap-3 opacity-0 animate-pulse delay-700" style="animation-fill-mode: forwards; animation-name: fadeIn;">
<div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0 opacity-50" data-alt="Abstract green organic shape representing sage" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsDwBdRMGjY-trhACAl1A02apW3HNzAdkHU8QiRGxg1ezIK3ETfInV32lelrj7C9iWuuCA39Gf3nuf8U3Hl61cN8lXj33eJDtiA07ACp0V1cpMGS-WQIAe4B48Q_2hUYUk5bpui3n0xAeetmQiOuNR089-2aFBA5FZd3ugg_2KI3Cm9rc-jVb2KI_LzfC6lLKgeTy25ymKHmVKL70Z1FQOitrHwaaaMi-UMz2G_1SLlM8XtKV22nDQL5g1-LLMfTWkBZNP9etI9LVl");'></div>
<div class="bg-background-light dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-1">
<div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
<div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
<div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
</div>
</div>
<!-- Spacer for content to sit above input -->
<div class="h-20"></div>
</main>
<!-- Composer Input Area -->
<div class="p-4 bg-white/90 dark:bg-background-dark/90 backdrop-blur-lg sticky bottom-0 w-full border-t border-gray-50 dark:border-gray-800">
<label class="flex items-end gap-3 w-full max-w-3xl mx-auto">
<div class="flex w-full items-center rounded-[24px] bg-background-light dark:bg-gray-800 border border-transparent focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all p-1.5 pr-2 shadow-sm">
<button class="p-2 text-gray-400 hover:text-text-muted transition-colors rounded-full shrink-0">
<span class="material-symbols-outlined text-[20px]">add</span>
</button>
<textarea class="form-input flex w-full bg-transparent border-none focus:ring-0 text-text-main placeholder:text-text-muted/60 text-base font-normal resize-none py-2.5 max-h-32" placeholder="Type your thoughts..." rows="1"></textarea>
<div class="flex items-center gap-2">
<button class="flex items-center justify-center size-10 rounded-full bg-primary hover:bg-primary/90 text-text-main shadow-md shadow-primary/25 transition-all active:scale-95 shrink-0">
<span class="material-symbols-outlined text-[20px] font-medium ml-0.5">arrow_upward</span>
</button>
</div>
</div>
</label>
<div class="h-1 bg-transparent w-full"></div> <!-- Bottom safe area spacing -->
</div>
<style>
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    </style>
</body></html>

<!-- Sage App Insight Detail (Light Mode) -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage App - Insight Detail</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
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
                        "text-main": "#121811",
                        "text-muted": "#688961",
                        "surface-light": "#FFFFFF",
                        "surface-dark": "#1C2E18",
                    },
                    fontFamily: {
                        "display": ["Manrope", "sans-serif"],
                        "body": ["Manrope", "sans-serif"],
                    },
                    borderRadius: {"DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
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
<body class="bg-background-light dark:bg-background-dark font-display antialiased text-text-main dark:text-white transition-colors duration-300">
<div class="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark">
<!-- Top Navigation -->
<header class="sticky top-0 z-50 flex items-center justify-between p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
<button class="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined text-text-main dark:text-white">arrow_back_ios_new</span>
</button>
<span class="text-sm font-semibold tracking-wide uppercase text-text-muted dark:text-primary/80">Insight</span>
<div class="flex items-center gap-2">
<button class="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined text-text-main dark:text-white">bookmark_border</span>
</button>
<button class="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
<span class="material-symbols-outlined text-text-main dark:text-white">ios_share</span>
</button>
</div>
</header>
<main class="flex-1 flex flex-col pb-32">
<!-- Hero Image / Visual Abstract -->
<div class="px-4 mb-6">
<div class="w-full h-48 rounded-2xl overflow-hidden relative shadow-sm">
<div class="absolute inset-0 bg-gradient-to-br from-[#e0e9df] to-[#f0f4ef] dark:from-[#1a2e16] dark:to-[#243a1f]"></div>
<!-- Abstract shapes simulating swiss design -->
<div class="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
<div class="absolute bottom-0 left-0 w-24 h-24 bg-text-muted/20 rounded-full blur-xl transform -translate-x-5 translate-y-5"></div>
<img class="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30" data-alt="Abstract calming natural leaf texture overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZdHOeH2H8ttYRBErhu6dqf8haOAVUnC8wZWbzR6gysF_gCfC4QRGkqELtH-W7bxFuLkTIIUlTPZ6AQqs9shHD0IuLKYl7xP0naFdrdphBo7G3Py6k8XVkExwOP9hCVEtHbgJe6xprNKIdoBvcPgnLPcW9eScobUcyewAWOD7YvS2BJrIZfxyzBVt1mtac8e9CLHML7mVAvNNH3H85i_POz6kUtjwpERQ9_Afghv7P_qZL_m1zathyVU-tOUlDrBo-VQU3I7kFtG0c"/>
</div>
</div>
<!-- Meta Info & Title -->
<div class="px-6 flex flex-col gap-2 mb-8">
<div class="flex items-center gap-2 text-text-muted text-xs font-bold tracking-wider uppercase">
<span class="material-symbols-outlined text-primary text-[16px]">wb_sunny</span>
<span>Daily Wisdom</span>
<span class="size-1 bg-text-muted rounded-full"></span>
<span>3 min read</span>
</div>
<h1 class="text-4xl font-extrabold leading-[1.1] tracking-tight text-text-main dark:text-white mt-1">
                    The Art of <br/>Letting Go
                </h1>
</div>
<!-- Reading Progress (Contextual) -->
<div class="px-6 mb-8">
<div class="flex justify-between items-end mb-2">
<span class="text-xs font-medium text-text-muted">Progress</span>
<span class="text-xs font-bold text-text-main dark:text-white">35%</span>
</div>
<div class="h-1 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
<div class="h-full bg-primary w-[35%] rounded-full"></div>
</div>
</div>
<!-- Content Cards Stack -->
<div class="px-4 flex flex-col gap-4">
<!-- Introduction Card -->
<article class="p-6 bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-black/5 dark:border-white/5">
<h3 class="text-lg font-bold mb-3 text-text-main dark:text-white">The Burden of Familiarity</h3>
<p class="text-base leading-relaxed text-text-main/80 dark:text-white/80">
                        Understanding attachment is the first step to freedom. We often hold onto pain simply because it is familiar. The known, even if painful, feels safer than the void of the unknown. But true healing comes from release.
                    </p>
</article>
<!-- Quote Block -->
<div class="py-8 px-2 relative group cursor-default">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full group-hover:w-1.5 transition-all duration-300"></div>
<blockquote class="pl-6 italic text-xl font-medium text-text-main dark:text-white leading-snug">
                        "You cannot swim for new horizons until you have courage to lose sight of the shore."
                    </blockquote>
<cite class="pl-6 mt-3 block text-sm font-bold text-text-muted not-italic">— William Faulkner</cite>
</div>
<!-- Deep Dive Card -->
<article class="p-6 bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-black/5 dark:border-white/5">
<h3 class="text-lg font-bold mb-3 text-text-main dark:text-white">Stepping into the Void</h3>
<p class="text-base leading-relaxed text-text-main/80 dark:text-white/80 mb-4">
                        Letting go isn't about erasing the past; it's about accepting that the past has served its purpose. When we release our tight grip on "how things should be," we open our hands to receive "what things can be."
                    </p>
<p class="text-base leading-relaxed text-text-main/80 dark:text-white/80">
                        Consider the trees in autumn. They do not cling to their leaves in fear of the winter. They release them with grace, trusting in the cycle of renewal.
                    </p>
</article>
<!-- Interactive Prompt -->
<div class="mt-2 p-6 rounded-xl bg-primary/10 dark:bg-primary/5 border border-primary/20 flex flex-col items-start gap-3">
<div class="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wide">
<span class="material-symbols-outlined text-[20px]">psychology_alt</span>
                        Reflection Point
                    </div>
<p class="text-lg font-semibold text-text-main dark:text-white">
                        What is one thing you are holding onto today that is weighing you down?
                    </p>
</div>
<!-- Spacer for bottom fab -->
<div class="h-8"></div>
</div>
</main>
<!-- Sticky Bottom Action Bar -->
<div class="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark pt-12 max-w-md mx-auto z-40 pointer-events-none">
<div class="pointer-events-auto flex items-center gap-3">
<button class="flex-1 h-14 bg-text-main dark:bg-white text-white dark:text-background-dark rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-transform">
<span class="material-symbols-outlined">edit_note</span>
                    Begin Journaling
                </button>
<button class="h-14 w-14 bg-surface-light dark:bg-surface-dark border border-black/5 dark:border-white/10 rounded-xl flex items-center justify-center text-text-main dark:text-white shadow-sm active:scale-[0.95] transition-transform">
<span class="material-symbols-outlined">favorite</span>
</button>
</div>
</div>
</div>
</body></html>

<!-- Sage App Home Loading (Light Mode) -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage App Home Loading</title>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
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
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
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
<body class="font-display bg-background-light dark:bg-background-dark text-[#121811] dark:text-white overflow-x-hidden antialiased selection:bg-primary/30">
<div class="relative flex min-h-screen w-full flex-col group/design-root">
<!-- Top Navigation Bar (Skeleton) -->
<div class="flex items-center px-6 py-4 justify-between sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
<div class="flex size-10 shrink-0 items-center justify-center">
<!-- Avatar Ghost -->
<div class="size-8 rounded-full bg-slate-200 dark:bg-white/10 animate-pulse"></div>
</div>
<!-- Logo Ghost -->
<div class="h-5 w-20 bg-slate-200 dark:bg-white/10 rounded-full animate-pulse"></div>
<div class="flex size-10 shrink-0 items-center justify-center">
<!-- Settings/Menu Ghost -->
<span class="material-symbols-outlined text-slate-300 dark:text-white/20 animate-pulse">more_horiz</span>
</div>
</div>
<!-- Main Content Area -->
<main class="flex-1 flex flex-col items-stretch w-full max-w-md mx-auto px-6 pb-28 pt-2">
<!-- "Sage" Pulse Indicator -->
<div class="flex flex-col items-center justify-center py-12 min-h-[160px]">
<div class="relative flex items-center justify-center size-20">
<!-- Breathing outer ring -->
<div class="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-75 duration-1000"></div>
<!-- Core circle -->
<div class="relative size-3 rounded-full bg-primary shadow-[0_0_20px_rgba(55,236,19,0.6)]"></div>
</div>
<div class="mt-6 flex items-center gap-2">
<p class="text-slate-400 dark:text-white/40 text-sm font-medium tracking-wide animate-pulse">Connecting with Sage</p>
</div>
</div>
<!-- Daily Greeting Skeleton (Hero) -->
<div class="flex flex-col gap-3 mb-10">
<div class="h-8 w-3/4 bg-slate-200 dark:bg-white/10 rounded-lg animate-pulse-slow"></div>
<div class="h-8 w-1/2 bg-slate-200 dark:bg-white/10 rounded-lg animate-pulse-slow delay-100"></div>
</div>
<!-- Content Cards Stack (Skeleton UI) -->
<div class="flex flex-col gap-6">
<!-- Card 1: Daily Reflection -->
<div class="flex flex-col bg-white dark:bg-white/5 p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-white dark:border-white/5">
<div class="w-full aspect-[2/1] bg-slate-100 dark:bg-white/5 rounded-lg mb-4 animate-pulse relative overflow-hidden" data-alt="Abstract soft gradient placeholder representing reflection">
<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
</div>
<div class="flex flex-col gap-2">
<div class="h-5 w-2/3 bg-slate-200 dark:bg-white/10 rounded-md animate-pulse"></div>
<div class="flex justify-between items-center mt-1">
<div class="h-4 w-1/3 bg-slate-100 dark:bg-white/5 rounded-md animate-pulse"></div>
<div class="size-8 rounded-full bg-slate-100 dark:bg-white/5 animate-pulse"></div>
</div>
</div>
</div>
<!-- Card 2: Journal Prompt -->
<div class="flex flex-col bg-white dark:bg-white/5 p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-white dark:border-white/5">
<div class="flex gap-4 items-start">
<div class="size-16 bg-slate-100 dark:bg-white/5 rounded-lg shrink-0 animate-pulse" data-alt="Small square placeholder for journal icon"></div>
<div class="flex flex-col gap-2 flex-1 pt-1">
<div class="h-5 w-3/4 bg-slate-200 dark:bg-white/10 rounded-md animate-pulse"></div>
<div class="h-4 w-1/2 bg-slate-100 dark:bg-white/5 rounded-md animate-pulse"></div>
</div>
</div>
</div>
<!-- Card 3: Next Session -->
<div class="flex flex-col bg-white dark:bg-white/5 p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-white dark:border-white/5">
<div class="w-full aspect-[2.5/1] bg-slate-100 dark:bg-white/5 rounded-lg mb-4 animate-pulse" data-alt="Wide abstract placeholder for session banner"></div>
<div class="h-5 w-1/2 bg-slate-200 dark:bg-white/10 rounded-md animate-pulse"></div>
</div>
</div>
</main>
<!-- Bottom Navigation (Ghost State) -->
<div class="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-[#132210]/95 backdrop-blur-xl border-t border-slate-100 dark:border-white/5 px-8 py-4 z-20">
<div class="flex justify-between items-center max-w-md mx-auto">
<div class="flex flex-col items-center justify-center gap-1 group cursor-default">
<span class="material-symbols-outlined text-primary text-[28px]">spa</span>
<div class="h-1 w-1 bg-primary rounded-full"></div>
</div>
<div class="flex flex-col items-center justify-center gap-1 opacity-30">
<span class="material-symbols-outlined text-[#121811] dark:text-white text-[28px]">book_2</span>
<div class="h-1 w-1 bg-transparent rounded-full"></div>
</div>
<div class="flex flex-col items-center justify-center gap-1 opacity-30">
<span class="material-symbols-outlined text-[#121811] dark:text-white text-[28px]">person</span>
<div class="h-1 w-1 bg-transparent rounded-full"></div>
</div>
</div>
</div>
</div>
<style>
        @keyframes shimmer {
            100% {
                transform: translateX(100%);
            }
        }
    </style>
</body></html>

<!-- Sage App Explore Empty (Light Mode) -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage App - Explore Empty</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#73d411",
                        "background-light": "#f7f8f6",
                        "background-dark": "#192210",
                        "surface-light": "#ffffff",
                        "surface-dark": "#232a1e",
                        "text-main-light": "#141811",
                        "text-main-dark": "#f7f8f6",
                        "text-secondary-light": "#758961",
                        "text-secondary-dark": "#9ab084",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: { "DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "full": "9999px" },
                },
            },
        }
    </script>
<style>
        /* Swiss Aesthetic Typography Utilities */
        .swiss-title {
            letter-spacing: -0.03em;
            line-height: 1.1;
        }
        .swiss-body {
            letter-spacing: -0.01em;
            line-height: 1.5;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-display text-text-main-light dark:text-text-main-dark overflow-hidden">
<div class="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto shadow-2xl overflow-hidden bg-background-light dark:bg-background-dark">
<!-- Top App Bar -->
<header class="flex items-center px-6 pt-12 pb-4 justify-between bg-background-light dark:bg-background-dark sticky top-0 z-10">
<div class="flex items-center gap-4">
<!-- Back button purely decorative for this view as it's a main tab, but keeping component structure -->
<button class="text-text-main-light dark:text-text-main-dark flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors hidden">
<span class="material-symbols-outlined">arrow_back</span>
</button>
<h1 class="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark swiss-title">Explore</h1>
</div>
<div class="flex items-center justify-end">
<button class="text-text-secondary-light dark:text-text-secondary-dark text-sm font-semibold hover:text-primary transition-colors">
                    Filter
                </button>
</div>
</header>
<!-- Search Bar -->
<div class="px-6 py-2">
<div class="relative flex items-center w-full h-12 rounded-lg bg-white dark:bg-surface-dark shadow-sm ring-1 ring-black/5 dark:ring-white/10 overflow-hidden group focus-within:ring-2 focus-within:ring-primary/50 transition-all">
<div class="absolute left-4 flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark">
<span class="material-symbols-outlined text-[20px]">search</span>
</div>
<input class="w-full h-full bg-transparent border-none pl-12 pr-4 text-base text-text-main-light dark:text-text-main-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark focus:ring-0 focus:outline-none font-medium" placeholder="Search for guidance..." type="text"/>
</div>
</div>
<!-- Main Content Area: Empty State -->
<main class="flex-1 flex flex-col justify-center items-center px-8 pb-20">
<div class="flex flex-col items-center gap-8 max-w-[320px] w-full animate-fade-in">
<!-- Abstract Geometric Illustration -->
<div class="relative w-40 h-40 flex items-center justify-center">
<div class="absolute inset-0 bg-primary/10 rounded-full blur-2xl transform scale-75"></div>
<!-- Abstract shapes composition -->
<div class="relative z-10 grid grid-cols-2 gap-2 transform rotate-45">
<div class="w-12 h-12 rounded-lg bg-text-secondary-light/20 dark:bg-white/10 backdrop-blur-sm"></div>
<div class="w-12 h-12 rounded-full border-2 border-primary"></div>
<div class="w-12 h-12 rounded-full bg-primary/20"></div>
<div class="w-12 h-12 rounded-lg border-2 border-text-secondary-light/30 dark:border-white/20"></div>
</div>
</div>
<div class="flex flex-col items-center gap-3 text-center">
<h2 class="text-xl font-bold text-text-main-light dark:text-text-main-dark swiss-title">Nothing here yet</h2>
<p class="text-text-secondary-light dark:text-text-secondary-dark text-sm swiss-body max-w-[260px]">
                        The space is yours to fill. Discover new paths for reflection.
                    </p>
</div>
<button class="w-full h-12 bg-primary hover:bg-primary/90 active:scale-95 transition-all rounded-lg text-white text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-primary/20 mt-4">
<span class="material-symbols-outlined text-[18px]">add</span>
<span>Start Exploring</span>
</button>
</div>
</main>
<!-- Bottom Navigation -->
<nav class="border-t border-black/5 dark:border-white/5 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md px-6 pb-6 pt-3 sticky bottom-0 z-20">
<div class="flex justify-between items-center">
<a class="flex flex-col items-center justify-center gap-1 w-16 group" href="#">
<div class="flex h-8 items-center justify-center text-text-secondary-light dark:text-text-secondary-dark group-hover:text-primary transition-colors">
<span class="material-symbols-outlined text-[24px]">home</span>
</div>
<span class="text-[10px] font-medium text-text-secondary-light dark:text-text-secondary-dark group-hover:text-primary">Home</span>
</a>
<a class="flex flex-col items-center justify-center gap-1 w-16 group" href="#">
<div class="flex h-8 items-center justify-center text-primary relative">
<!-- Active indicator dot -->
<span class="absolute -top-1 right-2 w-1.5 h-1.5 bg-primary rounded-full"></span>
<span class="material-symbols-outlined text-[24px] font-variation-settings-'FILL'1">explore</span>
</div>
<span class="text-[10px] font-bold text-primary">Explore</span>
</a>
<a class="flex flex-col items-center justify-center gap-1 w-16 group" href="#">
<div class="flex h-8 items-center justify-center text-text-secondary-light dark:text-text-secondary-dark group-hover:text-primary transition-colors">
<span class="material-symbols-outlined text-[24px]">spa</span>
</div>
<span class="text-[10px] font-medium text-text-secondary-light dark:text-text-secondary-dark group-hover:text-primary">Journal</span>
</a>
<a class="flex flex-col items-center justify-center gap-1 w-16 group" href="#">
<div class="flex h-8 items-center justify-center text-text-secondary-light dark:text-text-secondary-dark group-hover:text-primary transition-colors">
<span class="material-symbols-outlined text-[24px]">person</span>
</div>
<span class="text-[10px] font-medium text-text-secondary-light dark:text-text-secondary-dark group-hover:text-primary">Profile</span>
</a>
</div>
</nav>
</div>
<style>
        .font-variation-settings-'FILL'1 {
            font-variation-settings: 'FILL' 1;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
    </style>
</body></html>

<!-- Sage App Journal Error (Light Mode) -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sage - Journal Error</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
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
<body class="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-gray-100 antialiased transition-colors duration-200">
<div class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
<!-- Header -->
<header class="sticky top-0 z-10 flex items-center justify-between px-4 py-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
<div class="flex size-10 items-center justify-center shrink-0 cursor-pointer text-gray-900 dark:text-white transition-opacity hover:opacity-70">
<span class="material-symbols-outlined !text-[24px]">arrow_back_ios_new</span>
</div>
<h2 class="text-lg font-bold tracking-tight text-center flex-1 pr-10">Sage</h2>
</header>
<!-- Main Content Area -->
<main class="flex-1 flex flex-col items-center justify-center px-6 py-8 w-full max-w-md mx-auto gap-8">
<!-- Abstract Error Visual -->
<div class="relative w-full aspect-square max-w-[280px] rounded-2xl overflow-hidden shadow-sm dark:shadow-none dark:opacity-90">
<div class="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
<div class="bg-center bg-no-repeat bg-cover w-full h-full" data-alt="Abstract geometric composition with soothing green circle and soft beige shapes" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBJgdPcSmlljTv6Dcd1xrrexM_Tr6nIKd6Ufy3kNIUn-4OZw3615Dt7ATAzG4hF4zO1lOnhe3Gun5MRr6sUp6FzNw7RkQ3m1A0MbEDJB9XcveQ9r91ho2qYbOVrCC5MZ-Bln6U8JzSzgfHgWnfemNyJmpls9k6sp9ca1MBysUV1PgQ_sB54W77s64xK4URJE493fT-xvQ8ophGgBpIf5CJ9IG2T2_6_Y5K4fPWC7hjlk5K8_9Tqb5a_5D-OsupHVL6fz3B6PMrkEr5N");'>
</div>
</div>
<!-- Text Content -->
<div class="flex flex-col items-center gap-3 text-center">
<h1 class="text-3xl font-extrabold tracking-tighter text-gray-900 dark:text-white">
                    A moment of pause
                </h1>
<p class="text-gray-600 dark:text-gray-400 text-base font-normal leading-relaxed max-w-[320px]">
                    Your thoughts are safe on this device, but we can't reach the cloud right now. Take a breath and try again.
                </p>
</div>
<!-- Status Indicator -->
<div class="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/10 rounded-full border border-gray-200 dark:border-white/5">
<span class="material-symbols-outlined !text-[18px] text-gray-500 dark:text-gray-300">lock</span>
<span class="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">Draft saved locally</span>
</div>
<!-- Actions -->
<div class="flex flex-col w-full gap-3 mt-4">
<button class="flex w-full items-center justify-center gap-2 rounded-xl h-14 bg-primary text-black text-base font-bold tracking-tight transition-transform hover:scale-[1.02] active:scale-[0.98]">
<span class="material-symbols-outlined !text-[20px]">refresh</span>
<span>Retry Saving</span>
</button>
<button class="flex w-full items-center justify-center gap-2 rounded-xl h-12 bg-transparent text-gray-500 dark:text-gray-400 text-sm font-semibold tracking-wide hover:text-gray-900 dark:hover:text-white transition-colors">
<span class="material-symbols-outlined !text-[18px]">content_copy</span>
<span>Copy Text to Clipboard</span>
</button>
</div>
</main>
<!-- Bottom Navigation -->
<nav class="sticky bottom-0 z-10 border-t border-gray-100 dark:border-white/5 bg-background-light dark:bg-background-dark pb-safe">
<div class="flex items-center justify-around px-2 py-4">
<a class="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined !text-[28px]">home</span>
</a>
<a class="flex flex-col items-center gap-1 p-2 text-primary" href="#">
<span class="material-symbols-outlined !text-[28px] fill-current">book_2</span>
<span class="size-1 bg-primary rounded-full mt-1"></span>
</a>
<a class="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined !text-[28px]">explore</span>
</a>
<a class="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined !text-[28px]">person</span>
</a>
</div>
</nav>
<!-- Spacer for safe area support on mobile -->
<div class="h-6 w-full bg-background-light dark:bg-background-dark"></div>
</div>
</body></html>