import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const faqData = [
  {
    value: 'item-1',
    question: 'What is Quickfeed all about?',
    answer:
      'Quickfeed is a simple tool to embed feedback forms, highlight real responses, and generate smart AI summaries.',
  },
  {
    value: 'item-2',
    question: 'How does Quickfeed make feedback easier?',
    answer:
      'It lets you drop in lightweight forms anywhere and start collecting meaningful responses instantly.',
  },
  {
    value: 'item-3',
    question: 'What can I do with Quickfeed?',
    answer:
      'Quickfeed gives you smart summaries, easy setup, and smooth integration – all with a clean user experience.',
  },
  {
    value: 'item-4',
    question: 'Is my feedback data safe with Quickfeed?',
    answer:
      'Absolutely. All feedback is securely stored and managed with privacy in mind.',
  },
  {
    value: 'item-5',
    question: 'Can I download the feedback I collect?',
    answer:
      'Yes – you can easily export your feedback in CSV format for your records or analysis.',
  },
];

const CommonQuestions = () => {
  return (
    <div className="">
<Accordion
  type="single"
  collapsible
  className="mx-auto max-w-[70vw] text-primary text-sm"
>
        {faqData.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger className="text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CommonQuestions;
