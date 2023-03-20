import { Text } from "react-native";


export function HandwritingText(props: Text["props"]) {
    return (
        <Text
        {...props} 
        style={[props.style, {fontFamily: "handwriting"}]} />
    )
}