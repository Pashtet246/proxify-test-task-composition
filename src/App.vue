<template>
  <v-app class="chat">
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">

      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <v-container flex fluid>
        <v-row class="chat-container" ref="chatContainer">
          <ul>
            
            <li v-for="(message, index) in chatMessages" :key="index" :class="message.owner">
              <vue-typed-js :strings="[message.text]" 
                            :showCursor="false" 
                            @onComplete="showNext()" 
                            @preStringTyped="scrollToEnd()">
                <h3 class="typing"></h3>
              </vue-typed-js>
              </li>
          </ul>
        </v-row>
        <v-row class="typer">
          <v-col cols="12" md="12">
            <v-textarea
                    filled
                    name="input-7-1"
                    label="Type your message"
                    v-model="input"
            ></v-textarea>
          </v-col>
          <v-col class="d-flex justify-end" cols="12" md="12">
            <div class="my-2">
              <v-btn align="right" 
                     :disabled="(next === messages.length) || !input" 
                     @click="send" 
                     x-large 
                     :style="{background: '#56c8d8'}" 
                     color="primary" 
                     light>
                <span v-if="next <= 2">Let's chat</span>
                <span v-else >Send Message</span>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';

interface Message {
  text: string;
  owner: string;
  ask?: string;
  type?: string;
}

export default defineComponent({
  name: 'App',
  setup(props, { root }) {
    const sendableData: { [key: string]: string | number } = {
      name: '',
      age: 0,
      location: '',
      feeling: '',
      hobby: '',
    };

    let next = 0;
    const input = ref('');
    const chatMessages: Message[] = [];
    const messages: Message[] = [
      {
        text: 'Hi, I\'m Peter!',
        owner: 'him',
      },
      {
        text: 'What\'s your name?',
        type: 'question',
        ask: 'name',
        owner: 'him',
      },
      {
        text: 'Nice to meet you!',
        type: 'answer',
        owner: 'him',
      },
      {
        text: 'How was your day?',
        type: 'question',
        ask: 'feeling',
        owner: 'him',
      },
      {
        text: 'Sounds interesting',
        type: 'answer',
        owner: 'him',
      },
      {
        text: 'Where are you from?',
        type: 'question',
        ask: 'location',
        owner: 'him',
      },
      {
        text: 'Good place!',
        type: 'answer',
        owner: 'him',
      },
      {
        text: 'How old are you?',
        type: 'question',
        ask: 'age',
        owner: 'him',
      },
      {
        text: 'Nice!',
        type: 'answer',
        owner: 'him',
      },
      {
        text: 'What\'s your favorite hobby?',
        type: 'question',
        ask: 'hobby',
        owner: 'him',
      },
      {
        text: 'Wow, cool',
        type: 'answer',
        owner: 'him',
      },
    ];

    function sendByBot() {
      chatMessages.push(messages[next++]);
    }

    onMounted(() => {
      sendByBot();
    });

    function showNext() {
      const currentAnswer = messages[next - 1].type === 'answer';
      const answerWOType = !messages[next - 1].type;
      const ownerIsMe = chatMessages[chatMessages.length - 1].owner === 'me';
      if ( currentAnswer || answerWOType || ownerIsMe) {
        sendByBot();
      }
    }

    function scrollToEnd() {
      root.$nextTick(() => {
        const container = root.$el.querySelector('.chat-container') as Element;
        container.scrollTop = container.scrollHeight;
      });
    }

    function send() {
      chatMessages.push({
        text: input.value,
        owner: 'me',
      });
      // This wasn't in task, but I think that we need to set input text to values
      sendableData[(messages[next - 1].ask as string)] = input.value;
      input.value = '';
      scrollToEnd();
    }

    return {
      send,
      showNext,
      chatMessages,
      input,
      next,
      messages,
      scrollToEnd,
    };
  },
});
</script>

<style lang="scss">
@mixin mobile {
	@media (max-width : 500px) {
		@content;
	}
}

.chat {
  .scrollable {
    overflow-y: auto;
    height: 90vh;
  }

  .chat-container{
    height: calc(100vh - 25rem);
    overflow-y: auto;
    margin-right: 35px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    @include mobile {
      margin-right: 0px;
    }

    &::-webkit-scrollbar {
        display: none; 
      }
  }

  .typer {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    bottom: 0;
    height: 4.9rem;
    width: 100%;
    background-color: #fff;
    padding: '10px';
    position: 'relative';
    background: '#ffffff';
  }

  .typer textarea {
    font-size: 1.17em;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    z-index: 0;
    width: 100%;
  }

  ul li {
    display:inline-block;
    clear: both;
    padding: 20px;
    border-radius: 30px;
    margin-bottom: 2px;
    font-family: Helvetica, Arial, sans-serif;
  }

  .him {
    background: #eee;
    float: left;
  }

  .me {
    float: right;
    background: #0084ff;
    color: #fff;
  }

  .him + .me {
    border-bottom-right-radius: 5px;
  }

  .me + .me {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .me:last-of-type {
    border-bottom-right-radius: 30px;
  }
}
</style>
