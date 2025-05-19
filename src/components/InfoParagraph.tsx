interface InfoParagraphProps {
  label: string;
  category: string;
}

function InfoParagraph({ label, category }: InfoParagraphProps) {
  return (
    <p>
      <span className="font-semibold">{label}:</span>
      {category}
    </p>
  );
}

export default InfoParagraph;
