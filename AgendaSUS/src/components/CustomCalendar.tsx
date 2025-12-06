import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  PanResponder,
  Dimensions
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/pt-br";

moment.locale("pt-br");

// 📌 ESTILO DO CALENDÁRIO
const SCREEN_WIDTH = Dimensions.get("window").width;

const calendario = {
  width: SCREEN_WIDTH * 0.95,
  marginTop: 10,
  marginBottom: 20,
  backgroundColor: "transparent",
  alignSelf: "center",
};

export default function CustomCalendar({
  selectedDate,
  onSelectDate,
  minDate,
  theme
}: {
  selectedDate: string;
  onSelectDate: (d: string) => void;
  minDate: string;
  theme: any;
}) {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const SWIPE_THRESHOLD = 50;

  // 📌 GESTO NATIVO (PanResponder)
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          setCurrentMonth(prev => prev.clone().subtract(1, "month"));
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          setCurrentMonth(prev => prev.clone().add(1, "month"));
        }
      }
    })
  ).current;

  // 📌 GERA GRID DO CALENDÁRIO
  const generateCalendar = () => {
    const start = currentMonth.clone().startOf("month").startOf("week");
    const end = currentMonth.clone().endOf("month").endOf("week");

    const day = start.clone();
    const calendar: moment.Moment[][] = [];

    while (day.isBefore(end, "day")) {
      const week: moment.Moment[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(day.clone());
        day.add(1, "day");
      }
      calendar.push(week);
    }
    return calendar;
  };

  const calendar = generateCalendar();
  const today = moment().format("YYYY-MM-DD");
  const isBeforeMin = (d: moment.Moment) => d.isBefore(moment(minDate), "day");

  return (
    <View
      {...panResponder.panHandlers}
      style={[calendario, { borderRadius: 12, paddingBottom: 10 }]}
    >
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: theme.placeholder
        }}
      >
        <TouchableOpacity
          onPress={() =>
            setCurrentMonth(prev => prev.clone().subtract(1, "month"))
          }
        >
          <AntDesign name="left" size={22} color={theme.primary} />
        </TouchableOpacity>

        <Text style={{ fontSize: 18, fontWeight: "bold", color: theme.text }}>
          {currentMonth.format("MMMM YYYY")}
        </Text>

        <TouchableOpacity
          onPress={() =>
            setCurrentMonth(prev => prev.clone().add(1, "month"))
          }
        >
          <AntDesign name="right" size={22} color={theme.primary} />
        </TouchableOpacity>
      </View>

      {/* DIAS DA SEMANA */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: 8
        }}
      >
        {daysOfWeek.map(d => (
          <Text
            key={d}
            style={{
              width: 30,
              textAlign: "center",
              color: theme.text,
              fontWeight: "bold"
            }}
          >
            {d}
          </Text>
        ))}
      </View>

      {/* GRID DE DIAS */}
      {calendar.map((week, wi) => (
        <View
          key={wi}
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 6
          }}
        >
          {week.map((d, di) => {
            const dateStr = d.format("YYYY-MM-DD");
            const isToday = dateStr === today;
            const isSelected = dateStr === selectedDate;

            const isOutsideMonth = d.month() !== currentMonth.month();
            const disabled = isOutsideMonth || isBeforeMin(d);

            if (isOutsideMonth) {
              return <View key={di} style={{ width: 32, height: 32 }} />;
            }

            return (
              <TouchableOpacity
                key={di}
                disabled={disabled}
                onPress={() => onSelectDate(dateStr)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: isSelected ? theme.primary : "transparent",
                  opacity: disabled ? 0.25 : 1
                }}
              >
                <Text
                  style={{
                    color: disabled
                      ? theme.placeholder
                      : isSelected
                      ? theme.background
                      : isToday
                      ? theme.success
                      : theme.text,
                    fontWeight: "600"
                  }}
                >
                  {d.date()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}
