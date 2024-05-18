// import { ValueTransformer } from 'typeorm';
// import { format, parse } from 'date-fns';
// import { zonedTimeToUtc } from 'date-fns-tz';

// const BEIJING_TIME_ZONE = 'Asia/Shanghai';

// export class BeijingDateTimeTransformer implements ValueTransformer {
//   // 从数据库读取时调用
//   from(value: string): Date {
//     // 假设数据库中的时间是以北京时区存储的
//     const beijingDate = parse(value, 'yyyy-MM-dd HH:mm:ss', new Date());
//     // 将北京时间转换为 UTC 时间
//     return zonedTimeToUtc(beijingDate, BEIJING_TIME_ZONE);
//   }

//   // 写入数据库时调用
//   to(value: Date): string {
//     // 使用 format 函数将 Date 对象格式化为北京时间字符串
//     return format(value, 'yyyy-MM-dd HH:mm:ss', {
//       timeZone: BEIJING_TIME_ZONE,
//     });
//   }
// }
