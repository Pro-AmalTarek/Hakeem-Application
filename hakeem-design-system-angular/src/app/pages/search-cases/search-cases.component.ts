import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-cases',
  templateUrl: './search-cases.component.html',
  styleUrls: ['./search-cases.component.scss']
})
export class SearchCasesComponent implements OnInit {

  cases: Case[] = []; // Array of message objects
  newQuestion: string = ''; // Stores the current message being typed
  constructor() { }

  ngOnInit(): void {
  }


  // Function to send user message and simulate bot response
  sendMessage() {
    if(this.cases.length > 0){
    this.cases=[];
  // Simulate bot response with delay
  setTimeout(() => {
    this.addBotResponse();
    this.newQuestion = ''
  }, 1000); // 1-second delay
    }
      
    

    if (this.newQuestion.trim()) {
    
      // Simulate bot response with delay
      setTimeout(() => {
        this.addBot2Response();
        this.newQuestion = ''
      }, 1000); // 1-second delay
    }
  }

  // Function to add bot response
  addBotResponse() {
    var botResponse = "تدور القضية حول عقد بيع عقار. حيث قام شخص بشراء عقار ودفع جزءًا من ثمنه، ولكن تأخر في دفع الباقي بسبب تأخر إصدار صك الملكية.\\n"+
"رفض القاضي دعوى المشتري بفسخ العقد. وألزم المشتري بدفع باقي الثمن، مؤكدًا على أهمية الالتزام بالعقود المبرمة.\\n"+
"استند الحكم على قوة العقد ومسؤولية الطرفين بتنفيذ التزاماتهما. حتى في حالة وجود تأخيرات، إلا إذا كانت هذه التأخيرات جوهرية وتؤثر بشكل كبير على العقد\\n"
; // Customize bot response
    this.cases.push({ title: 'قضية 1', content: botResponse.replace(/\\n/g, '<br>') });

    botResponse =`قضية فسخ  نكاح بسبب مرض نفسي: تقدمت امرأة بدعوى لفسخ نكاحها من زوجها بداعي إصابته بمرض نفسي يمنعه من أداء حقوق الزوجية.\\n
وقد استندت المحكمة في حكمها على تقرير طبي يؤكد إصابة الزوج بمرض نفسي، وقامت بفسخ النكاح حفاظًا على مصلحة الزوجة.\\n
كما أكدت المحكمة على مبدأ إزالة الضرر الذي يبيح فسخ النكاح في مثل هذه الحالات.`
    this.cases.push({ title: 'قضية 2', content: botResponse.replace(/\\n/g, '<br>') });

    botResponse ="نزاع حول عقد عمل: تدور القضية حول خلاف نشأ بين كفيل عاملة منزلية والعاملة نفسها بعد أن هربت من العمل.\\n"+
"المطالبة بالتعويض: رفع الكفيل دعوى قضائية يطالب فيها العاملة بتعويض عن تكاليف استقدامها.\\n"+
"حكم لصالح الكفيل: قضت المحكمة لصالح الكفيل وألزمته العاملة بدفع المبلغ الذي أنفقه على استقدامها، نظراً لعدم وجود مبرر قانوني لفسخ العقد.\\n"
        this.cases.push({ title: 'قضية 3', content: botResponse.replace(/\\n/g, '<br>') });
  }

  // Function to add bot response
  addBot2Response() {
    var botResponse =`نزاع على عقد إيجار: نشأ نزاع بين مستأجر ومالك عقار حول حق المستأجر في استكمال مدة الإيجار.
بيع العقار: قام المالك ببيع العقار لشخص آخر أثناء فترة الإيجار، إلا أن المستأجر يرى أن عقد الإيجار لا يزال سارياً.
حكم لصالح المستأجر: قضت المحكمة بأن المستأجر يحق له البقاء في العقار حتى نهاية مدة العقد، وذلك استناداً إلى مبدأ سريان العقود حتى نهاية مدتها، وأن شراء العقار لا يلغي حقوق المستأجر` // Customize bot response
    this.cases.push({ title: 'قضية 1', content: botResponse.replace(/\\n/g, '<br>') });

    botResponse =`
نزاع على تأجير عقار: قام شخص (المدعى) برفع دعوى قضائية ضد آخر (المدعى عليه) بسبب تأجيره فيلا مجاورة لفيلا المدعي لمجموعة من العزاب، مما تسبب في إزعاج للمدعي.

اختصاص المحكمة: قضت المحكمة بأن الدعوى يجب أن تُرفع على المستأجرين وليس على الوسيط العقاري (المدعى عليه)، وذلك لأن الضرر المباشر ينتج عن تصرفات المستأجرين وليس الوسيط.

رفض الدعوى: وبناءً على ذلك، رفضت المحكمة الدعوى المقامة ضد الوسيط العقاري، وحكمت بصرف النظر عنها، مع توجيه المدعي برفع دعوى مستقلة ضد المستأجرين.`
    this.cases.push({ title: 'قضية 2', content: botResponse.replace(/\\n/g, '<br>') });

    botResponse =`ع على عقد إيجار: نشأ نزاع قانوني بين مالك عقار ومستأجر أجنبي غادر البلاد.
أسباب النزاع: سبب النزاع هو عدم سداد المستأجر للإيجار المتفق عليه، بالإضافة إلى مغادرته للبلاد دون تسوية المديونية.
الحكم القضائي: قضت المحكمة بفسخ عقد الإيجار لصالح المالك، أي إلغاء العقد وإعادة الشقة إلى المالك. كما قررت المحكمة حماية ممتلكات المستأجر المتبقية في الشقة عن طريق حفظها في بيت المال أو بيعها في حال كانت قابلة للتلف.`
        this.cases.push({ title: 'قضية 3', content: botResponse.replace(/\\n/g, '<br>') });
  }
}

