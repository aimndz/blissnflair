interface RenderDaysOfWeekProps {
  weekDays: string[];
}

export const renderDaysOfWeek = ({ weekDays }: RenderDaysOfWeekProps) => {
  console.log(weekDays);
  return weekDays.map((day) => (
    <div key={day} className="text-center text-xs font-medium sm:text-sm">
      {day}
    </div>
  ));
};
