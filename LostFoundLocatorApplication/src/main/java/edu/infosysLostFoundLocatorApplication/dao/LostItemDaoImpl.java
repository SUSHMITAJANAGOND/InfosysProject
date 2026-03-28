package edu.infosysLostFoundLocatorApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.infosysLostFoundLocatorApplication.bean.LostItem;

@Repository
public class LostItemDaoImpl implements LostItemDao {

    @Autowired
    private LostItemRepository repository;

    @Override
    public void saveLostItem(LostItem lostItem) {
        repository.save(lostItem);
    }

    @Override
    public List<LostItem> getAllLostItem() {
        return repository.findAll();
    }

    @Override
    public LostItem getLostItemById(String lostItemId) {
        return repository.findById(lostItemId).orElse(null);
    }

    @Override
    public void deleteLostItemById(String lostItemId) {
        repository.deleteById(lostItemId);
    }

    @Override
    public String getLostId() {
        return repository.getLostId();
    }

    @Override
    public List<LostItem> getLostItemsByUsername(String username) {
        return repository.getLostItemsByUsername(username);
    }
}
