package com.pptpdx.model;

import java.io.Serializable;
import javax.persistence.*;

/**
 *
 * @author theider
 */
@Entity
@Table
public class CourseMetadata implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String metadataText;
    
    private Long courseId;

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

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }
    
    @Override
    public String toString() {
        return "CourseMetadata{" + "id=" + id + ", courseId=" + courseId + '}';
    }

}
