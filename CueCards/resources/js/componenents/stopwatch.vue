<template>
  <div id="app">

      <div class="grid  h-screen ">
       
        <p :class="'grid bg-white-600 place-items-center text-5xl ... '+'text-' + textColor">

      <span >
        {{ minutes }}:{{ seconds }}
      </span>

    </p>
     <div class="  flex py-5 space-x-4 justify-center flex-row ...">
     
    <div><button class="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
     @click="start">Start</button>
     </div>

    <div><button class="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full" 
    @click="stop">Stop</button>
    </div>

    <div><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" 
    @click="reset">Reset</button>
    </div>

   </div>

<div class="flex py-5 space-x-4 justify-center flex-row ...">

    <form class="bg-white px-8 space-x-2  ">
		 <input type="number" 
     class="shadow appearance-none border rounded w-25 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      v-model="minutes" 
      name="time_m" id="min" min="0" max="59">

		<input type="number" 
    class="shadow appearance-none border rounded w-25 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "  
    v-model="seconds" 
    name="time_s" id="sec" max="59" min="0">

		 <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded" 
     @click="sendTime">Set time</button>

	</form>

    <form class="bg-white  space-x-2 px-8 ">
		 <input type="number" 
     class="shadow appearance-none border rounded w-25 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  "  
     v-model="nonActiveWarningMinutesOrange" 
     name="time_m" id="minWarnOrange" min="0" max="59">

		<input type="number" 
    class="shadow appearance-none border rounded w-25 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  "  
    v-model="nonActiveWarningSecondsOrange" 
    name="time_s" id="secWarnOrange" max="59" min="0">

		 <button type="button" 
     class="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-3 rounded" 
     @click="updateWarningOrange">Set warning orange</button>
	</form>

 <form class="bg-white px-8 space-x-2 ">
   
		 <input type="number" 
     class="shadow appearance-none border rounded w-25 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  "  
     v-model="nonActiveWarningMinutesRed" 
     name="time_m1" id="minWarnRed" min="0" max="59">

		<input type="number" 
    class="shadow appearance-none border rounded w-25 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "  
    v-model="nonActiveWarningSecondsRed" 
    name="time_s1" id="secWarnRed" max="59" min="0">

		 <button type="button" 
     class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded" 
     @click="updateWarningRed">Set warning Red</button>

	</form>
  </div>
    </div>
   
    <cuecards-comp />

   

  </div>
</template>
  

<script>
if (typeof(Storage) !== "undefined") {
    function getqueS() {
      let queS = localStorage.getItem('queS');
      return JSON.parse(queS);
    }
    function savequeS(queS) {
      let t = JSON.stringify(queS);
      return localStorage.setItem('queS', t);
    }
} else {
    console.log('No local storage');
}


