## Database Scripts

- db:backup  
  Creates timestamped MongoDB dump in external drive
  syntax: npm run db:backup



- db:restore --date=YYYY-MM-DD_HH-MM  
  Restores selected backup
  syntax: npm run db:restore --date <date> {format - year-month-day_time}
  Always ls the dump forlder before restore to restore the correct version
  Put the right date
  Donot restore while server is running
