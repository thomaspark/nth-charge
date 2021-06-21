(function(){
  const state = {
    levels: [],
    current: 0
  }

  const game = {
    init: function() {
      document.querySelector('#input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          game.check();
        }
      });

      document.querySelector('#button').addEventListener('click', () => {
        game.check();
      });

      fetch('./levels.json')
        .then(response => response.json())
        .then(data => {
          state.levels = data.levels;
          document.querySelector('#total').textContent = state.levels.length;
          game.load();
        });
    },
    load: function() {
      document.body.classList.remove('win');
      document.querySelector('#current').textContent = state.current + 1;
      document.querySelector('#input').value = '';
      document.querySelectorAll('.phone').forEach(phone => phone.classList.remove('low', 'charging', 'charged'));

      const solutions = state.levels[state.current];
      document.querySelectorAll('.phone:nth-child(' + solutions[0] + ')').forEach(phone => phone.classList.add('low'));
    },
    check: function() {
      const value = document.querySelector('#input').value.replace(/\s/g, '');
      document.querySelectorAll('.phone').forEach(phone => phone.classList.remove('charging'));

      try {
        document.querySelectorAll('.phone:nth-child(' + value + ')').forEach(phone => phone.classList.add('charging'));


        const solutions = state.levels[state.current];

        if (solutions.includes(value)) {
          document.querySelectorAll('.phone').forEach(phone => phone.classList.add('charged'));

          setTimeout(() => {
            if (state.current < state.levels.length - 1) {
              state.current++;
              game.load();
            } else {
              game.win();
            }
          }, 2000);
        }
      } catch {
        console.error('Invalid value.');
      }
    },
    win: function() {
      document.body.classList.add('win');
    }
  }

  game.init();

})();
