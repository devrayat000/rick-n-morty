import { PureComponent } from "react";
import { Text } from "@mantine/core";

export interface InfoProps {
  label: string;
  children: React.ReactNode;
}

export default class Info extends PureComponent<InfoProps> {
  render() {
    if (!this.props.children) {
      return null;
    }

    return (
      <Text weight={400} size="xl" component="p" my={0}>
        <b>{this.props.label}: </b>
        {this.props.children}
      </Text>
    );
  }
}
