// db.ts
import Dexie from 'dexie';

class PopupDB extends Dexie {
  popups: Dexie.Table<{ id: string }, string>;

  constructor() {
    super('popupDB');
    this.version(1).stores({
      popups: '&id' // 主键为id
    });
    this.popups = this.table('popups');
  }
}

const db = new PopupDB();
export default db;