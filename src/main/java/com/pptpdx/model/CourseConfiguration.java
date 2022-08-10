package com.pptpdx.model;

import java.io.Serializable;
import javax.persistence.*;

/**
 *
 * @author theider
 */
@Entity
@Table
public class CourseConfiguration implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String configurationText;
    
    private Long courseId;

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getConfigurationText() {
        return configurationText;
    }

    public void setConfigurationText(String configurationText) {
        this.configurationText = configurationText;
    }

    @Override
    public String toString() {
        return "CourseConfiguration{" + "id=" + id + '}';
    }

}
