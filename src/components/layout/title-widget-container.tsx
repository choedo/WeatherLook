import Title from '@/components/typography/title';

interface Props {
  title: string;
  children: React.ReactNode;
  extract?: React.ReactNode;
  withLine?: boolean;
}

export default function TitleWidgetContainer({
  title,
  children,
  extract,
  withLine,
}: Props) {
  return (
    <div className={'w-full flex flex-col gap-2'}>
      <Title extract={extract} withLine={withLine}>
        {title}
      </Title>
      {children}
    </div>
  );
}
