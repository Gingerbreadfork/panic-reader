<script lang="ts">
  let textToRead = "";
  let wordBeingRead = "";
  let countdownLength = 3;
  let wordsPerMinute = 200;
  let showSettings = false;
  let deleteAfter = false;
  let readForever = false;
  let countDownEnabled = true;
  let currentWordPosition = 0;
  let showProgress = true;
  let splitWords = [];
  let isReading = false;
  let paused = false;

  async function countdown() {
    for (var i = 1; i < countdownLength; i++) {
      wordBeingRead = i.toString();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    wordBeingRead = i.toString();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    wordBeingRead = "🟢";
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  async function readWordByWord() {
    showSettings = false;
    splitWords = textToRead.split(/\s+/);
    if (countDownEnabled) {
      await countdown();
    }
    isReading = true;

    if (!paused) {
      currentWordPosition = 0;
    }

    paused = false;

    while (currentWordPosition < splitWords.length) {
      wordBeingRead = splitWords[currentWordPosition];

      if (paused) {
        break;
      }
      console.log("Here");
      currentWordPosition++;

      await new Promise((resolve) =>
        setTimeout(resolve, 60000 / wordsPerMinute)
      );
    }

    if (readForever) {
      readWordByWord();
    }

    if (deleteAfter) {
      textToRead = "";
    }

    if (!readForever) {
      isReading = false;
    }

    if (!paused) {
      wordBeingRead = "✅ Reading Complete";
    }
  }
</script>

<main class="bg-gray-200 min-h-screen">
  <div class="p-6">
    <h2 class="text-2xl mb-2 font-semibold text-indigo-600">
      <svg
        class="w-8 h-8 mr-1 inline text-amber-500 fill-amber-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        /></svg
      >Panic Reader
    </h2>
    <textarea
      class="textarea textarea-info w-full"
      rows="4"
      placeholder="What do you want to read?"
      bind:value={textToRead}
    />

    <input
      bind:value={wordsPerMinute}
      type="range"
      min="200"
      max="2000"
      class="range range-xs"
      step="50"
    />
    <div class="w-full flex justify-between text-xs px-2" />

    <span class="flex justify-end text-xs font-semibold"
      >{wordsPerMinute} WPM</span
    >

    {#if !isReading}
      <button on:click={readWordByWord} class="btn btn-primary btn-sm"
        ><svg
          class="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          /></svg
        >Read</button
      >
    {:else}
      <button
        on:click={() => {
          paused = true;
        }}
        class="btn btn-primary btn-sm"
        ><svg
          class="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg
        >Pause</button
      >
    {/if}
    <button
      on:click={() => {
        showSettings = !showSettings;
      }}
      class="btn btn-secondary btn-sm"
      ><svg
        class="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        /><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        /></svg
      >Settings</button
    >

    {#if showSettings}
      <div class="card w-full md:w-1/2 lg:w-1/3 bg-gray-100 shadow-xl mx-auto">
        <div class="card-body">
          <span class="inline-block">
            <div class="card-actions justify-end">
              <button
                class="btn btn-square btn-sm"
                on:click={() => {
                  showSettings = false;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  /></svg
                >
              </button>
            </div>

            <div class="form-control">
              <label class="label cursor-pointer">
                <input
                  type="checkbox"
                  bind:checked={showProgress}
                  class="toggle toggle-primary"
                />
                <span class="label-text mr-auto ml-4">Show Progress Bar</span>
              </label>
              <label class="label cursor-pointer">
                <input
                  type="checkbox"
                  bind:checked={countDownEnabled}
                  class="toggle toggle-primary"
                />
                <span class="label-text mr-auto ml-4"
                  >Countdown Before Reading</span
                >
              </label>
              <label class="label cursor-pointer">
                <input
                  type="checkbox"
                  bind:checked={deleteAfter}
                  class="toggle toggle-primary"
                />
                <span class="label-text mr-auto ml-4"
                  >Delete Text After Reading is Complete</span
                >
              </label>
              <label class="label cursor-pointer">
                <input
                  type="checkbox"
                  bind:checked={readForever}
                  class="toggle toggle-primary"
                />
                <span class="label-text mr-auto ml-4">Loop & Read Forever</span>
              </label>
            </div>

            {#if deleteAfter && readForever}
              <p class="text-xs text-red-400">
                * Delete after reading clashes with read forever mode and will
                not work
              </p>
            {/if}
          </span>
        </div>
      </div>
    {/if}

    {#if !showSettings}
      <p class="text-black text-center text-4xl py-64">{wordBeingRead}</p>
      {#if showProgress}
        <progress
          class="progress w-full"
          value={currentWordPosition}
          max={splitWords.length}
        />
      {/if}
    {/if}

    {#if currentWordPosition > 0 && !showSettings}
      <button
        on:click={() => {
          currentWordPosition = 0;
        }}
        class="btn m-2 btn-outline btn-xs"
        ><svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          /></svg
        ></button
      >
      <button
        on:click={() => {
          if (currentWordPosition > 100) {
            currentWordPosition = currentWordPosition - 100;
          }
        }}
        class="btn m-2 btn-outline btn-xs"
        ><svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          /></svg
        ></button
      >
      <button
        on:click={() => {
          if (currentWordPosition > 10) {
            currentWordPosition = currentWordPosition - 10;
          }
        }}
        class="btn m-2 btn-outline btn-xs"
        ><svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          /></svg
        ></button
      >
      <button
        on:click={() => {
          if (currentWordPosition + 10 < splitWords.length) {
            currentWordPosition = currentWordPosition + 10;
          }
        }}
        class="btn m-2 btn-outline btn-xs"
        ><svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          /></svg
        ></button
      >
      <button
        on:click={() => {
          if (currentWordPosition + 100 < splitWords.length) {
            currentWordPosition = currentWordPosition + 100;
          }
        }}
        class="btn m-2 btn-outline btn-xs"
        ><svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          /></svg
        ></button
      >
    {/if}
  </div>
</main>
