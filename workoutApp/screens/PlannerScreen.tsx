import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { View, Alert, StyleSheet, FlatList, Text } from "react-native"
import slugify from 'slugify';
import ExerciseForm, { ExerciseFormData } from '../components/ExerciseForm';
import ExerciseItem from '../components/ExerciseItem';
import { Modal } from '../components/styled/Modal';
import { PressableText } from '../components/styled/PressableText';
import { PressableThemeText } from '../components/styled/PressableThemeText';
import WorkoutForm, { WorkoutFormData } from '../components/WorkoutForm';
import { RootStackParamList } from '../navigation';
import { storeWorkout } from '../storage/workout';
import { SequenceItem, SequenceType, Workout } from '../types/data';

type Props = NativeStackScreenProps<RootStackParamList, 'Planner'>;

export default function PlannerScreen({ navigation }: Props) {

    const [sequenceItems, setSequenceItems] = useState<SequenceItem[]>([]);

    const handleExerciseSubmit = (form: ExerciseFormData) => {
        const sequenceItem: SequenceItem = {
            slug: slugify(form.name + " " + Date.now(), { lower: true }),
            name: form.name,
            type: form.type as SequenceType,
            duration: Number(form.duration)
        };

        if (form.reps) {
            sequenceItem.reps = Number(form.reps)
        }

        setSequenceItems([...sequenceItems, sequenceItem]);
    }

    const computeDiff = (exercisesCount: number, workoutDuration: number) => {
        const intensity = workoutDuration / exercisesCount;

        if (intensity <= 60) {
            return "hard";
        } else if (intensity <= 100) {
            return "medium";
        } else {
            return "easy";
        }
    };

    const handleWorkoutSubmit = async (form: WorkoutFormData) => {
        if (sequenceItems.length > 0) {
            const duration = sequenceItems.reduce((acc, item) => {
                return acc + item.duration;
            }, 0);
            const workout: Workout = {
                name: form.name,
                slug: slugify(form.name + " " + Date.now(), { lower: true }),
                duration: duration,
                difficulty: computeDiff(sequenceItems.length, duration),
                sequence: [...sequenceItems]
            };
            await storeWorkout(workout);
        }


    }

    return (
        <View style={styles.container}>
            <FlatList
                data={sequenceItems}
                keyExtractor={item => item.slug}
                renderItem={({ item, index }) =>
                    <ExerciseItem item={item}>
                        <PressableText text='Remove'
                            onPressIn={() => {
                                const items = [...sequenceItems];
                                items.splice(index, 1);
                                setSequenceItems(items);
                            }} />
                    </ExerciseItem>
                } />
            <ExerciseForm onSubmit={handleExerciseSubmit} />
            <View>
                <Modal activator={({ handleOpen }) => <PressableThemeText
                    text='Create workout'
                    onPress={handleOpen}
                    style={{ marginTop: 15 }} />} >
                        { ({handleClose}) => <View>
                        <WorkoutForm
                            onSubmit={async (data) => {
                                await handleWorkoutSubmit(data);
                                handleClose();
                                navigation.navigate("Home");
                                }} />
                    </View>

                        }
                    
                </Modal>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    }
})