/* eslint-disable */
import React, { Component, Fragment } from 'react'
import Head from 'next/head';
import Link from 'next/link';
import Parser from 'html-react-parser';

import $ from "jquery";
import style from "./index.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { faEdit, faCaretDown } from "@fortawesome/free-solid-svg-icons";
library.add(fab, far, faEdit, faCaretDown);

const getSlug = url => {
  console.log(url);
  const parts = url.split('/');
  return parts.length > 2 ? parts[parts.length - 2] : '';
};

class Banner extends Component{
    componentDidMount(){
       
        var x, i, j, selElmnt, a, b, c;
        
        x = document.getElementsByClassName("bridge-select");
        for (i = 0; i < x.length; i++) {
            selElmnt = x[i].getElementsByTagName("select")[0];

            a = document.createElement("DIV");
            a.setAttribute("class", "select-selected");
            a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
            x[i].appendChild(a);


            b = document.createElement("DIV");
            b.setAttribute("class", "select-items select-hide");
            for (j = 1; j < selElmnt.length; j++) {
                c = document.createElement("DIV");
                c.innerHTML = selElmnt.options[j].innerHTML;
                c.dataset.url = selElmnt.options[j].dataset.url;
                c.addEventListener("click", function(e) {

                    var y, i, k, s, h;
                    let className = this.innerHTML.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '').toLowerCase();
                    $('.user-type-link').hide();
                    $(`.${className}`).show(); 

                    s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                    h = this.parentNode.previousSibling;
                    for (i = 0; i < s.length; i++) {
                      if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        this.dataset.url = this.dataset.url;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (k = 0; k < y.length; k++) {
                          y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                      }
                    }
                    h.click();
                });
                b.appendChild(c);
            }
            x[i].appendChild(b);
            a.addEventListener("click", function(e) {
              e.stopPropagation();
              closeAllSelect(this);
              this.nextSibling.classList.toggle("select-hide");
              this.classList.toggle("select-arrow-active");
            });
        }
        
        function closeAllSelect(elmnt) {
            var x, y, i, arrNo = [];
            x = document.getElementsByClassName("select-items");
            y = document.getElementsByClassName("select-selected");
            for (i = 0; i < y.length; i++) {
                if (elmnt == y[i]) {
                  arrNo.push(i)
                } else {
                  y[i].classList.remove("select-arrow-active");
                }
            }
            for (i = 0; i < x.length; i++) {
                if (arrNo.indexOf(i)) {
                  x[i].classList.add("select-hide");
                }
            }
        }
        
        document.addEventListener("click", closeAllSelect);
    }
    render() {
        const {image, heading, description, enable_user_type_dropdown, user_heading, text, user, user_type } = this.props;
        let userDropdownMarkup = null;
        let userDropdownLinkMarkup = null;
        let defaultOption = '';
        if(user){            
          userDropdownMarkup = user.map((item, i) => {
            if(i==0) defaultOption = <option data-url={item.url}>{item.type}</option>;
            else defaultOption = '';
            return (
                <Fragment key={i}>
                    {defaultOption}
                    <option data-url={item.link} >{item.type}</option>
                </Fragment>
                
            );
          });

          userDropdownLinkMarkup = user.map((item, i) => {
            const slug = getSlug(item.link);
            let actualPage = slug ? 'page' : '';
            return (

              <Link
                  as={`/${actualPage}/${slug}`}
                  href={`/page?slug=${slug}&apiRoute=page`}
                  key={i}
              >
                  <a className={`button user-type-link ${item.type.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '').toLowerCase()}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9"><g><g><path fill="#1fc1c3" d="M11.23 3.84L7.6.256a.885.885 0 0 0-1.245 0 .867.867 0 0 0 0 1.234l2.13 2.094H.88c-.486 0-.88.391-.88.873s.394.873.88.873h7.604L6.355 7.424a.867.867 0 0 0 0 1.234.881.881 0 0 0 1.245 0l3.63-3.584a.867.867 0 0 0 0-1.234z"/></g></g></svg>
                  </a>
              </Link>
                
            );
          });
        }
        return (
          <Fragment>
             <div>
              <style
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: style }}
              />
            </div>

            <div className="bridge-banner pos-relative">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="banner-content text-center">
                                <div className="banner-text">
                                    <h1>{ heading }</h1>
                                    <p>{ description }</p>
                                </div>
                                { image ? <img src={image.url} alt={image.alt} title={image.title} className="banner-img img-fluid" />: ''}
                            </div>
                            
                            {enable_user_type_dropdown ? 
                              <div className="banner-select-option text-center">
                                  <p>{Parser(user_heading)}</p>
                                  <div className="business-type-area">
                                      <h3><span>{text}</span></h3>
                                      <div className="bridge-select">
                                          <select>
                                             {userDropdownMarkup}
                                          </select>
                                      </div>
                                      {userDropdownLinkMarkup}
                                      {/* <a className="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9"><g><g><path fill="#1fc1c3" d="M11.23 3.84L7.6.256a.885.885 0 0 0-1.245 0 .867.867 0 0 0 0 1.234l2.13 2.094H.88c-.486 0-.88.391-.88.873s.394.873.88.873h7.604L6.355 7.424a.867.867 0 0 0 0 1.234.881.881 0 0 0 1.245 0l3.63-3.584a.867.867 0 0 0 0-1.234z"/></g></g></svg>
                                      </a> */}
                                  </div>
                              </div>
                            : ''}
                        </div>
                    </div>
                </div>
            </div>
          </Fragment>
        )
    }
}

export default Banner;