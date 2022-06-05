<div class="container" id="app">
  <h1>Vragenlijst</h1>
  <div class="pol">
    <input type="text" v-model="que" :class="inputCls" autofocus>
    <span class="addBtn">
     
        <button @click="inputCls='inputbox extend'" 
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" 
        v-if="!showIcon">Voeg een vraag</button>
        <button @click="addqueS" 
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
         v-else>Add</button>
      
    </span>
  </div>

  <div class="section">
    <ul class="queS" v-if="queS.length > 0">
      <transition-group name="list">
        <li :class="bgColour" v-for="(item) in queS" :key="item">
          <span>{{ item.task }}</span>
          
         
          <span>
           

       

            <button @click="deleteque()" 
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Delete</button>

            <select class="bg-gray-500" v-model="bgColour">
   <option v-for="myClass in classes" :value="myClass">{{ myClass }}
    
  </option>
</select>

          </span>
        </li>
        
        
      </transition-group>
    </ul>
    <h3 v-else>Geen vraag om weer te geven. Voeg er een toe.</h3>
  </div>
</div>



watch: {
    que(value) {
      if(value.length > 2) {
        this.showIcon = true;
      }
      else {
        this.showIcon = false;
      }
    }
  }

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