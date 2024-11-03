import { useTranslations } from "next-intl";

interface Props {
  createdAt: string;
}

const FormattedDate: React.FC<Props> = ({ createdAt }) => {
  const t = useTranslations("months");
  const date = new Date(createdAt);
  const monthIndex = date.getMonth() + 1;

  console.log(t("1"));
  return (
    <span>{`${
      t(monthIndex.toString())
    } ${date.getDate()}, ${date.getFullYear()}`}</span>
  );
};

export default FormattedDate;
