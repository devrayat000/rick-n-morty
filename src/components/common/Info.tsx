import { Text } from "@mantine/core";

export interface InfoProps {
  label: string;
  children: React.ReactNode;
}

const Info: React.FC<InfoProps> = ({ label, children }) => {
  if (!children) {
    return null;
  }

  return (
    <Text weight={400} size="xl" component="p" my={0}>
      <b>{label}: </b>
      {children}
    </Text>
  );
};

export default Info;
