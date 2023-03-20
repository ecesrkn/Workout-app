import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HandwritingText } from '../components/styled/HandwritingText';
import { View, StyleSheet, FlatList, Pressable, Alert } from "react-native"
import { RootStackParamList } from '../navigation';
import WorkoutItem from '../components/WorkoutItem';
import { useWorkouts } from '../hooks/useWorkouts';
import { ThemeText } from '../components/styled/Text';


type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
    const workouts = useWorkouts();

    return (
        <View style={styles.container}>
            <ThemeText
                style={styles.header} >
                New Workouts
            </ThemeText>
            <FlatList data={workouts}
                keyExtractor={item => item.slug}
                renderItem={({ item }) => {
                    return (
                        <Pressable onPress={() => navigation.navigate("WorkoutDetail", {slug: item.slug})}>
                            <WorkoutItem
                                item={item} />
                        </Pressable>
                    )
                }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    header: {
        fontSize: 40,
        marginBottom: 20,
    }
})