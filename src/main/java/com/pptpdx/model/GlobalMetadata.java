package com.pptpdx.model;

import java.io.Serializable;
import javax.persistence.*;

/**
 *
 * @author theider
 */
@Entity
@Table
public class GlobalMetadata implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String metadataText;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMetadataText() {
        return metadataText;
    }

    public void setMetadataText(String metadataText) {
        this.metadataText = metadataText;
    }

    @Override
    public String toString() {
        return "GlobalMetadata{" + "id=" + id + '}';
    }
    
}