import CueCardsVue from "../../../../vue-stopwatch-app/src/components/CueCards.vue";
// import setAlarmTimeVue from "./setAlarmTime.vue";
 export default {
  name: "App",
  components:{
      'cuecards-comp': CueCardsVue
      // 'alramTime-comp':setAlarmTimeVue
  },
  data() {
    return {
    
    que: '',
    queS: [],
    inputCls: 'inputbox',

    bgColour: 'white',
    classes: [ 'Blue', 'Red', 'Green','Orange','Gray','Magenta','Cyan'
    ],

      elapsedTime: 0,
      timer: undefined,
      time: 0,
      minutes: 0,
      seconds: 0,
      setMinutes: 0,
      setSeconds: 0,

      nonActiveWarningMinutesRed: 0,
      nonActiveWarningSecondsRed: 0,
      nonActiveWarningMinutesOrange : 0,
      nonActiveWarningSecondsOrange: 0,

      warningMinutesRed: undefined,
      warningSecondsRed: undefined,
      warningMinutesOrange: undefined,
      warningSecondsOrange: undefined,
    };
  },
   watch: {
    que(value) {
      if(value.length > 2) {
        this.showIcon = true;
      }
      else {
        this.showIcon = false;
      }
    }
  },
  

  methods: {
     addqueS() {
      this.inputCls = 'inputbox';
      this.queS.unshift(
        {
          task: this.que,
          completed: false
        }
      );
      this.que = '';
      setTimeout(() => {
        this.showIcon = false;
      }, 1000);
    },
   
    deleteque(index) {
      this.queS.splice(index, 1);
    },

    sendTime() {
        this.minutes = document.getElementById("min").value;
        this.seconds = document.getElementById("sec").value;
    },
    updateWarningRed() {
      console.log(this.nonActiveWarningSecondsRed && this.nonActiveWarningMinutesRed);
      this.warningMinutesRed = this.nonActiveWarningMinutesRed;
      this.warningSecondsRed = this.nonActiveWarningSecondsRed;
    },
    updateWarningOrange() {
      console.log(this.nonActiveWarningSecondsOrange);
      this.warningMinutesOrange = this.nonActiveWarningMinutesOrange;
      this.warningSecondsOrange = this.nonActiveWarningSecondsOrange;
    },
    start() {
      this.timer = setInterval(() => {
        if (this.seconds > 58) {
          this.seconds = 1;
          this.minutes = parseInt(this.minutes) + 1;
        } else {
          this.seconds++;
        }
      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
    },
    reset() {
      this.minutes = 0;
      this.seconds = 0;
        this.warningMinutesRed = undefined;
      this.warningSecondsRed = undefined;
        this.warningMinutesOrange = undefined;
      this.warningSecondsOrange = undefined;
    }
  },
  computed: {
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.seconds);
      date.setMinutes(this.minutes);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") - 2, 8);
    },
    textColor() {
      if (
        this.warningSecondsRed != null && this.warningMinutesRed != null &&
         
        this.seconds + (this.minutes * 60) >= this.warningSecondsRed + (this.warningMinutesRed * 60) && 
        this.minutes >= this.warningMinutesRed
      ) {
        return 'red';
      } else if (  
        this.warningSecondsOrange != null && this.warningMinutesOrange != null && 
        
        this.seconds + (this.minutes * 60) >= this.warningSecondsOrange + (this.warningMinutesOrange * 60) && 
        this.minutes >= this.warningMinutesOrange) {
        return 'orange';
      }
      return 'black';
    }, 
  
  }
  
};


</script>

<style>
.text-black {
  color: black;
}
.text-orange {
  background-color: orange;
}
.text-red {
  background-color: red;
}
@import url('https://fonts.googleapis.com/css?family=Poppins');



a {
  text-decoration: none;
}



.pol, .section {
  padding: 1em;
  position: relative;
   
}

.container {
  width: 400px;
  margin: 40px auto;
}
.container h1 {
  font-size: 2em;
  text-align: center;
  text-transform: uppercase;
  padding: 1em;
}

.pol input {
  flex: 1;
  padding: 0 10px;
  width: 90%;
  height: 30px;
  outline: none;
  border-radius: 5px;
  border: 1px solid #00A2DF;
 
}
.pol .addBtn {
 
  border-radius: 10%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
}
.pol.addBtn i {
 
  flex: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #FFF;
  font-size: 1.5em;
}

.inputbox {
  transform: scaleX(0);
  transform-origin: right center;
  transition: all .2s ease-out;
  opacity: 0;
}
.extend {
  transform: scaleX(1);
  opacity: 1;
}

.queS {
  font-family: sans-serif;
}
.queS li {
  margin: 0 0 10px 0;
  padding: 10px;
  border: 1px solid silver;
  display: flex;
  justify-content: space-between;
}

.Blue {
  background: blue; 
}

.Red {
  background: red;
}

.Green {
  background: green;
}
.Orange {
  background: orange;
}
.Gray {
  background: gray; 
}



.Magenta {
  background: magenta;
}
.Cyan {
  background: cyan;
}

/* Add task transition */
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-20px);
}
.list-move { 
  transition: transform .2s;
}

</style>