<template>
    <van-calendar title="日历" :formatter="formatter" :min-date="minDate" :max-date="maxDate" :poppable="false"
        :show-confirm="false" :style="{ height: '500px' }" />
</template>
<script>
export default {
    name: "Scheduling",
    data() {
        return {
            minDate: new Date(2010, 0, 1),
            maxDate: new Date(2010, 0, 31),
        }
    },
    methods: {
        formatter(day) {
            const month = day.date.getMonth() + 1;
            const date = day.date.getDate();

            // if (month === 5) {
            if (date === 1) {
                day.topInfo = '劳动节';
            } else if (date === 4) {
                day.topInfo = '青年节';
            } else if (date === 11) {
                day.text = '今天';
            }
            // }

            if (day.type === 'start') {
                day.bottomInfo = '入住';
            } else if (day.type === 'end') {
                day.bottomInfo = '离店';
            }

            return day;
        }
    }
}
</script>