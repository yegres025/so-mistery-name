<script lang="ts">
  import getData from './utilities/api';
  import { onMount } from 'svelte';

  let currenciesData = {};
  let firstValue;
  let secondValue;
  let firstRate;
  let secondRate;
  $: formattedFirstRate = firstRate ? firstRate.toFixed(2) : '';
  $: formattedSecondRate = secondRate ? secondRate.toFixed(2) : ''

  const currencyData = async () => {
    try {
      const response = await getData();
      return response;
    } catch {
      throw new Error();
    }
  };

  const handleSelect = (e, flag) => {
    for (let key in currenciesData) {
      if (e.target.value === key) {
        if (flag) {
          firstRate = currenciesData[key];
        } else {
          secondRate = currenciesData[key];
        }
      }
    }
  };

  const handleFirstCalculate = () => {
    secondValue = (firstValue / firstRate) * secondRate;
  };

  const handleSecondCalculate = () => {
    firstValue = (secondValue / secondRate) * firstRate;
  };

  onMount(async () => {
    currenciesData = await currencyData();
    currenciesData = { 'Enter value': 'Enter value', ...currenciesData };
  });
  
</script>

<main>
  <form>
    <div>
      <select
        on:change={(e) => {
          handleSelect(e, 1), handleSecondCalculate();
        }}
      >
        {#each Object.keys(currenciesData) as currencie}
          <option>{currencie}</option>
        {/each}
      </select>
      <input
        placeholder="Enter your value"
        type="number"
        bind:value={firstValue}
        on:input={handleFirstCalculate}
      />
      <span>relative to USD {formattedFirstRate}</span>
    </div>
    <div>
      <select
        on:change={(e) => {
          handleSelect(e, 0), handleFirstCalculate();
        }}
      >
        {#each Object.keys(currenciesData) as currencie}
          <option>{currencie}</option>
        {/each}
      </select>
      <input
        placeholder="Enter your value"
        type="number"
        bind:value={secondValue}
        on:input={handleSecondCalculate}
      />
      <span>relative to USD {formattedSecondRate}</span>
    </div>
  </form>
</main>

<style>
  div {
    margin-bottom: 10px;
  }

  input {
    max-width: 120px;
    height: 32px;
    padding-left: 8px;
  }

  select {
    max-width: 120px;
    height: 38px;
  }

  span{ 
    position: fixed;
    margin: 6px 12px
  }
</style>
