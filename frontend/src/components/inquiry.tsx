interface InquiryProps {
  title: string;
  date: string;
  description: string;
}

const Inquiry = ({title, date, description}: InquiryProps) => {
  return (
    <div className="rounded-lg border-gray-200 border mt-10 p-6 space-y-4">
      <h1 className="text-xl font-semibold text-gray-800 justify-self-start">
        {title}
      </h1>
      <p className="text-sm text-orange-600 justify-self-start">{date}</p>
      <p className="text-md text-gray-500 justify-self-start text-justify">
        {description}
      </p>
    </div>
  );
}

export default Inquiry;