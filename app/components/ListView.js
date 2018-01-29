import React from "react";
import { ScrollView } from "react-native";

class ListView extends React.Component {

  render() {
    return (
      <ScrollView {...props}
        ref={SCROLLVIEW_REF}>
        {header}
        {bodyComponents}
        {footer}
      </ScrollView>
    )
  }
};

export default ListView;
