package edu.infosysLostFoundLocatorApplication.dao;

import java.util.List;
import edu.infosysLostFoundLocatorApplication.bean.LostItem;

public interface LostItemDao {

    public void saveLostItem(LostItem lostItem);

    public List<LostItem> getAllLostItem();

    public LostItem getLostItemById(String lostItemId);

    public void deleteLostItemById(String lostItemId);

    public String getLostId();

    public List<LostItem> getLostItemsByUsername(String username);
}
