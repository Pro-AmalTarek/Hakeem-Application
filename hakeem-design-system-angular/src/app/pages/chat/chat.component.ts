import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: Message[] = []; // Array of message objects
  newMessage: string = ''; // Stores the current message being typed
  message1 = `
استنادًا إلى القضايا السابقة والقوانين السعودية، يمكن القول إن المالك لا يحق له بيع العقار لشخص آخر أثناء فترة الإيجار. إذا قام المالك ببيع العقار لشخص آخر أثناء فترة الإيجار، فإن المحكمة ستقضي بأن المستأجر يحق له البقاء في العقار حتى نهاية مدة العقد.

في المملكة العربية السعودية، يعتبر مبدأ سريان العقود حتى نهاية مدتها مبدأً قانونيًا مهمًا. يعني هذا المبدأ أن العقود تظل سارية المفعول حتى تنتهي مدتها المحددة. عند بيع العقار أثناء فترة الإيجار، لا يؤثر ذلك على حقوق المستأجر في البقاء في العقار حتى نهاية مدة العقد.

في المجمل، يجب على المالك احترام حقوق المستأجر وعدم بيع العقار أو تأجيره لشخص آخر أثناء فترة الإيجار دون موافقة المستأجر الأصلي. يجب على المالك الجديد الالتزام بمبدأ سريان العقود حتى نهاية مدتها واحترام حقوق المستأجر.

في حالة وجود مبالغ مالية متعلقة بالإيجار، يجب على المالك الجديد الالتزام بدفع الإيجار المستحق للمالك الأصلي حتى نهاية مدة العقد.

في حالة النزاع بين المستأجر والمالك الجديد، يمكن للمستأجر اللجوء إلى القضاء للمطالبة بحقوقه وفقًا للعقد المبرم مع المالك الأصلي. يجب على المالك الجديد احترام حقوق المستأجر وعدم محاولة طرده قبل انتهاء مدة العقد.

في المجمل، يجب على المالك احترام حقوق المستأجر وعدم بيع العقار أو تأجيره لشخص آخر أثناء فترة الإيجار دون موافقة المستأجر الأصلي. يجب على المالك الجديد الالتزام بمبدأ سريان العقود حتى نهاية مدتها واحترام حقوق المستأجر.`
  
message2=`استنادًا إلى القضايا والقوانين المذكورة، يمكن القول إنه في حالة الزواج دون دخول وفُسخ النكاح، لا يحق للزوج استرداد الهدايا التي قدمها للمرأة.

في المملكة العربية السعودية، تعتبر الهدايا المقدمة في إطار الزواج هدايا زواج ولا يمكن استردادها وفقًا للشريعة الإسلامية.  رفضت المحكمة طلب الزوج باسترداد الهدايا والمصاريف التي أنفقها على الزواج، وذلك استنادًا إلى أحكام الشريعة الإسلامية والقواعد القانونية المتعلقة بعقود الزواج والهبات.

في المجمل، يجب على الزوج احترام مبدأ عدم استرداد هدايا الزواج وعدم المطالبة باسترداد المصاريف التي أنفقها على الزواج بعد فسخه. يجب على الطرفين الالتزام بأحكام الشريعة الإسلامية والقواعد القانونية المتعلقة بعقود الزواج والهبات.

في المجمل، يجب على الزوج احترام مبدأ عدم استرداد هدايا الزواج وعدم المطالبة باسترداد المصاريف التي أنفقها على الزواج بعد فسخه. يجب على الطرفين الالتزام بأحكام الشريعة الإسلامية والقواعد القانونية المتعلقة بعقود الزواج والهبات.

في حالة وجود نزاع بين الطرفين، يمكن اللجوء إلى القضاء للمطالبة بحقوقهم وفقًا للشريعة الإسلامية والقوانين المعمول بها في المملكة العربية السعودية. يجب على الطرفين احترام حقوق بعضهما البعض والالتزام بالقرارات القضائية الصادرة في هذا الشأن.`
constructor(private api: APIService) { }

  ngOnInit(): void {

  }

  // Function to handle sending user message and bot response
  sendMessage(event: Event) {
    event.preventDefault(); // Prevent page refresh
    debugger;
    if (this.newMessage.trim()) {

      this.messages.push({ sender: 'user', text: this.newMessage });


      this.api.CallAllamAPI({"user_input": this.newMessage}).subscribe(res => {
        this.newMessage = ''; // Clear the input field
        console.log(res)
        this.messages.push({ sender: 'bot', text: res.response });
        //this.isLoading = false;
      }, err => {
        //this.isLoading = false;
        //this.userForm.setErrors(err);
      });
    }
  }

  // Function to handle sending user message and bot response
  sendMessag(event: Event) {
    event.preventDefault(); // Prevent page refresh
    debugger;
    if (this.newMessage.trim()) {

      this.messages.push({ sender: 'user', text: this.newMessage });

 // Simulate bot response with delay
 setTimeout(() => {
  this.addBotResponse();
  this.newMessage = ''
}, 1000); // 1-second delay
}
  }
     
  addBotResponse() {
    this.messages.push({ sender: 'bot', text: this.messages.length ==1 ? this.message1: this.message2 });
  }
  }

