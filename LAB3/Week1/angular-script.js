var pageName = "";
var companyListPaaageYaxisOffeset = 0;
var ccubeApp = angular.module('ccubeApp', ['ngRoute', 'ngAnimate','LocalStorageModule','angular-growl','config','ngDialog','ngTable','ngToggle','simplePagination','angular.filter','ngTagsInput','ui.bootstrap','cgPrompt','nvd3','ngActivityIndicator','xdLocalStorage','ngSanitize','ngAutocomplete','angularFileUpload','MassAutoComplete','viewfilesdir']);

//to sort the apply field
function getSorted(arr, sortArr) {
	  var result = [];
	  for(var i=0; i<arr.length; i++) {
	    result[i] = arr[sortArr[i]];
	  }
	  return result;
	}
// var isPressed = "";

// iphone - career site loading
var flag=0;
var is_clicked=0;
var is_clicked1=0;
var localStrorageValue = 0;
var isjobexpwebservice ="no";
var isjoblimitservice  ="no";

var Protocol =window.location.protocol;
var windowurl = window.location.href;
var folderpath = "";
var RESUMEUPLAODPATH = "";
var TALENTCOMMUNITYRESUMEUPLAODPATH = "";
var CANDIDATEDOCUMENTSPATH = "";
var CANDIDATEOFFERLETTERFOLDERPATH = "";
var REPORTSTEMPFOLDERPATH = "";
var RBACFILEPATH = "";
var EMPLOYEESAMPLEDARATEMPFOLDERPATH ="";
var INVOICEPATH = "";
var WIDGET_PATH = "";
var isLocal = false;
var COMPANYURL = "";

	
if(windowurl.indexOf("public")> -1){
	
	folderpath = windowurl.substring(0, windowurl.indexOf("admin"));
	RESUMEUPLAODPATH = folderpath +"uploads/resumes";
	INVOICEPATH = folderpath +"/uploads/adminInvoice/";
	TALENTCOMMUNITYRESUMEUPLAODPATH = RESUMEUPLAODPATH +"/talentCommunity";
	CANDIDATEDOCUMENTSPATH = RESUMEUPLAODPATH +"/candidateDocuments";
	CANDIDATEOFFERLETTERFOLDERPATH = RESUMEUPLAODPATH +"/offerLetters";
	REPORTSTEMPFOLDERPATH = folderpath +"/manage/downloads/reports/temp/pdfs/";
	RBACFILEPATH = folderpath+"/uploads/rbacdownload/";
	EMPLOYEESAMPLEDARATEMPFOLDERPATH = folderpath +"/manage/downloads/reports/temp/";
	COMPANYURL = folderpath + "public/";
	
	isLocal = true;

	
}else{
	
	folderpath = windowurl.substring(0, windowurl.indexOf("/#!"));
	RESUMEUPLAODPATH = folderpath +"/uploads/resumes/";
	INVOICEPATH = folderpath +"/uploads/adminInvoice/";
	TALENTCOMMUNITYRESUMEUPLAODPATH = RESUMEUPLAODPATH +"/talentCommunity";
	CANDIDATEDOCUMENTSPATH = RESUMEUPLAODPATH +"/candidateDocuments";
	CANDIDATEOFFERLETTERFOLDERPATH = RESUMEUPLAODPATH +"/offerLetters";
	REPORTSTEMPFOLDERPATH = folderpath +"/downloads/reports/temp/pdfs/";
	RBACFILEPATH = folderpath+"/rbac-download/";
	EMPLOYEESAMPLEDARATEMPFOLDERPATH = folderpath +"/downloads/reports/temp/";
	isLocal = false;
	console.log("folderpath : " + folderpath);
	
}

function isLocalStorageNameSupported(localStorage) {
		
	try { // Try and catch quota exceeded errors
		localStorage.setItem('test','test stored');
		localStorage.getItem('test');
		localStorage.removeItem('test');

	} catch (error) {
			
		localStrorageValue = 1;
		alert('Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.');
		
	}

}

ccubeApp.config(['$locationProvider', function($locationProvider) {
	  $locationProvider.hashPrefix('');
}]);

ccubeApp.run(function(services,$rootScope,$location,localStorageService,$document,$window,localStorageService,xdLocalStorage,$routeParams,ngDialog) {

	   $rootScope.$on('$locationChangeSuccess', function() {
	        $rootScope.actualLocation = $location.path();
	    });        

	   $rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
	        if($rootScope.actualLocation === newLocation) {

	            if(companyListPaaageYaxisOffeset !=0){
	            	$("body,html").animate({scrollTop: companyListPaaageYaxisOffeset}, "slow");
	            }
	        }
	    });
	   
	var localStorage = $window.localStorage;
    isLocalStorageNameSupported(localStorage);
    
	var hostName = $location.host();
	var iframeUrl = "";
	
	iframeUrl = "/crossd_iframe.html";
	
	xdLocalStorage.init(
		     {
		        /* required */
		    	 iframeUrl:iframeUrl
		    }).then(function () {
		        // an option function to be called once the iframe was loaded
				// and ready for action
		        // console.log('Got iframe ready');
		    });
	
	  
	var d = new Date();
	  var n = d.getTime();  // n in ms

	    $rootScope.idleEndTime = n+(10*60*144000); // set end time to 10 min
													// from now
	    $document.find('body').on('mousemove keydown DOMMouseScroll mousewheel mousedown touchstart', checkAndResetIdle); // monitor

	    function checkAndResetIdle() // user did something
	    {
	    	
	    	var stringVariable = window.location.href;
	        var valueUrlLast = stringVariable.substring(stringVariable.lastIndexOf('/')+1);
	        // console.log('the last param ....'+valueUrlLast);
	    	if(valueUrlLast != 'login' && valueUrlLast.length) {
	    	  // console.log('inside the check....');
		      var d = new Date();
		      var n = d.getTime();  // n in ms
		      
		    
		      
		       var autoLogOut = false;
		       // console.log("======="+n+"=========");
		        if (n>$rootScope.idleEndTime)
		        {
		        	//var localStorage = $window.localStorage;
			        $rootScope.sessionId=localStorage.getItem('sessionId');
			        $rootScope.loginUserIdAdmin=localStorage.getItem('loginUserIdAdmin');
			        var emailId = localStorage.getItem('userNameAdmin');
			    	
			    	var user = {
			    	    	"sessionId" : "",
			    	    	"emailId" : emailId
			    	    }
			    	services.updateUserSessionData(user,$rootScope.sessionId,$rootScope.loginUserIdAdmin);
			    	/*services.updateUserData(emailId,$rootScope.sessionId,$rootScope.loginUserIdAdmin).then(
			    			function(response) {
			    				
			    				// do nothing;

			    			});*/
		        	autoLogOut = true;  
		        	$rootScope.idleEndTime = n+(10*60*144000); // reset end						// time
		        	
		        	// close all active popUps
		        	//ngDialog.closeAll();
		        }
		        else
		        {
		            $rootScope.idleEndTime = n+(10*60*144000); // reset end
																// time
		            autoLogOut = false;  
		        }
		        // alert(autoLogOut);
		        // console.log("======="+autoLogOut+"=========");
		        
		        var sessionIdAdmin = "";
		        setTimeout(function (){
		        xdLocalStorage.getItem("sessionIdAdmin").then(function (response) {
		        	sessionIdAdmin = response.value;
		        	// console.log("The sessionIdAdmin is "+sessionIdAdmin);
		        	if(sessionIdAdmin == 'null' || sessionIdAdmin == 'empty' || autoLogOut){
		        		// $document.find('body').off('mousemove keydown
						// DOMMouseScroll mousewheel mousedown touchstart'); //
						// un-monitor
						// events
	
						// localStorage.removeItem('userNameAdmin');
						localStorage.removeItem('welUserNameAdmin');
						localStorage.removeItem('loginUserIdAdmin');
						localStorage.removeItem('IssuperUsers');
						localStorage.removeItem('companyId');
						localStorage.removeItem('jobId');
						localStorage.removeItem('cmpny_id_forjoblimit');	
						sessionStorage.removeItem('jobApplicationId');
						localStorage.removeItem('appJobTitle');
						localStorage.removeItem('manageJobId'); 
						localStorage.removeItem('manageUserId');
						localStorage.removeItem('appStatus');
						$rootScope.userName = null;
						$rootScope.selectedJobId = null;
						$rootScope.jobId = null
						$rootScope.appStatus = null;
						$rootScope.manageJobStatus = "MyJobs";
						$rootScope.jobLimit = 5;
						$rootScope.companyLimit = 5;
						
						
						xdLocalStorage.setItem("sessionIdAdmin", null, function (data) { /* callback */ });
	
						$rootScope.sessionTimeOut = true;
						// Add
						
						if($routeParams.operation){
							$rootScope.pageTitle = $location.url().substring(1);
							 $scope.pageTitle = $location.url().substring(1); 
							// alert($scope.pageTitle);
						}
						/*
						 * if($routeParams.managePagePath =="applicationview"){
						 * localStorage.setItem('managePagePath',
						 * "applicationview"); }
						 */
						document.location.href = './#/';
						
						// $window.location.reload();
			   		}
		        });
		        }, 1000); 
	        
	    	}
	        
	       
	    }
	  
	  $rootScope.$on('$routeChangeSuccess', function (event, current, previous,$routeParams,ngDialog) {
	        $rootScope.title = current.$$route.title;
	        
	        var userName = localStorage.getItem('userNameAdmin');
	        
	        if(userName === null){
	        	
		        setTimeout(function (){

			        xdLocalStorage.getItem("sessionIdAdmin").then(function (response) {

						sessionIdAdmin = response.value;

					

						if(sessionIdAdmin != "" && sessionIdAdmin !='empty' && sessionIdAdmin !=null) {

							services.checkLoginSession(sessionIdAdmin).then(function(data) {

								$rootScope.loggedInUserAdminAdmin = data.data;
								
								localStorage.setItem('sessionId', sessionIdAdmin);

								localStorage.setItem('loginUserIdAdmin', $rootScope.loggedInUserAdmin.id);

					    		localStorage.setItem('userNameAdmin', $rootScope.loggedInUserAdmin.emailId);

					    		localStorage.setItem('welUserNameAdmin', $rootScope.loggedInUserAdmin.username);

					    		localStorage.setItem('encodedEmailId', $rootScope.loggedInUserAdmin.encodedEmailId);

					    		Cookies.set('isZwayamRegistered', '1', { expires: 7, path: '/' });

					    		$rootScope.userName = $rootScope.loggedInUserAdmin.emailId;

					        	$rootScope.userNameDisplay = $rootScope.loggedInUserAdmin.username;

							});

						}

						else {
                            
							$location.path('/login');

					 		return;

						}

				    });

		        }, 1000); // end of setTimeout

	        }
	        
	    });

	});

ccubeApp.factory("services", ['$http','$location','COMPANYID', function($http,$location,COMPANYID) {
	    var obj = {};
	    	
		/*obj.updateUserData = function (emailId,sessionId,loginUserIdAdmin) {
			 var fd = new FormData();
				fd.append("emailId", emailId);
				 fd.append('companyId', COMPANYID);
				    fd.append('sessionId', sessionId);
				    fd.append('loginUserIdAdmin', loginUserIdAdmin);
		
		return $http.post('/adminAPI/updateUserData/', fd, {
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		});*/
		
	    
obj.updateUserSessionData = function (sessionId,loginUserId) {
	
	if(loginUserId == null){
		loginUserId = 0;
	}
	
		var fd = new FormData();
		fd.append("companyId", COMPANYID);
		fd.append("sessionId", sessionId);
		fd.append("loginUserId", loginUserId);
		return $http.post('/adminAPI/updateUserSessionData', fd, {
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		});
	};
	obj.enableEmployeeReferral = function (companyId,growl,employeeReferralFile,employeeReferralStatus,
			enableBulkUploadReferral,enableIJPUploadReferral,sessionId,loginUserId,erPointsEnable, 
			redeemablePointsPerJoinee,erPolicyEnable, enableFindYourSpot,eRHomePage) {
		
		if(loginUserId == null){
			loginUserId = 0;
		}

		var fd = new FormData();
		
		fd.append("file", employeeReferralFile);
		if(enableIJPUploadReferral =="undefined"){
			enableIJPUploadReferral == false;
		}
		if(erPointsEnable =="undefined"){
			erPointsEnable == 'Y';
		}
		if(erPolicyEnable =="undefined"){
			erPointsEnable == 'N';
		}
		fd.append("companyId", companyId);
		fd.append("adminCompanyId", COMPANYID);
		fd.append("employeeReferralStatus", employeeReferralStatus);
		fd.append("enableBulkUploadReferral", enableBulkUploadReferral);
		fd.append("enableIJPUploadReferral", enableIJPUploadReferral);
		fd.append("erPointsEnable", erPointsEnable);
		fd.append("sessionId", sessionId);
		fd.append("loginUserId", loginUserId);
		fd.append("redeemablePointsPerJoinee", redeemablePointsPerJoinee);
		fd.append("erPolicyEnable", erPolicyEnable);
		fd.append("enableFindYourSpot", enableFindYourSpot);
		fd.append("eRHomePage", eRHomePage);
		return $http.post('/adminAPI/enableEmployeeReferral', fd,{
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		});
	};
	
obj.createNdownloadInvoice = function (sessionId,invoiceForEmail,orderId) {
		
		var fd = new FormData();
		
		fd.append("sessionId", sessionId);
		fd.append("invoiceForEmail", invoiceForEmail);
		fd.append("orderId", orderId);
		
		return $http.post('/adminAPI/createNdownloadInvoice/', fd,{
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		})
	};

	

	
	
obj.enableVendorReferral = function (companyId,growl,employeeReferralFile,employeeReferralStatus,ShowVendorName,enableBulkUpload,sessionId,loginUserId) {
		
		if(loginUserId == null){
			loginUserId = 0;
		}

		var fd = new FormData();
		
		fd.append("file", employeeReferralFile);
		
		return $http.post('/adminAPI/enableVendorReferral/'+companyId+'/'+employeeReferralStatus+'/'+ShowVendorName+'/'+enableBulkUpload+'/'+sessionId+'/'+loginUserId, fd,{
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		})
	};

		
obj.enableBlackListFeature = function (companyId,growl,enableBlackListCompany,sessionId,loginUserId) {
		
		if(loginUserId == null){
			loginUserId = 0;
		}

		var fd = new FormData();
		
		return $http.post('/adminAPI/enableBlackListFeature/'+companyId+'/'+enableBlackListCompany+'/'+sessionId+'/'+loginUserId, fd,{
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		})
	};
	
	
	obj.enableSalaryBreakupFeature = function (companyId,growl,enableBlackListCompany,sessionId,loginUserId) {
		
		if(loginUserId == null){
			loginUserId = 0;
		}

		var fd = new FormData();
		
		return $http.post('/adminAPI/enableSalaryBreakupFeature/'+companyId+'/'+enableBlackListCompany+'/'+sessionId+'/'+loginUserId, fd,{
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		})
	};
	
	
		obj.assessmentChangeSettings = function (companyId,growl,assessmentEnable,sessionId,loginUserId) {
		
		if(loginUserId == null){
			loginUserId = 0;
		}

		var fd = new FormData();
		
		return $http.post('/adminAPI/assessmentChangeSettings/'+companyId+'/'+assessmentEnable+'/'+sessionId+'/'+loginUserId, fd,{
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		})
		};

        obj.getEmployeeReferralStatus = function(cmpID,sessionId,loginUserId){
        	
        	if(loginUserId == null){
    			loginUserId = 0;
    		}
        	var fd = new FormData();
        	fd.append("companyId", cmpID);
        	fd.append("adminCompanyId", COMPANYID);
        	fd.append("sessionId", sessionId);
        	fd.append("loginUserId", loginUserId);
        	return $http.post('/adminAPI/getEmployeeReferralStatus', fd, {
        		transformRequest : angular.identity,
        		headers : {
        			'Content-Type' : undefined
        		}
        	});
        };
        
         obj.enableRecruiterNameFeature = function(cmpID,sessionId,loginUserId,recruiterNameEnable){     	
        	if(loginUserId == null){
    			loginUserId = 0;
    		}
		
		    return $http.get('/adminAPI/enableRecruiterNameFeature/'+cmpID +'/'+sessionId+'/'+loginUserId+'/'+recruiterNameEnable);
        };
        
        obj.enableOutlookIntigrationFeature = function(cmpID,sessionId,loginUserId,outlookIntigrationEnable,exchangeURL){     	
        	if(loginUserId == null){
    			loginUserId = 0;
    		}
		
		    var fd = new FormData();
		    fd.append("cmpID", cmpID);
			fd.append("sessionId", sessionId);
			fd.append("loginUserId", loginUserId);
			fd.append("outlookIntigrationEnable", outlookIntigrationEnable);
			fd.append("exchangeURL", exchangeURL);
			
			return $http.post('/adminAPI/enableOutlookIntigration/', fd,{
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			})
        };
        
        obj.getCompanyCommonConfigurationForAdmin = function(cmpID,sessionId,loginUserId){     	
        	if(loginUserId == null){
    			loginUserId = 0;
    		}
		
		    var fd = new FormData();
		    fd.append("companyId", cmpID);
			fd.append("sessionId", sessionId);
			fd.append("loginUserId", loginUserId);
			
			return $http.post('/adminAPI/getCompanyCommonConfigurationForAdmin', fd,{
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			})
        };
        
        obj.saveCompanyCommonConfigurations = function(cmpID,sessionId,loginUserId,GDPRFeature){     	
        	if(loginUserId == null){
    			loginUserId = 0;
    		}
		
		    var fd = new FormData();
		    fd.append("companyId", cmpID);
			fd.append("sessionId", sessionId);
			fd.append("loginUserId", loginUserId);
			fd.append("GDPRFeature", GDPRFeature);
			return $http.post('/adminAPI/saveCompanyCommonConfigurationForAdmin', fd,{
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			})
        };
        
        obj.enableRecruiterNameFeature = function(cmpID,sessionId,loginUserId,recruiterNameEnable){     	
        	if(loginUserId == null){
    			loginUserId = 0;
    		}
		
		    return $http.get('/adminAPI/enableRecruiterNameFeature/'+cmpID +'/'+sessionId+'/'+loginUserId+'/'+recruiterNameEnable);
        };
        
        obj.getVenodrConfiguration = function(cmpID,sessionId,loginUserId){
        	
        	if(loginUserId == null){
    			loginUserId = 0;
    		}
        	var fd = new FormData();
        	fd.append("companyId", cmpID);
        	fd.append("adminCompanyId", COMPANYID);
        	fd.append("sessionId", sessionId);
        	fd.append("loginUserId", loginUserId);
        	
        	return $http.post('/adminAPI/getVendorConfiguration', fd, {
        		transformRequest : angular.identity,
        		headers : {
        			'Content-Type' : undefined
        		}
        	});
        };
		
		
		obj.decomissionCompany = function(companyId,loggedInAdmin,sessionId,loginUserId){
			
			if(loginUserId == null){
				loginUserId = 0;
			}
			var fd = new FormData();
			fd.append("adminCompanyId", COMPANYID);
			fd.append("companyId", companyId);
			fd.append("adminId", loggedInAdmin);
			fd.append("sessionId", sessionId);
			return $http.post('/adminAPI/decomission', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			});
		};
		
		obj.deleteCompany= function(companyId,loggedInAdmin,sessionId,loginUserId){
			
			if(loginUserId == null){
				loginUserId = 0;
			}
			var fd = new FormData();
			fd.append("companyId", companyId);
			fd.append("adminCompanyId", COMPANYID);
			fd.append("adminId", loggedInAdmin);
			fd.append("sessionId", sessionId);
			return $http.post('/adminAPI/delete', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			});
		};
		
		obj.goLiveCompany= function(companyId,loggedInAdmin,carrersiteURl,sessionId,loginUserId){
			
			if(loginUserId == null){
				loginUserId = 0;
			}
			var fd = new FormData();
			fd.append("adminCompanyId", COMPANYID);
			fd.append("companyId", companyId);
			fd.append("adminId", loggedInAdmin);
			fd.append("carrersiteURl", carrersiteURl);
			fd.append("sessionId", sessionId);
			fd.append("loginUserId", loginUserId);
			return $http.post('/adminAPI/goLive', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			});
		}; 
	
		obj.whiteLabelCompany= function(companyId,loggedInAdmin,careersiteURl,suggestedDomainName,sessionId,loginUserId){
			
			if(loginUserId == null){
				loginUserId = 0;
			}
			var fd = new FormData();
			fd.append("adminCompanyId", COMPANYID);
			fd.append("companyId", companyId);
			fd.append("adminId", loggedInAdmin);
			fd.append("careersiteURl", careersiteURl);
			fd.append("suggestedDomainName", suggestedDomainName);
			fd.append("sessionId", sessionId);
			fd.append("loginUserId", loginUserId);
			return $http.post('/adminAPI/whiteLabel', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			});
		}; 
		
		obj.suggestDomainName= function(companyId,sessionId,loginUserId){
			
			if(loginUserId == null){
				loginUserId = 0;
			}
			
			var fd = new FormData();
			fd.append("adminCompanyId", COMPANYID);
			fd.append("companyId", companyId);
			fd.append("sessionId", sessionId);
			fd.append("loginUserId", loginUserId);
			return $http.post('/adminAPI/suggestDomainName', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			});			
		}; 
		
		obj.getUserListForCompany= function(adminUserSearch,companyId,sessionId,loginUserId){
			
			if(loginUserId == null){
				loginUserId = 0;
			}
			if(adminUserSearch ==""){
				adminUserSearch = "empty";
			}
			var id=companyId;
			var fd = new FormData();
			fd.append("companyId", companyId);
			fd.append("adminCompanyId", COMPANYID);
			fd.append("sessionId", sessionId);
			fd.append("loginUserId", loginUserId);
			fd.append("adminUserSearch", adminUserSearch);
			return $http.post('/adminAPI/userListWithPermission', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			});
		}; 
		
		
		obj.saveOfferFitmentFields = function (offerFitmentFieldsConfiguration,companyId,workflowName) {
			
			return $http({
			       method: 'POST',
			       url: '/adminAPI/saveOfferFitmentFields/'+companyId+'/'+workflowName,
			       data: offerFitmentFieldsConfiguration,
			     
			       headers: {
			           "Content-Type": "application/json",
			            "Accept": "text/plain, application/json",
			            	
			       }
				
			   });
};

			obj.saveFitmentTemplate = function ( companyId,fitmentTemplateName,fitmentTemplateFile,sessionId,loginUserId) {
			
				var fd = new FormData();			
				fd.append('sessionId', sessionId);
				fd.append('loginUserId', loginUserId);
				fd.append('companyId', companyId);
				fd.append('file', fitmentTemplateFile);
				fd.append('fitmentTemplateName', fitmentTemplateName);
				return $http.post('/adminCompanyAPI/UploadFitmentConfigurationTemplate', fd, {
				transformRequest : angular.identity,
				headers : {
				'Content-Type' : undefined
				}
				});
				
			};
			obj.saveEmployeeReferralTemplate = function ( companyId,ERTemplateName,ERTemplateFile,sessionId,loginUserId) {
				
				var fd = new FormData();			
				fd.append('sessionId', sessionId);
				fd.append('loginUserId', loginUserId);
				fd.append('companyId', companyId);
				fd.append('file', ERTemplateFile);
				fd.append('ERTemplateName', ERTemplateName);
				return $http.post('/adminCompanyAPI/UploadEmployeeReferralConfigurationTemplate', fd, {
				transformRequest : angular.identity,
				headers : {
				'Content-Type' : undefined
				}
				});
				
			};

obj.savePartnerFieldsConfiguration = function (partnerFieldsConfiguration,companyId) {
	
	return $http({
	       method: 'POST',
	       url: '/adminAPI/savePartnerFieldsConfiguration/'+companyId,
	       data: partnerFieldsConfiguration,
	     
	       headers: {
	           "Content-Type": "application/json",
	            "Accept": "text/plain, application/json",
	            	
	       }
		
	   });
};


		
		obj.getOfferFitmentFieldsConfiguration = function(companyId,workflowName){
			
			return $http.get('/adminAPI/getOfferFitmentFieldsList/'+companyId+'/'+workflowName);
		};
		
		obj.getPartnerFieldsConfiguration = function(companyId,type){
			return $http.get('/adminAPI/getPartnerFieldsConfiguration/'+companyId+'/'+type);
		};
		
		
		obj.checkLoginSession = function(emailId,sessionIdAdmin){
			var fd = new FormData();
			fd.append('sessionIdAdmin',sessionIdAdmin);
			fd.append("emailId",LoginEmailId);
			fd.append("companyId",COMPANYID);
			
			return	$http.post('/userAPI/checkLoginSessionAdmin', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			});
		};
	
	  	obj.login = function(emailId,password){
	  		
	  		var companyUrl = windowurl.replace("http://","").replace("https://","");
	  		 var fd = new FormData();
		 	   //fd.append("id",COMPANYID);
	  		 	fd.append("companyUrl", companyUrl);
				   fd.append("emailId", emailId);
				   fd.append("password", password);
				   
					return $http.post('/userAPI/loginAccess', fd, {
						transformRequest : angular.identity,
						headers : {
							'Content-Type' : undefined
						}
					});
			
	  		
		};
		
		obj.getJob = function (id,sessionId,loginUserId) {
			
			if(loginUserId == null){
				loginUserId = 0;
			}
			var fd = new FormData();
	  		fd.append("id", id);
			fd.append("companyId", COMPANYID);
			fd.append("sessionId", sessionId);
			fd.append("loginUserId", loginUserId);
			
			return $http.post('/adminAPI/getJob', fd, {
					transformRequest : angular.identity,
					headers : {
						'Content-Type' : undefined
					}
				});
		};
		
		
        obj.getJobListByJobId = function(id, userId, status, companyId,sessionId,loginUserId){
        	if(loginUserId == null){
    			loginUserId = 0;
    		}
        	var fd = new FormData();
	  		fd.append("id", id);
			fd.append("userId", 0);
			fd.append("sessionId", sessionId);
			fd.append("status", status);
			fd.append("adminCompanyId", COMPANYID);
			fd.append("companyId", companyId);
			fd.append("loginUserId", loginUserId);
			
			return $http.post('/adminAPI/jobApplicationListByJobId', fd, {
					transformRequest : angular.identity,
					headers : {
						'Content-Type' : undefined
					}
				});
		};
		
		obj.viewDownloadResume = function(applicationId,fileName,sessionId,loginUserId){
			
			var fd = new FormData();
			fd.append("fileName",fileName);
			fd.append("sessionId",sessionId);
			fd.append("loginUserId",loginUserId);
			return $http.post('/adminAPI/viewDownloadResume', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			});
		};
		
		obj.getJobByUrl = function (jobUrl,sessionId,loginUserId) {
			
			if(loginUserId == null){
				loginUserId = 0;
			}
			
			return $http.get('/adminAPI/getJobForUrl/'+jobUrl+'/'+COMPANYID+'/'+sessionId+'/'+loginUserId);	
		};
		
		obj.getallPackages = function(companyId,sessionId,loginUserId){
			
			if(loginUserId == null){
				loginUserId = 0;
			}
			var fd=new FormData();
			fd.append("sessionId", sessionId);
			fd.append("type", "P");
			fd.append("isAdmin", true);
			return $http.post('/manageAPI/getallPackages',fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			});
		};
			
		obj.getallPackagesOnContryChange = function(companyId,sessionId,loginUserId,currencyType){
			
			if(loginUserId == null){
				loginUserId = 0;
			}
			
			return $http.get('/adminAPI/getallPackages/'+companyId+'/'+sessionId+'/'+loginUserId+'/'+currencyType+'/'+'P');
			};
			
	    obj.getsubscriptionDetails = function(companyId,sessionId,loginUserId){
	    	
	    	if(loginUserId == null){
				loginUserId = 0;
			}
	    	var fd = new FormData();
			fd.append("sessionId", sessionId);
			return $http.post('/manageAPI/getsubscriptionDetails', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
					}
				});
			};
			
		obj.downloadResume = function(id,fileName,sessionId,loginUserId){
			// return
			// $http.get(WEBSERVICEURL+'ccubeAPI/download/'+COMPANYID+'/'+id)
			
			if(loginUserId == null){
				loginUserId = 0;
			}
	    	
	    	var contentType = "";
	    	var ext = fileName.substr(fileName.lastIndexOf('.') + 1);
	    	
	    	if("doc".toUpperCase() === ext.toUpperCase()) {	
	    		contentType = "application/msword";
			}
	    	else if("docx".toUpperCase() === ext.toUpperCase()) {	
				contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
			}
	    	else if("pdf".toUpperCase() === ext.toUpperCase()) {
				contentType = "application/pdf";
			}
	    	else if("txt".toUpperCase() === ext.toUpperCase()) {
				contentType = "text/plain";
			}

	    	$http({
                url : '/adminAPI/download/'+COMPANYID+'/'+id+'/'+sessionId+'/'+loginUserId,
                method : 'GET',
                params : {},
                headers : {
                    'Content-type' : contentType,
                },
                responseType : 'arraybuffer'
            }).then(function(data, status, headers, config) {
                var file = new Blob([ data ], {
                    type : contentType
                });
                // trick to download store a file having its URL
                var fileURL = URL.createObjectURL(file);
                // alert(fileURL);
                var a         = document.createElement('a');
                a.href        = fileURL; 
                a.target      = '_blank';
                a.download    = fileName;
                document.body.appendChild(a);
                a.click();
            }).catch(function(data, status, headers, config) {

            });
		};
		
		
		
       obj.loggedInUser = function(emailId,sessionId){
    	   var fd = new FormData();
    	   fd.append("sessionId", sessionId);
    	   fd.append("emailId", emailId);
    	   fd.append('companyId', COMPANYID);
  		   return $http.post('/adminAPI/loggedInUser', fd, {
  			transformRequest : angular.identity,
  			headers : {
  				'Content-Type' : undefined
  			}
  		   });
		};
		
	 obj.loggedInUserManage = function(emailId,manageCompanyId,sessionId){
		 var fd = new FormData();
		 fd.append("sessionId", sessionId);
		 return $http.post('/userAPI/loggedInUser', fd, {
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		});
	 };
		
		obj.getUserDetails = function(emailId){
			var fd = new FormData();
			 fd.append("companyId", COMPANYID);
			 fd.append("emailId", emailId);
			 return $http.post('/userAPI/getUserDetails', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			});
		};
		
		obj.getUserDetailsBySession = function(sessionIdAdmin,emailId){
			var fd = new FormData();
	    	   fd.append("sessionId", sessionIdAdmin);
	    	   fd.append("companyId", COMPANYID);
	    	   fd.append("emailId", emailId);
	    	   
				return $http.post('/userAPI/getUserDetailsBySessionAdmin', fd, {
					transformRequest : angular.identity,
					headers : {
						'Content-Type' : undefined
					}
				});
		};		
			
		obj.getdashboardList = function(userId,sessionId,loginUserId){
			
			if(loginUserId == null){
				loginUserId = 0;
			}
			return $http.get('/adminAPI/dashboardList/'+userId+'/'+sessionId);

			//return $http.get('/adminAPI/dashboardList/'+COMPANYID+'/'+userId+'/'+sessionId+'/'+loginUserId);
			
		};
		
		obj.getAdminLoginHistory = function(sessionId, loginUserId){
			
			if(loginUserId == null){
				loginUserId = 0;
			}
			var fd = new FormData();
			fd.append("sessionId", sessionId);
			fd.append("loginUserId", loginUserId);
			return $http.post('/adminAPI/adminLoginHistory/', fd, {	
		    	transformRequest : angular.identity,	
		    	headers : {	
		    		"Content-Type": undefined
		    	}	
		    });	
			
		};
		
		obj.downloadExcelReport = function(reportName,sessionId,loginUserId){
			var fd = new FormData();
			fd.append("adminCompanyId", COMPANYID);
			fd.append("reportName", reportName);
			fd.append("sessionId", sessionId);
			fd.append("loginUserId", loginUserId);
			return $http.post('/adminAPI/downloadExcelReport', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			});	
		};
		
	
		obj.saveOfflinePayment = function (companyId,packageId,planName,currencyType,validFrom,billingCountry,annualCost,serviceTax,grandTotal,packagecostremaining,payableAmount,extendingDays,noOfCustomJobs,
						 sessionId,loginUserId,clientInvoice) {

		if(loginUserId == null){
				loginUserId = 0;
			}
		
	    var fd = new FormData();
	    fd.append('companyId', companyId);
		fd.append('packageId', packageId);
	    fd.append('planName', planName);
	    fd.append('currencyType', currencyType);
	    fd.append('validFrom', validFrom);
	    fd.append('billingCountry', billingCountry);
	    fd.append('annualCost', annualCost);
		fd.append('serviceTax', serviceTax);
		fd.append('grandTotal', grandTotal);
		fd.append('packagecostremaining', packagecostremaining);
		fd.append('payableAmount', payableAmount);
        fd.append('extendingDays', extendingDays);
		fd.append('noOfCustomJobs', noOfCustomJobs);
		fd.append('sessionId', sessionId);
		fd.append('loginUserId', loginUserId);
		fd.append('clientInvoice', clientInvoice);
	    return $http.post('/adminAPI/saveOfflinePayment/', fd, {
		   transformRequest : angular.identity,
		   headers : {
			   'Content-Type' : undefined
		   }
	    });
		
	};
	
			obj.sendInvoiceEmail = function (companyId,packageId,planName,currencyType,validFrom,billingCountry,annualCost,serviceTax,grandTotal,packagecostremaining,payableAmount,extendingDays,noOfCustomJobs,
					 sessionId,loginUserId) {
		
		if(loginUserId == null){
			loginUserId = 0;
		}
		
		var fd = new FormData();
		fd.append('companyId', companyId);
		fd.append('packageId', packageId);
		fd.append('planName', planName);
		fd.append('currencyType', currencyType);
		fd.append('validFrom', validFrom);
		fd.append('billingCountry', billingCountry);
		fd.append('annualCost', annualCost);
		fd.append('serviceTax', serviceTax);
		fd.append('grandTotal', grandTotal);
		fd.append('packagecostremaining', packagecostremaining);
		fd.append('payableAmount', payableAmount);
		fd.append('extendingDays', extendingDays);
		fd.append('noOfCustomJobs', noOfCustomJobs);
		fd.append('sessionId', sessionId);
		fd.append('loginUserId', loginUserId);
		
		return $http.post('/adminAPI/sendInvoiceEmail/', fd, {
		transformRequest : angular.identity,
		headers : {
		  'Content-Type' : undefined
		}
		});
		
		};


// Insert User
		
		obj.deleteUser = function (id,sessionId,loginUserId) {
			
			if(loginUserId == null){
				loginUserId = 0;
			}
			
			 
			 var loggedAdminIdAdminId = 0;
			 var fd = new FormData();
			 fd.append("companyId", COMPANYID);
			 fd.append("id", id);
			 fd.append("sessionId", sessionId);
			 fd.append("loginUserId", loginUserId);
			 fd.append("loggedAdminIdAdminId", loggedAdminIdAdminId);
			 return $http.post('/userAPI/deleteUser', fd, {
				 transformRequest : angular.identity,
				 headers : {
					 'Content-Type' : undefined
				 }
			 }).then(function (status) {
					
			        return status.data;
			        
			    });		
		};
		
		obj.editUser = function (id,sessionId,loginUserId) {
			
			if(loginUserId == null){
				loginUserId = 0;
			}
			var fd = new FormData();
			fd.append("sessionId",sessionId);
			fd.append("id",id);
			fd.append("loginUserId",loginUserId);
			fd.append("companyId",COMPANYID);
		
            return $http.post('/userAPI/getUser', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			});
		};

		obj.getUserList = function(sessionId,loginUserId){
			
			if(loginUserId == null){
				loginUserId = 0;
			}
			var fd = new FormData();
			fd.append("sessionId",sessionId);
			fd.append("userRole","1");
			fd.append("loginUserId",loginUserId);
			fd.append("id",COMPANYID);
		
            return $http.post('/userAPI/userList', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			});
		};
		
		obj.getCompanyList = function(isActive,isPremium,sessionId,loginUserId){
			
			if(loginUserId == null){
				loginUserId = 0;
			}
			var fd = new FormData();
		    fd.append('isActive', isActive);
		    fd.append('isPremium', isPremium);
		    fd.append('sessionId', sessionId);
		    fd.append('companyId', COMPANYID);
		    return $http.post('/adminAPI/companyList', fd, {
				   transformRequest : angular.identity,
				   headers : {
					   'Content-Type' : undefined,
				  }
			    });
		 };
	
		obj.searchCompanyList = function(searchKeyword,id,isActive,isPremium,sessionId,loginUserId){
			
			if(loginUserId == null){
				loginUserId = 0;
			}
			var fd = new FormData();
			fd.append('searchkeyword', searchKeyword);
			fd.append('sessionId', sessionId);
			fd.append('companyId', COMPANYID);
			fd.append('id', id);
			fd.append('isActive', isActive);
			fd.append('isPremium', isPremium);
			fd.append('loginUserId', loginUserId);
			return $http.post('/adminAPI/searchCompanyList', fd, {
				   transformRequest : angular.identity,
				   headers : {
					   'Content-Type' : undefined,
				  }
			});
		};
		
		obj.getcompanyNameList = function(sessionId, loginUserId){
			
			var fd = new FormData();
			fd.append('sessionId', sessionId);
			fd.append('adminCompanyId', COMPANYID);
			fd.append('loginUserId', loginUserId);
			return $http.post('/adminAPI/companyNameList', fd, {
				   transformRequest : angular.identity,
				   headers : {
					   'Content-Type' : undefined,
				  }
			 });
		};
		
		obj.getCompanyListByOrder = function(id,isActive,isPremium,sessionId,loginUserId){
			
			if(loginUserId == null){
				loginUserId = 0;
			}
			var fd = new FormData();
			fd.append('sessionId', sessionId);
			fd.append('companyId', COMPANYID);
			fd.append('id', id);
			fd.append('isActive', isActive);
			fd.append('isPremium', isPremium);
			fd.append('loginUserId', loginUserId);
			return $http.post('/adminAPI/companyListByOrder', fd, {
				   transformRequest : angular.identity,
				   headers : {
					   'Content-Type' : undefined,
				  }
			});
		};
		
		obj.getCompanyJobListByOrder = function(id,cmpId,isActive,sessionId,loginUserId,searchText){
			
			if(loginUserId == null){
				loginUserId = 0;
			}
	
			
			if(searchText == '' || typeof searchText == "undefined" || searchText == undefined){
				searchText ="empty";
			}
	    return $http.get('/adminAPI/companyjobListByOrder/'+id +'/'+cmpId +'/'+isActive+'/'+COMPANYID+'/'+sessionId+'/'+loginUserId +'/'+searchText);
			};
	
		obj.getcompanyDetails = function(cmpId,sessionId,loginUserId){
			
			if(loginUserId == null){
				loginUserId = 0;
			}

			var fd = new FormData();
			fd.append("companyId", cmpId);
			fd.append("adminCompanyId", COMPANYID);
			fd.append("sessionId", sessionId);
			fd.append("loginUserId", loginUserId);
			return $http.post('/adminAPI/getcompanyDetails', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			});	
};

	obj.getMasterFieldsForEntity=function(sessionId,entityType){
		   var fd = new FormData();
		    fd.append('entityType', entityType);
		    fd.append('sessionId', sessionId);
		    return $http.post('/masterData/getMasterFieldsForEntity/', fd, {
				   transformRequest : angular.identity,
				   headers : {
					   'Content-Type' : undefined,
				  }
			    });
};

obj.getMasterData=function(masterData){
	var fd = new FormData();
    fd.append('fieldName', masterData);
	 return $http.post('/masterData/getMasterList',fd, {
		   transformRequest : angular.identity,
		   headers : {
			   'Content-Type' : undefined,
		  }
	    });
};

obj.saveJobOrCompanyMasterDetails=function(entityType,id,masterValues){

	 return	$http({
         method: 'POST',
         url: '/adminAPI/saveJobOrCompanyMasterDetails/'+entityType+'/'+id,
         data: masterValues,
         headers: {
             "Content-Type": "application/json",
             "Accept": "text/plain, application/json"
         }
		
     });
}
	
/*obj.getcompanysubscriptionDetails = function(sessionId,loginUserId){
	var cmpId=localStorage.getItem('companyId'); 
	return $http.get('/manageAPI/getcompanysubscriptionDetails/'+cmpId+'/'+sessionId+'/'+loginUserId);
	};*/

obj.getcompanysubscriptionDetails = function(sessionId,loginUserId){
	return $http.get('/manageAPI/getcompanysubscriptionDetails/'+sessionId);
	};
	
obj.getactiveRewardProviderlist = function(companyId){
		return $http.get('/ErRedemptionAPI/getactiveRewardProviderlist/'+companyId);
	};
	
obj.getAllRewardProvider = function(){
		return $http.get('/ErRedemptionAPI/getAllRewardProvider/');
	};
	
 obj.saveRewardproviderdata=function(companyId,providersId){

	 return	$http({
         method: 'POST',
         url: '/ErRedemptionAPI/saveRewardProvider/'+companyId+"/"+providersId,
      });
}	
	
	obj.getCompanyjobList = function (cmpId,isActive,sessionId,loginUserId,searchText) {
		
		if(loginUserId == null){
			loginUserId = 0;
		}


	    var fd = new FormData();
	    fd.append('id', cmpId);
	    fd.append('isActive', isActive);
	    fd.append('companyId', COMPANYID);
	    fd.append('sessionId', sessionId);
	    fd.append('loginUserId', loginUserId);
	    fd.append('searchText', searchText);

	    return $http.post('/adminAPI/adminjoblist/', fd, {
		   transformRequest : angular.identity,
		   headers : {
			   'Content-Type' : undefined
		   }
	    });
		
	};
	
     obj.getJobExpression = function (id,sessionId,loginUserId) {
    	 if(loginUserId == null){
				loginUserId = 0;
			}
	
	return $http.get('/adminAPI/getJobExpression/'+id+'/'+COMPANYID+'/'+sessionId+'/'+loginUserId);
   };
   
   obj.getJoblimit = function (id,sessionId,loginUserId) {
	   if(loginUserId == null){
			loginUserId = 0;
		}
		   var fd = new FormData();
		   fd.append("adminCompanyId", COMPANYID);
		   fd.append("companyId", id);
		   fd.append("sessionId", sessionId);
		   fd.append("loginUserId", loginUserId);
		   return $http.post('/adminAPI/getJoblimit', fd, {
		   	transformRequest : angular.identity,
		   	headers : {
		   		'Content-Type' : undefined
		   	}
		   });
	   };

// saving job expression
obj.setJobExpression = function (jobId,jobExp,filterexp,growl,sessionId,loginUserId,category,domain,expLevel) {
	
	if(loginUserId == null){
		loginUserId = 0;
	}

	
	var fd = new FormData();
	fd.append('jobId', jobId);
	fd.append('jobExp', jobExp);
	fd.append('filterexp', filterexp);
	fd.append('companyId', COMPANYID);
	fd.append('sessionId', sessionId);
	fd.append('loginUserId', loginUserId);
	fd.append('category', category);
	fd.append('domain', domain);
	fd.append('expLevel', expLevel);

	return $http.post('/adminAPI/jobexpression/', fd, {
		transformRequest : angular.identity,
		headers : {
			 'Content-Type' : undefined,
            "Accept": "text/plain, application/json"
		}
	});
	
};
//save job curated
obj.setJobCurated = function(jobId,isCurated,curatedBy,loginUserId){
	
	if(loginUserId == null){
		loginUserId = 0;
	}


	var fd = new FormData();
	fd.append('jobId', jobId);
	fd.append('companyId', COMPANYID);
	fd.append('isCurated',isCurated);
	fd.append('curatedBy',curatedBy);
	return $http.post('/adminAPI/setJobCurated/'+loginUserId, fd, {
		transformRequest : angular.identity,
		headers : {
			 'Content-Type' : undefined,
            "Accept": "text/plain, application/json"
		}
	});
};
obj.setNotes = function(jobId,notes,sessionId,loginUserId){
	
	if(loginUserId == null){
		loginUserId = 0;
	}

	
	var fd = new FormData();
	fd.append('jobId', jobId);
	fd.append('notes',notes);
	return $http.post('/adminAPI/setNotes/'+COMPANYID+'/'+sessionId+'/'+loginUserId, fd, {
		transformRequest : angular.identity,
		headers : {
			 'Content-Type' : undefined,
            "Accept": "text/plain, application/json"
		}
	});
};

obj.saveIndicateSalary = function(job,sessionId,loginUserId){
	
	if(loginUserId == null){
		loginUserId = 0;
	}

	/*To strips out any property names with a leading $$ prior to serializing the job Object.*/
	var jobJson = JSON.stringify( job, function( key, value ) {
	    if( key === "$$hashKey" ) {
	        return undefined;
	    }

	    return value;
	});
	
	var fd = new FormData();
	fd.append('adminCompanyId', COMPANYID);
	fd.append("sessionId", sessionId);
	fd.append("loginUserId", loginUserId);
	fd.append("job", jobJson);
	return $http.post('/adminAPI/saveIndicateSalary', fd, {
		transformRequest : angular.identity,
		headers : {
			'Content-Type' : undefined
		}
	});
};

// saving admin scores
obj.saveAdminScores = function (id,adminExperience,adminRecommendation,growl,sessionId,loginUserId,category,domain,expLevel) {
	
	if(loginUserId == null){
		loginUserId = 0;
	}

	
    var fd = new FormData();
    fd.append('id', id);
    fd.append('adminExperience', adminExperience);
    fd.append('adminRecommendation', adminRecommendation);
    fd.append('companyId', COMPANYID);
	fd.append('sessionId', sessionId);
	fd.append('loginUserId', loginUserId);
	fd.append('category', category);
	fd.append('domain', domain);
	fd.append('expLevel', expLevel);
	
    return $http.post('/adminAPI/adminScores/', fd, {
	   transformRequest : angular.identity,
	   headers : {
		   'Content-Type' : undefined
	   }
    });
	
};
	
	// saving job Job limits for the companies
	obj.setsavejoblimit = function (CmpID,joblimit,growl,sessionId,loginUserId) {
		
		if(loginUserId == null){
			loginUserId = 0;
		}
	
	
		var fd = new FormData();
		fd.append('CmpID', CmpID);
		fd.append('joblimit', joblimit);
		fd.append('companyId', COMPANYID);
		fd.append('sessionId', sessionId);
		fd.append('loginUserId', loginUserId);
	
		return $http.post('/adminAPI/joblimit', fd, {
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		});
		
	};

		obj.insertUser = function (user, userId, growl,sessionId,loginUserId) {
			
			if(loginUserId == null){
				loginUserId = 0;
			}
	
			
			user.companyId = COMPANYID;
			user.modifiedByUserId = userId;
			var loggedAdminIdAdminId = 0;
			
			var fd = new FormData();
			
			fd.append('data', angular.toJson(user));
			fd.append("sessionId", sessionId);
			fd.append("loggedAdminIdAdminId", loggedAdminIdAdminId);
			fd.append("companyId", COMPANYID);
			fd.append("loginUserId", loginUserId);
			
			return $http.post('/userAPI/createAdminUser', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			})
	        .then(function (response) {
	        	
	        	if (response.data.webserviceAPIResponseCode == UNAUTHORIZED){
					 growl.error(UNAUTHORIZED_ERROR_MSG);
					 $('#logout').click();
					 return;
				 }
	        	else if (response.status == 200 && response.data.code == 200) {
	        		 growl.success(response.data.message);
	        		   $location.path('/manage-user');
	            }
	            else if(response.data.code == 500){
	            	$location.path('/add-user');
	            	growl.error(response.data.message);
	            } else if(response.data.code == 0){
	            	$location.path('editUser');
	            	growl.error(response.data.message);
	            } else {
	            	growl.error("Something went wrong. Please try again.");
	            }
	            return;
	        	 
	        });
			
			
		};
		
		// Change Password
		obj.changePassword = function (changePassword, username, growl,sessionId,loginUserId) {
			
			if(loginUserId == null){
				loginUserId = 0;
			}
	

			
			changePassword.companyId = COMPANYID;
			changePassword.emailId = username;
			
			var fd = new FormData();

			fd.append("sessionId", sessionId);
			fd.append("loginUserId", loginUserId);
			fd.append("changePassword",JSON.stringify(changePassword));
			$http.post('/adminAPI/changePassword', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			}).then(function (response) {
	        	
	        	if (response.status == 200 && response.data.code == 200) {
	        		$location.path('dashboard');
	            	growl.success(response.data.message);
	            }
	            else if(response.data.code == 500){
	            	$location.path('/change-password');
	            	growl.error(response.data.message);
	            }
	            else {
	            	growl.error("Something went wrong. Please try again.");
	            }
	            return;
	        	  
	        });
			
		};
		
		// Configuration
		
		obj.getConfiguration = function(sessionId,cmpId){
			
			
			var fd = new FormData();			
			fd.append("sessionId",sessionId);
			fd.append("companyId",cmpId);
			return	$http.post('/adminAPI/getConfiguration', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			});
		};
		
		// saving ats configuration
		obj.saveAtsConfiguration = function (configurationExternalSystem,growl,sessionId,loginUserId) {
			var fd = new FormData();
			fd.append("adminCompanyId", COMPANYID);
			fd.append("sessionId", sessionId);
			fd.append("loginUserId", loginUserId);
			fd.append("configurationExternalSystem", JSON.stringify(configurationExternalSystem));	
			return $http.post('/adminAPI/saveAtsConfiguration', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			});
		};
		
// get ATS configuration
		
		obj.getATSConfiguration = function(cmpID,sessionId,loginUserId){
			
			if(loginUserId == null){
				loginUserId = 0;
			}
			var fd = new FormData();
			fd.append("admincompanyId", COMPANYID);
			fd.append("companyId", cmpID);
			fd.append("sessionId", sessionId);
			fd.append("loginUserId", loginUserId);
			return $http.post('/adminAPI/getATSConfiguration', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			});
		};
		
		obj.saveConfiguration = function (emailConfiguration, configurationSeo, configurationExternalSystem, userId, growl, facebookCoverImageName, facebookCoverImage,companyCommonConfiguration) {
					
			emailConfiguration.companyId = COMPANYID;
			emailConfiguration.modifiedByUserId = userId;
				
			configurationSeo.companyId = COMPANYID;
			configurationSeo.modifiedByUserId = userId;	
			
			configurationExternalSystem.companyId = COMPANYID;
			configurationExternalSystem.modifiedByUserId = userId;
			
			var fd = new FormData();
			fd.append('emailConfigurationObj', angular.toJson(emailConfiguration));
			fd.append('configurationSeoObj', angular.toJson(configurationSeo));
			fd.append('configurationExternalSystemObj', angular.toJson(configurationExternalSystem));
			fd.append('companyCommonConfiguration', angular.toJson(companyCommonConfiguration));
				
			fd.append("file", facebookCoverImage);
			fd.append("fileName", facebookCoverImageName);
			
			fd.append("companyId", COMPANYID);
			
			$http.post('/adminAPI/saveConfiguration', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			}).then(function (response) {
	        	
	        	if (response.status == 200 && response.data.code == 200) {
	        		 $location.path('/configuration');
	            	growl.success("Settings saved successfully");
	            }
	            else if(response.data.code == 500){
	            	$location.path('/configuration');
	            	growl.error(response.data.message);
	            }
	            else {
	            	growl.error("Something went wrong. Please try again.");
	            }
	            return;
	        });	
				
		};
		
		// To calculate job application score
		obj.calculateScore = function(companyId,jobCode,expression){
			return $http.get('/adminAPI/calculateScore/'+companyId+'/'+jobCode+'/'+expression);
		};
		
		// saving ats configuration
		obj.saveCommonConfiguration = function (companyCommonConfiguration,growl,sessionId,loginUserId) {
			
			if(loginUserId == null){
				loginUserId = 0;
			}
			var fd = new FormData();
			fd.append("adminCompanyId", COMPANYID);
			fd.append("sessionId", sessionId);
			fd.append("loginUserId", loginUserId);
			fd.append("companyCommonConfiguration", JSON.stringify(companyCommonConfiguration));			
			return $http.post('/adminAPI/saveCommonConfiguration', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			});
			
		};
		
		obj.getRecruiterConfig = function(cmpID,sessionId,loginUserId){
			
			if(loginUserId == null){
				loginUserId = 0;
			}
			var fd = new FormData();
			fd.append("adminCompanyId", COMPANYID);
			fd.append("companyId", cmpID);
			fd.append("sessionId", sessionId);
			fd.append("loginUserId", loginUserId);
			return $http.post('/adminAPI/getRecruiterConfig', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			});
	};
	
	obj.getCompanyDepartmentList = function(cmpID,sessionId,loginUserId){
		
		if(loginUserId == null){
			loginUserId = 0;
		}
		var fd = new FormData();
		fd.append("companyId", cmpID);
		fd.append("adminCompanyId", COMPANYID);
		fd.append("sessionId", sessionId);
		fd.append("loginUserId", loginUserId);
		return $http.post('/adminAPI/getCompanyDepartmentList', fd, {
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		});
	};
	
	obj.getCompanyPackageServiceStatus = function(cmpID,loginUserId){
		
		if(loginUserId == null){
			loginUserId = 0;
		}

		
		return $http.get('/adminAPI/getCompanyPackageServiceStatus/'+cmpID);
	};
	
	obj.downloadTemplate = function(cmpID,$window,sessionId,loginUserId){
		
		
		if(loginUserId == null){
			loginUserId = 0;
		}

		
		 $window.open('/adminAPI/downloadCareerSite/'+cmpID+'/'+COMPANYID+'/'+sessionId+'/'+loginUserId, '_blank');
		
	};
	
	obj.UploadCareerSiteTemplate = function(cmpID,templateFile,sessionId,loginUserId){
		
		if(loginUserId == null){
			loginUserId = 0;
		}

		
		var fd = new FormData();
		
		fd.append("file", templateFile);
		fd.append("companyId", cmpID);
		fd.append("adminCompanyId", COMPANYID);
		fd.append("sessionId", sessionId);
		fd.append("loginUserId", loginUserId);
		
		return $http.post('/adminAPI/UploadCareerSiteTemplate',fd, {
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		});
		
		
	};
	
	obj.updateCompanyPackageServiceStatus = function(compnayPackageService,loginUserId,sessionId){
		compnayPackageService.JobApply = parseInt(compnayPackageService.JobApply);
		compnayPackageService.jobCount = parseInt(compnayPackageService.jobCount);
		compnayPackageService.TalentPoolApply = parseInt(compnayPackageService.TalentPoolApply);
		compnayPackageService.JobSlot = parseInt(compnayPackageService.JobSlot);
		compnayPackageService.jobVisibility = parseInt(compnayPackageService.jobVisibility);
		
		if(loginUserId == null){
			loginUserId = 0;
		}
		
		return	$http({
            method: 'POST',
            url: '/adminAPI/updateCompanyPackageServiceStatus/'+COMPANYID+"/"+sessionId+"/"+loginUserId,
            data: compnayPackageService,
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain, application/json"
            }
		
        })
		
		
	};
	
	obj.adminLoginManage = function(companyIdFromAdmin,emailId,password,sessionId,loginUserId) {
		
		if(loginUserId == null){
			loginUserId = 0;
		}

		
		 var fd = new FormData();
		 	fd.append("id",companyIdFromAdmin);
			   fd.append("emailId", emailId);
			   fd.append("password", password);
			   fd.append('companyId', COMPANYID);
			   fd.append('sessionId', sessionId);
			   fd.append('loginUserId', loginUserId);
			   fd.append('roleId', 1);
		return $http.post('/userAPI/loginFromAdminPanelToManage/',fd,{
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			
		
	});
		
	};
	
	obj.checkAdminLoginManage = function(companyIdFromAdmin,emailId,password,sessionId,loginUserId) {
		
		if(loginUserId == null){
			loginUserId = 0;
		}

		
		// var userId = localStorage.getItem('loginUserIdAdmin');
		 var fd = new FormData();
		 	fd.append("id",companyIdFromAdmin);
			   fd.append("emailId", emailId);
			   fd.append("password", password);
			  // fd.append('companyId', COMPANYID);
			   fd.append('sessionId', sessionId);
			   fd.append('loginUserId', loginUserId)
		return $http.post('/manageAPI/checkLoginFromAdminPanelToManage/',fd,{
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			
		
	});
		
	};
	

	obj.saveModifiedJobWorkflowName = function (jobId,workflowName,growl,sessionId,loginUserId) {
		
		if(loginUserId == null){
			loginUserId = 0;
		}

		
		var fd = new FormData();
		fd.append('jobId', jobId);
		fd.append('workflowName', workflowName);
		fd.append('companyId', COMPANYID);
		fd.append('sessionId', sessionId);
		fd.append('loginUserId', loginUserId);

		return $http.post('/adminAPI/saveJobWorkflowName/', fd, {
			transformRequest : angular.identity,
			headers : {
				 'Content-Type' : undefined,
	            "Accept": "text/plain, application/json"
			}
		});
		
	};
	
	
obj.getToEditJobWorkflowName = function (jobId,workflowName,growl,sessionId,loginUserId) {
		
		if(loginUserId == null){
			loginUserId = 0;
		}

		
		var fd = new FormData();
		fd.append('jobId', jobId);
		fd.append('workflowName', workflowName);
		fd.append('companyId', COMPANYID);
		fd.append('sessionId', sessionId);
		fd.append('loginUserId', loginUserId);

		return $http.post('/adminAPI/getToEditJobWorkflow/', fd, {
			transformRequest : angular.identity,
			headers : {
				 'Content-Type' : undefined,
	            "Accept": "text/plain, application/json"
			}
		});
		
	};
	
obj.tosaveEditedModifiedJobWorkflowName = function (jobId,workflowName,growl,sessionId,loginUserId,editedTextForWorkFlow,addOrEditStatus) {
		
		if(loginUserId == null){
			loginUserId = 0;
		}

		
		var fd = new FormData();
		fd.append('jobId', jobId);
		fd.append('workflowName', workflowName);
		fd.append('companyId', COMPANYID);
		fd.append('sessionId', sessionId);
		fd.append('loginUserId', loginUserId);
		fd.append("editedWorkFlow", editedTextForWorkFlow);
		fd.append("addOrEditStatus", addOrEditStatus);

		return $http.post('/adminAPI/tosaveEditedModifiedJobWorkflowName/', fd, {
			transformRequest : angular.identity,
			headers : {
				 'Content-Type' : undefined,
	            "Accept": "text/plain, application/json"
			}
		});
		
	};
	
	
		
obj.saveCompany = function(company,loginUserId){
	
	if(loginUserId == null){
		loginUserId = 0;
	}

	
		return	$http({
        method: 'POST',
        url: '/adminAPI/saveCompany/'+loginUserId,
        data: company,
        headers: {
            "Content-Type": "application/json",
            "Accept": "text/plain, application/json"
        }
	
    })	
		
	};
	
	obj.quikrDataMigration = function(startDate,endDate){
		
		return $http.get('/adminAPI/quikrDataMigration/'+startDate+'/'+endDate);
		
	};
	
	
	obj.checkWebSiteOrDomainDuplication=function(companyId,website,domainName){
		
		var fd=new FormData();
		fd.append('webSite', website);
		fd.append('domainName', domainName);
		fd.append('companyId', companyId);
		return $http.post('/adminAPI/checkWebSiteOrDomainDuplication/', fd, {
			transformRequest : angular.identity,
			headers : {
				 'Content-Type' : undefined,
	            "Accept": "text/plain, application/json"
			}
		});
		
	
	}
	
	obj.appliesMigrationToMongoDb = function(companyIds,startDate,endDate,ids,workflowName,pastActions) {
				
		var fd=new FormData();
		fd.append('companyIds', companyIds);
		fd.append('startDate', startDate);
		fd.append('endDate', endDate);
		fd.append('ids',ids);
		fd.append('workflowName',workflowName);
		fd.append('pastActions', pastActions);
		return $http.post('/adminAPI/mongoDbUpdationForExistingApplies/', fd, {
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined,
				"Accept": "text/plain, application/json"
			}
		});
	};
	
	obj.reCreateFinalActions = function(companyIds,startDate,endDate,ids,workflowName,pastActions) {
		
		var fd=new FormData();
		fd.append('companyIds', companyIds);
		fd.append('startDate', startDate);
		fd.append('endDate', endDate);
		fd.append('ids',ids);
		return $http.post('/adminAPI/reCreateFinalActions/', fd, {
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined,
				"Accept": "text/plain, application/json"
			}
		});
	};
	
	obj.getJobRoles=function(jobId){
		return $http.get('/adminAPI/getJobRoles/');
	}
	obj.getRoles= function(searchText){
		
		return $http.get('/adminAPI/searchRoles/'+searchText+'/');
	};
	
	obj.saveRole= function(selectedRoleId,jobId){
		return $http.get('/adminAPI/saveRole/'+selectedRoleId+'/'+jobId+'/');
	};
	
	obj.getRecruiterWorkflowMaster = function(sessionId,loginUserId){
		
		if(loginUserId == null){
			loginUserId = 0;
		}
		var fd = new FormData();
		fd.append("adminCompanyId", COMPANYID);
		fd.append("sessionId", sessionId);
		fd.append("loginUserId", loginUserId);
		return $http.post('/adminAPI/getListOfWorkFlowNames', fd, {
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		});
	};
	
	obj.getAllUsersName = function(){
		return $http.get('/adminAPI/getAllUsersName/');
	};

	
	obj.getCommonListOfJobs = function(userId, status, userJobStatus,jobType,sessionId,isActive,searchTexts,isCalledFrom,companyId){
		if(isCalledFrom == 'A'){
			var cid = companyId;
		}else{
			var cid = COMPANYID;
		}
		
		if(typeof searchTexts == 'undefined' || searchTexts == undefined || searchTexts == 'null' || searchTexts == ''){
			searchTexts = null;
		}
		var fd = new FormData();
		fd.append("sessionId", sessionId);			
		fd.append("userId", userId);
		fd.append("status", status);			
		fd.append("userJobStatus", userJobStatus);		
		fd.append("jobType", jobType);
		fd.append("searchTexts", encodeURIComponent(searchTexts));			
		fd.append("isCalledFrom", isCalledFrom);		
		fd.append("isActive", isActive);	
		fd.append("companyId", cid);
		
		return $http.post('/manageAPI/commonListOfJobs', fd, {		
			transformRequest : angular.identity,		
			headers : {		
				'Content-Type' : undefined		
			}		
		});	
};
	 
	
	return obj;   
	}]);



ccubeApp.filter('startFrom', function () {
    return function (input, start) {
        start = +start; // parse to int
        if(input != null){
        	return input.slice(start);
        } else {
        	return "";
        }
    };
});


ccubeApp.controller('adminloCtrl', function ($scope, $rootScope, $location, $routeParams, services,localStorageService,growl,xdLocalStorage,$timeout) {
	$scope.$on('$viewContentLoaded', function() {
		pageName = "";
		 var emailId =  localStorage.getItem('userNameAdmin');
		 if($rootScope.sessionTimeOut){
			 growl.error('Sorry. Your session expired. Please login again');
			
	         services.loggedInUser(emailId).then(function(data){
		     $scope.user = data.data;
		     $scope.user.password = null;
		    
		
	         });
	         $rootScope.sessionTimeOut = false;
		}
		 
    });
	
	$rootScope.jobApplicationWithResume = null;
    $rootScope.jobApplicationWithoutResume = null;
    $rootScope.AppliesFilterStatusValue = null;
	 
	$timeout( function(){ $scope.callAtTimeout(); }, 1000);
	
	$scope.callAtTimeout = function() {
		var sessionIdAdmin = "";
		xdLocalStorage.getItem("sessionIdAdmin").then(function (response) {
			sessionIdAdmin = response.value;
			$scope.emailId = localStorage.getItem('userNameAdmin');
			if(sessionIdAdmin != "" && sessionIdAdmin !='empty' && sessionIdAdmin !=null) {
				services.checkLoginSession($scope.emailId,sessionIdAdmin).then(function(data) {
					$scope.loggedInUser = data.data;
				
					if($scope.loggedInUser.id){
						
						xdLocalStorage.setItem('sessionIdAdmin', $scope.loggedInUser.sessionId, function (data) { /* callback */ });
						
						localStorage.setItem('sessionId', $scope.loggedInUser.sessionId);
			    		localStorage.setItem('loginUserIdAdmin', $scope.loggedInUser.id);
			    		localStorage.setItem('userNameAdmin', $scope.loggedInUser.emailId);
			    		localStorage.setItem('welUserNameAdmin', $scope.loggedInUser.username);
			    		/*localStorage.setItem('userPermissionForManageJobs', $scope.loggedInUser.userPermission1);
			    		localStorage.setItem('userPermissionForManageApplies', $scope.loggedInUser.userPermission2);
			    		localStorage.setItem('userPermissionForManageUser', $scope.loggedInUser.userPermission3);
			    		localStorage.setItem('userPermissionForConfigureTheme', $scope.loggedInUser.userPermission4);
			    		localStorage.setItem('userPermissionForDecomissionDeleteCompany', $scope.loggedInUser.userPermission5);
			    		localStorage.setItem('userPermissionForModifiyCompany', $scope.loggedInUser.userPermission6);
			    		localStorage.setItem('userPermissionToManageForAdmin', $scope.loggedInUser.userPermission9);*/
			    		localStorage.setItem('encodedEmailId', $scope.loggedInUser.encodedEmailId);
			    		Cookies.set('isZwayamRegistered', '0', { expires: 7, path: '/' });
			    		$rootScope.userName = $scope.loggedInUser.emailId;
			        	$rootScope.userNameDisplay = $scope.loggedInUser.username;
			        	
			        	
			        	$location.path('/dashboard');
			  		   
					}
					
				});
			}
	    });
    }
	
	

	
	
	$scope.submitLoginForm = function() {
		var storageType = localStorageService.getStorageType();
		services.login($scope.user.emailId,$scope.user.password).then(function(ResponseObject){
			$rootScope.sessionTimeOut = false;
	        $scope.loginstatus = ResponseObject.data.data10; 
	        $scope.sessionId=ResponseObject.data.data1;
	        if($scope.loginstatus == 4){
	        	$scope.failuremsg = "5 incorrect attempts to verify login. Please try again in 10 minutes.";
	        } else if ($scope.loginstatus == 5){
	        	$scope.failuremsg = "Too many Incorrect attempts to verify login. Please try again in 10 minutes.";
	        } else if($scope.sessionId == null || $scope.loginstatus == 2 || $scope.loginstatus == 0){
	        	$scope.failuremsg = " Sorry! Looks like you typed it wrong. Please try again.";
	        } else if($scope.loginstatus == 3){
	        	$scope.failuremsg = "Your account has been deactivated";
	        } else{
	        	
	        	services.loggedInUser($scope.user.emailId,$scope.sessionId).then(function(data){
	        		$scope.loggedInUser = data.data;
	        		localStorage.setItem('sessionId', $scope.loggedInUser.sessionId);
	        		localStorage.setItem('sessionIdOfAdmin', $scope.loggedInUser.sessionId);
	        		localStorage.setItem('loginUserIdAdmin', $scope.loggedInUser.id);
	        		localStorage.setItem('loginUserIdOfAdminToManage', $scope.loggedInUser.id);
	        		xdLocalStorage.setItem('sessionIdAdmin', $scope.loggedInUser.sessionId, function (data) { /* callback */ });
	        		localStorage.setItem('loginUserIdAdmin', $scope.loggedInUser.id);
	        		localStorage.setItem('userNameAdmin', $scope.loggedInUser.emailId);
	        		localStorage.setItem('welUserNameAdmin', $scope.loggedInUser.username);
	        		localStorage.setItem('IssuperUsers', $scope.loggedInUser.issuperuser);
	        		localStorage.setItem('recLinkedInProfile', $scope.loggedInUser.linkedInProfile);
	        		localStorage.setItem('userPermissionForManageJobs', $scope.loggedInUser.userPermission1);
	        		localStorage.setItem('userPermissionForManageApplies', $scope.loggedInUser.userPermission2);
	        		localStorage.setItem('userPermissionForManageUser', $scope.loggedInUser.userPermission3);
	        		localStorage.setItem('userPermissionForConfigureTheme', $scope.loggedInUser.userPermission4);
		    		localStorage.setItem('userPermissionForDecomissionDeleteCompany', $scope.loggedInUser.userPermission5);
		    		localStorage.setItem('userPermissionForModifiyCompany', $scope.loggedInUser.userPermission6);
		    		localStorage.setItem('userPermissionToManageForAdmin', $scope.loggedInUser.userPermission9);
		    		localStorage.setItem('adminLoginToManage',"false");
	        		localStorage.setItem('encodedEmailId', $scope.loggedInUser.encodedEmailId);
	        		Cookies.set('isZwayamRegistered', '0', { expires: 7, path: '/' });
	        		$rootScope.userName = $scope.user.emailId;
		        	$rootScope.userNameDisplay = $scope.loggedInUser.username;
		        	localStorage.setItem('isUserExist','yes');
		        	
		        	if(localStorage.getItem('managePagePath') == "applicationview"){
		        		$location.path('/application-view');
		        	}else if(localStorage.getItem('managePagePath') == "jobapplicationsort"){
		        		$location.path('/job-applications');
		        	}else if(localStorage.getItem('managePagePath') == "company-jobs"){
		        		$location.path('/company-jobs');
		        	}else{
		        		$location.path('/dashboard');
		        	}

	        	});	
	        } 
	    });		
	}
	
});

ccubeApp.controller('logOutCtrl', function ($scope, $rootScope, $location, $routeParams, services,localStorageService,$window,xdLocalStorage) {
	
	pageName = "";
	var localStorage = $window.localStorage;
	$scope.sessionId=localStorage.getItem('sessionId');
	$scope.loginUserIdAdmin=localStorage.getItem('loginUserIdAdmin');
	localStorage.removeItem('managePagePath');
	// localStorage.removeItem('operation');
	localStorage.removeItem('userNamAdmine');
	localStorage.removeItem('IssuperUsers');
	localStorage.removeItem('companyId');	
	localStorage.removeItem('jobId');	
	localStorage.removeItem('cmpny_id_forjoblimit');	
	localStorage.removeItem('welUserNameAdmin');
	localStorage.removeItem('loginUserIdAdmin');
/*	localStorage.removeItem('userPermissionForManageUser');
	localStorage.removeItem('userPermissionForManageJobs');
	localStorage.removeItem('userPermissionForManageApplies');
	localStorage.removeItem('userPermissionForDecomissionDeleteCompany');
	localStorage.removeItem('userPermissionToManageForAdmin');
	localStorage.removeItem('userPermissionForModifiyCompany');*/
	sessionStorage.removeItem('jobApplicationId');
	localStorage.removeItem('appJobTitle');
	localStorage.removeItem('manageJobId'); 
	localStorage.removeItem('manageUserId');
	localStorage.removeItem('encodedEmailId');
	localStorage.removeItem('appStatus');
	localStorage.removeItem('sessionIdOfAdmin');
	localStorage.setItem('isUserExist','no');
	$rootScope.jobApplicationWithResume = null;
    $rootScope.jobApplicationWithoutResume = null;
    $rootScope.AppliesFilterStatusValue = null;
	
	if(localStrorageValue == 0) {
		localStorage.setItem('hmPanelSessionActive','no');
	}
	
	xdLocalStorage.setItem("sessionIdAdmin", "empty", function (data) { /* callback */ });
	
	var emailId = localStorage.getItem('userNameAdmin');
	/*var user = {
	    	"sessionIdAdmin" : "",
	    	"emailId" : emailId
	    }*/
	
	services.updateUserSessionData($scope.sessionId,$scope.loginUserIdAdmin);
		
	$rootScope.userName = null;
	$rootScope.selectedJobId = null;
	$rootScope.jobId = null
	$rootScope.appStatus = null;
	 $rootScope.class1 = "push-class-no";
	 $rootScope.class2 = "push-class-no";
	 $rootScope.class3 = "push-class-no";
	 $rootScope.class4 = "push-class-no";
	 $rootScope.appFilter1 = null;
	 $rootScope.appFilter2 = null;
	 $rootScope.appFilter3 = null;
	 $rootScope.appFilter4 = null;
	 $rootScope.appFilter5 = null;
	 $rootScope.manageJobStatus = "MyJobs";
	 $rootScope.jobLimit = 5;
	 $rootScope.companyLimit = 5;
	 $window.location.href ="./#/"; // new line added to reduce logout time
	 
	 // commented below ,since takes too much to logout(on logout goes to
		// login page and again reloads the manage home(login) page)
	 // $window.location.href ="./#/login";
	 // $window.location.reload();
});



// Change password controller
ccubeApp.controller('changePasswordCtrl', function ($scope,services,localStorageService,growl,$location,$rootScope) {
 	
	var userName = localStorage.getItem('userNameAdmin');
	var userId = localStorage.getItem('loginUserIdAdmin');
	var welUserName = localStorage.getItem('welUserNameAdmin');
	$rootScope.selectedJobId = null;
	$rootScope.jobId = null
	$rootScope.appStatus = null;
	 $rootScope.class1 = "push-class-no";
	 $rootScope.class2 = "push-class-no";
	 $rootScope.class3 = "push-class-no";
	 $rootScope.class4 = "push-class-no";
	 $rootScope.appFilter1 = null;
	 $rootScope.appFilter2 = null;
	 $rootScope.appFilter3 = null;
	 $rootScope.appFilter4 = null;
	 $rootScope.appFilter5 = null;
	 $rootScope.manageJobStatus = "MyJobs";
	 $rootScope.jobLimit = 5;
	 $rootScope.companyLimit = 5;
	 $rootScope.jobApplicationWithResume = null;
     $rootScope.jobApplicationWithoutResume = null;
     $rootScope.AppliesFilterStatusValue = null;
	
	if(userName === null){
		$location.path('/login');
		return;
	}
	else {
		$scope.userName = userName;
		$scope.userId = userId;
		$scope.welUserNameAdmin = welUserName;
	}
	$scope.buttonText =  "Save";
	
	$scope.sessionId=localStorage.getItem('sessionId');
	$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
	
	$scope.saveChangePassword = function() { 
		
		services.changePassword($scope.changePassword, userName, growl,$scope.sessionId,$scope.loginUserId).then(function (response) {
    		 
	    	   
	    	    if(response.data.webserviceAPIResponseCode == UNAUTHORIZED){
	    	    	
	    	    	growl.error(UNAUTHORIZED_ERROR_MSG);
	    	    	$('#logout').click();
	    	    	return;
	    	    }
	    		 
			    
			
		        });	
		    
	};
	
});



// Configuration controller
ccubeApp.controller('configurationCtrl', function ($scope,services,localStorageService,growl,$location,$rootScope,fileReader) {
	
	var userName = localStorage.getItem('userNameAdmin');
	var userId = localStorage.getItem('loginUserIdAdmin');
	var userPermissionForManageUser = localStorage.getItem('userPermissionForManageUser');
	var welUserName = localStorage.getItem('welUserNameAdmin');
	$rootScope.selectedJobId = null;
	$rootScope.jobId = null
	$rootScope.appStatus = null;
	 $rootScope.class1 = "push-class-no";
	 $rootScope.class2 = "push-class-no";
	 $rootScope.class3 = "push-class-no";
	 $rootScope.class4 = "push-class-no";
	 $rootScope.appFilter1 = null;
	 $rootScope.appFilter2 = null;
	 $rootScope.appFilter3 = null;
	 $rootScope.appFilter4 = null;
	 $rootScope.appFilter5 = null;
	 $rootScope.manageJobStatus = "MyJobs";
	 $rootScope.jobLimit = 5;
	 $rootScope.companyLimit = 5;
	 $rootScope.jobApplicationWithResume = null;
     $rootScope.jobApplicationWithoutResume = null;
     $rootScope.AppliesFilterStatusValue = null;
	
	if(userName === null){
		$location.path('/login');
		return;
	}
	else {
		$scope.userName = userName;
		$scope.userId = userId;
		$scope.userPermissionForManageUser = userPermissionForManageUser;
		
		$scope.welUserNameAdmin = welUserName;
	}
	
	$scope.approvalEmailContent = {
		    language: 'en',
		    allowedContent: true,
		    entities: false,
		    toolbar: [
		              { name: 'basicstyles', items : [ 'Bold','Italic','Underline'] },
		              { name: 'paragraph',   items : [ 'NumberedList','BulletedList'] }
		            ] // or set toolbar or toolbarGroups.
		  };
	
	$scope.rejectionEmailContent = {
		    language: 'en',
		    allowedContent: true,
		    entities: false,
		    toolbar: [
		              { name: 'basicstyles', items : [ 'Bold','Italic','Underline'] },
		              { name: 'paragraph',   items : [ 'NumberedList','BulletedList'] }
		            ] // or set toolbar or toolbarGroups.
		  };
	
	$scope.applicationEmailContent = {
		    language: 'en',
		    allowedContent: true,
		    entities: false,
		    toolbar: [
		              { name: 'basicstyles', items : [ 'Bold','Italic','Underline'] },
		              { name: 'paragraph',   items : [ 'NumberedList','BulletedList'] }
		            ] // or set toolbar or toolbarGroups.
		  };
	
	// Called when the editor is completely ready.
	  $scope.onReady = function () {
	    // ...
	  };
		    
	  var facebookCoverImage = null;
	  var facebookCoverImageName = null;
	  $scope.setFileName = function(fileInput) {

			var file = fileInput.value;
			var filename = file.replace(/^.*[\\\/]/, '');
			$scope.fileName = filename;
			$("#filename").html(filename);
			
			facebookCoverImageName = filename;
			
			var imageFile = fileUpload.files[0];
			
			if (typeof imageFile == "undefined") {
				imageFile = "null";
				
			} else {
			
			fileReader.readAsDataUrl(imageFile, $scope)
            .then(function(result) {
                $scope.imageSrc = result;
                $scope.showImage = true;
            });
			
			}
			
			facebookCoverImage = imageFile;
			
		};
	   
		var hostName = $location.host();
		var siteUrl = "";
		
		$scope.sessionId=localStorage.getItem('sessionId');
		$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
			
	services.getConfiguration($scope.sessionId,$scope.loginUserId).then(function(data){
		
		if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
			
			growl.error(UNAUTHORIZED_ERROR_MSG);
			$('#logout').click();
			return;
		}

		
		$scope.emailConfiguration = data.data.emailConfiguration;
        $scope.configurationSeo = data.data.configurationSeo;
        $scope.configurationExternalSystem = data.data.configurationExternalSystem;
       /*
		 * $scope.configurationExternalSystem =
		 * data.data.configurationExternalSystem;
		 */
        $scope.companyCommonConfiguration = data.data.companyCommonConfiguration;
           
        if($scope.configurationExternalSystem.companyFolder == ""){
        	
        	$scope.imageSrc = "images/"+$scope.configurationExternalSystem.facebookCoverImageName;
        
        } else {
        	
        	if(isLocal) {
        		
        		
        		$scope.imageSrc = COMPANYURL+"/images/"+$scope.configurationExternalSystem.facebookCoverImageName;
        		
        	} else {
        	
        		$scope.imageSrc = "http://"+$scope.configurationExternalSystem.careerSiteUrl+"/images/"+$scope.configurationExternalSystem.facebookCoverImageName;
            
        	}

        }
         
        var imageName = $scope.imageSrc.substring($scope.imageSrc.lastIndexOf("/") + 1);
        
        if($scope.configurationExternalSystem.facebookCoverImageName) {
        	
        	$scope.showImage = true;
        	$scope.fileName = imageName;
        	
        } else {
        	
        	$scope.showImage = false;
        }
       
        // $location.path('/email-config');
    });
	
	$scope.buttonText =  "Save";
	
	$scope.sessionId=localStorage.getItem('sessionId');
	$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
	
	$scope.saveConfiguration = function() { 
		services.saveConfiguration($scope.emailConfiguration, $scope.configurationSeo, $scope.configurationExternalSystem, userId, growl,facebookCoverImageName,facebookCoverImage,$scope.companyCommonConfiguration,$scope.sessionId,$scope.loginUserId);
    
		 /*
			 * services.getEmailConfiguration().then(function(data){
			 * $scope.emailConfiguration = data.data;
			 * $location.path('/email-config'); });
			 */
	};
	
});

// Create User
ccubeApp.controller('createUserCtrl', function ($scope,services,localStorageService,growl,$location,$rootScope) {
	pageName = "";
	var userName = localStorage.getItem('userNameAdmin');
	var userId = localStorage.getItem('loginUserIdAdmin');
	var welUserName = localStorage.getItem('welUserNameAdmin');
	$rootScope.selectedJobId = null;
	$rootScope.jobId = null
	$rootScope.appStatus = null;
	 $rootScope.class1 = "push-class-no";
	 $rootScope.class2 = "push-class-no";
	 $rootScope.class3 = "push-class-no";
	 $rootScope.class4 = "push-class-no";
	 $rootScope.appFilter1 = null;
	 $rootScope.appFilter2 = null;
	 $rootScope.appFilter3 = null;
	 $rootScope.appFilter4 = null;
	 $rootScope.appFilter5 = null;
	 $rootScope.manageJobStatus = "MyJobs";
	 $rootScope.jobLimit = 5;
	 $rootScope.companyLimit = 5;
	$scope.activeClassUser = $rootScope.myClass;
	$scope.pageHeading = "Add New User";
	$rootScope.jobApplicationWithResume = null;
    $rootScope.jobApplicationWithoutResume = null;
    $rootScope.AppliesFilterStatusValue = null;

	if(userName === null){
		$location.path('/login');
		return;
	}
	else {
		$scope.userName = userName;
		$scope.userId = userId;
		$scope.welUserNameAdmin = welUserName;
	}

	
	$scope.user = {
			userPermission1 : false,
			userPermission2 : false,
			userPermission3 : false,
			userPermission4 : false,
		     };
	
	
	$scope.buttonText =  "Save";
	
	$scope.sessionId=localStorage.getItem('sessionId');
	$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
	
	
	$scope.saveUser = function() { 
		
		services.insertUser($scope.user, userId, growl,$scope.sessionId,$scope.loginUserId).then(function (response) {
    		 
	    	   
	    	    if(response.data.webserviceAPIResponseCode == UNAUTHORIZED){
	    	    	
	    	    	growl.error(UNAUTHORIZED_ERROR_MSG);
	    	    	$('#logout').click();
	    	    	return;
	    	    }
		
		   });	
	 
	};
	
	
});


//Execute Query
ccubeApp.controller('adminManageQueryCtrl', function(COMPANYID,$scope,$rootScope,$http,services,localStorageService,growl,$activityIndicator){

	
	$rootScope.jobApplicationWithResume = null;
    $rootScope.jobApplicationWithoutResume = null;
    $rootScope.AppliesFilterStatusValue = null;
	pageName = "";
	$scope.from;
	$scope.fields;
	$scope.condition;
	$scope.filename;
	$scope.blobfield;
	$scope.blobfilename;
	
	$scope.sessionId=localStorage.getItem('sessionId');
	$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
	
	$scope.runQuery = function(){
		$activityIndicator.startAnimating();
		// start
		var data = $.param({
			queryName:$scope.selected,
  			from:$scope.from,
  			field:$scope.fields,
  			condition:$scope.condition,
  			filename:$scope.filename
  			
			});

	var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};		  
		$http.post('/AdminQueryManager/runSimpleQuery/'+COMPANYID+'/'+$scope.sessionId+'/'+$scope.loginUserId, data, config)
        .then(function (data, config) { 
        	 $activityIndicator.stopAnimating();
        if(data.webserviceAPIResponseCode == 401){
        	growl.error("Session expired.Please login again to continue.");
        	window.location.href="login.html"; 
        }else if(data.data.code == 200){
        	 growl.success("Query Executed Successfully.");
        }else if(data.data.code == 500){
        	 growl.error("Query Failed.");
        }
       
       });

}
$scope.getblobfile = function(){
	$activityIndicator.startAnimating();
		var data = $.param({
			from:$scope.from,
			field:$scope.fields,
  			condition:$scope.condition,
  			filename:$scope.filename,
  			blobfield:$scope.blobfield,
  			blobfilename:$scope.blobfilename
  			});
		var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};		  
		$http.post('/AdminQueryManager/runBlobQuery/'+COMPANYID+'/'+$scope.sessionId+'/'+$scope.loginUserId, data, config)
        .then(function (data, status, headers, config) { 
        $activityIndicator.stopAnimating();
        if(data.code == 401){
        	growl.error("Session expired.Please login again to continue.");
        	window.location.href="login.html"; 
        }else if(data.data.code == 200){
        	 growl.success("Query Executed Successfully.");
        }else if(data.data.code == 500){
        	 growl.error("Query Failed.");
        } 
      
       });     

}
	
	$scope.saveQuery = function(){
	var data = {
		from:$scope.from,
		fields:$scope.fields,
		condition:$scope.condition		
		};
	var filename = $scope.filename;
	var email = $scope.email;
	var queryName = $scope.queryname;
	var executionTime = $scope.executionTime;
	var alertFrequency = $scope.alertFrequency;
	var fd = new FormData();
	fd.append('fileName',filename);
	fd.append('email',email);
	fd.append('queryName',queryName);
	fd.append('executionTime',executionTime);
	fd.append('alertFrequency',alertFrequency);
	fd.append('data', angular.toJson(data));
	$activityIndicator.startAnimating();
	return $http.post('/AdminQueryManager/saveQuery', fd, {
		transformRequest : angular.identity,
		headers : {
			'Content-Type' : undefined
		}
	}).then(function(response){
		$activityIndicator.stopAnimating();
		if (response.data.code == 200) {
				   growl.success("Saved Successfully.");	 
	             } else if(response.data.code == 400) {
	            	  growl.error("Query name is aleady exists.");
	             }else{
	            	 growl.error("Saving Failed");
	             }
		}); 
}
$scope.queryNameList = [];
$scope.fillQueryName = function () {
 var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};		  
	$http.post('/AdminQueryManager/getQueryName', config)
 .then(function (result, status, headers, config) { 
	 $scope.queryNameList = result.data;         
})
.catch(function (data, status, header, config) {
	}); 
}
$scope.selectQuery = function() {
	var data = $.param({queryName:$scope.selected});
	var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};		  
	$http.post('/AdminQueryManager/getQuery',data, config)
 .then(function (result, status, headers, config) {  
	 var query = JSON.parse(result.data);
	 $scope.from = query.from;
	 $scope.fields = query.fields;
	 $scope.condition = query.condition;	 
 })
 .catch(function (result, status, header, config) {
	}); 
}
	$("#clear").click(function(){
		$scope.from = null;
		$scope.fields = null;
		$scope.condition = null;
		$scope.blobfield = null;
		$scope.blobfilename = null;
		$scope.executionTime = null;
		$scope.email = null;
		$scope.queryname = null;
		$scope.filename = null;
		$("#run").show();
		$("#blobfilename").prop("disabled",true);
	});
	$("#blobfield").bind('keyup mouseup',function(){
		flag = false;
	    $("#blobfield").each(function(){
	       if($(this).val()==""){
	          flag=true;
	       }
	   });
	   if(flag){
	       $("#getblob").hide();
	       $("#run").show();
               $("#blobfilename").prop("disabled",true);
	   }
	   else
	   {
	     $("#run").hide();
	     $("#getblob").show();
             $("#blobfilename").prop("disabled",false);
	  } 
	});
});
ccubeApp.controller('feedGeneratorCtrl',function($scope,$rootScope,$http,localStorageService,services, growl) {
	
	$scope.divShow = false;
	$rootScope.jobApplicationWithResume = null;
    $rootScope.jobApplicationWithoutResume = null;
    $rootScope.AppliesFilterStatusValue = null;

	$scope.saveFeeds = function(scope, element){
		if($scope.feed.name != undefined && $scope.feed.name != '' &&
			$scope.feed.consumerKey != undefined && $scope.feed.consumerKey != '' &&
			$scope.feed.consumerSecret != undefined && $scope.feed.consumerSecret != '' &&
			$scope.feed.tokenKey != undefined && $scope.feed.tokenKey != '' &&
			$scope.feed.tokenSecret != undefined && $scope.feed.tokenSecret != ''){
			var data = $.param({name: $scope.feed.name,
				authKeys: $scope.feed.consumerKey+','+$scope.feed.consumerSecret+','+$scope.feed.tokenKey+','+$scope.feed.tokenSecret,
				dataFormat: $scope.feed.dataFormat});
			var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};

			$http.post('/FeedGeneratorController/setFeedPassKeys/', data, config)
			.then(function(data,config){
				growl.success("Your Feed configuration is saved successfully.");
				$scope.feed = {};
				$scope.feed.name = "Twitter";
			})
			.catch(function(data,config){
				growl.error("Saving to database failed.");
			});
		}
		else{
			
			growl.warning("Please enter mandatory fields.");
		}
		
	}
	
	$scope.toggleDiv = function(){
		
		if($scope.divShow == false)
			$scope.divShow = true;
		else
			$scope.divShow = false;
	};
	
});

// Manage-user
ccubeApp.controller('manageUserCtrl', function ($scope, services,localStorageService,$location,growl,$window,$rootScope,Pagination,PAGESIZE,prompt,$activityIndicator) {
	
	pageName = "";
	var userName = localStorage.getItem('userNameAdmin');
	var userId = localStorage.getItem('loginUserIdAdmin');
	var welUserName = localStorage.getItem('welUserNameAdmin');
	var userPermissionForManageUser = localStorage.getItem('userPermissionForManageUser');
	$rootScope.selectedJobId = null;
	$rootScope.jobId = null;
	$rootScope.appStatus = null;
	 $rootScope.class1 = "push-class-no";
	 $rootScope.class2 = "push-class-no";
	 $rootScope.class3 = "push-class-no";
	 $rootScope.class4 = "push-class-no";
	 $rootScope.appFilter1 = null;
	 $rootScope.appFilter2 = null;
	 $rootScope.appFilter3 = null;
	 $rootScope.appFilter4 = null;
	 $rootScope.appFilter5 = null;
	 $rootScope.manageJobStatus = "MyJobs";
	 $rootScope.jobLimit = 5;
	 $rootScope.companyLimit = 5;
	 $scope.parseInt = parseInt;
	 $rootScope.jobApplicationWithResume = null;
     $rootScope.jobApplicationWithoutResume = null;
     $rootScope.AppliesFilterStatusValue = null;
	if(userName === null){
		$location.path('/login');
		return;
	}
	else {
		$scope.userName = userName;
		$scope.userId = parseInt(userId);
		$scope.userPermissionForManageUser = userPermissionForManageUser;
		$scope.welUserNameAdmin = welUserName;
	}
	
	$activityIndicator.startAnimating();
	$scope.sessionId=localStorage.getItem('sessionId');
	$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
	 
	services.getUserList($scope.sessionId,$scope.loginUserId).then(function(data){
		
		
		
		
		if (data.data.length == 1){
			 $activityIndicator.stopAnimating();
			 $scope.userObject=data.data[0];
			 if($scope.userObject.webserviceAPIResponseCode == UNAUTHORIZED){
				 $scope.user=null;
			 growl.error(UNAUTHORIZED_ERROR_MSG);
			 $('#logout').click();
			 return;
			 }
		 }
		$activityIndicator.stopAnimating();
		$scope.pagination = Pagination.getNew(PAGESIZE);
	
        $scope.user = data.data;
        
        $scope.pagination.numPages = Math.ceil($scope.user.length/$scope.pagination.perPage);
        $scope.pageSize = PAGESIZE;
        
        $scope.totalRecords = $scope.user.length;
        
        $scope.totalNoOfPages =  $scope.pagination.numPages;
    });
	
	
	$scope.updateUserPage = function(id) {
		$rootScope.userId = parseInt(id);
		
		localStorage.setItem('manageUserId', $rootScope.userId);
		
		$location.path('/editUser');
	}
	
 $scope.deleteUser = function(id) {
	 
	 $scope.sessionId=localStorage.getItem('sessionId');
	 $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
		
		  // simple confirmation
		  prompt({
		   /* title: 'Confirmation', */
		    message: 'Are you sure you want to delete this user?'
		  }).then(function(){
			  services.deleteUser(id,$scope.sessionId,$scope.loginUserId).then(function(data){
					
				  if(data.webserviceAPIResponseCode == UNAUTHORIZED){
						
						growl.error(UNAUTHORIZED_ERROR_MSG);
						$('#logout').click();
						return;
					}

					 if(data.code === 200){
						 growl.success(data.message);
					 } else if (data.code === 500){
						 growl.success(data.message);
					 } else {
						 growl.error("Something went wrong. Please try again.");
					 }
					 
				    });
		 			 
		 			$scope.user = $scope.user.filter(function(item) {
		 			    return item.id !== id;
		 			});
		  });
			
		 	
		 
	    };
	    
	    // sorting
	    $scope.sort = {
	            active: '',
	            descending: undefined
	        }     
	         	
	        $scope.changeSorting = function(column) {

	            var sort = $scope.sort;
	 
	            if (sort.active == column) {
	                sort.descending = !sort.descending;
					
	            } else {
	                sort.active = column;
	                sort.descending = false;
	            }
	        };
	        
	        $scope.getIcon = function(column) {
	                     
	            var sort = $scope.sort;
	            
	            if (sort.active == column) {
	              return sort.descending
	                ? 'glyphicon-chevron-up'
	                : 'glyphicon-chevron-down';
	            }
	            
	            return 'glyphicon-star';
	        }
	    
	    
});

// Edit user
ccubeApp.controller('editUserCtrl', function ($scope,services,$routeParams,localStorageService,growl,$rootScope) {
	pageName = "";
	$scope.userName = localStorage.getItem('userNameAdmin');
	$scope.userId = localStorage.getItem('loginUserIdAdmin');
	$scope.welUserNameAdmin = localStorage.getItem('welUserNameAdmin');
	$rootScope.selectedJobId = null;
	$rootScope.jobId = null;
	$rootScope.appStatus = null;
	 $rootScope.class1 = "push-class-no";
	 $rootScope.class2 = "push-class-no";
	 $rootScope.class3 = "push-class-no";
	 $rootScope.class4 = "push-class-no";
	 $rootScope.appFilter1 = null;
	 $rootScope.appFilter2 = null;
	 $rootScope.appFilter3 = null;
	 $rootScope.appFilter4 = null;
	 $rootScope.appFilter5 = null;
	 $rootScope.manageJobStatus = "MyJobs";
	 $rootScope.jobLimit = 5;
	 $rootScope.companyLimit = 5;
	$scope.pageHeading = "Edit User";
	var id = $rootScope.userId;
	$rootScope.jobApplicationWithResume = null;
    $rootScope.jobApplicationWithoutResume = null;
    $rootScope.AppliesFilterStatusValue = null;
	
	if(!id){
		
	  id = localStorage.getItem('manageUserId');
	
	}
	
	$scope.activeClassUser = $rootScope.myClass;
	
	$scope.sessionId=localStorage.getItem('sessionId');
	$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
	
	services.editUser(id,$scope.sessionId,$scope.loginUserId).then(function(data){
		$scope.user = data.data;
		
		if($scope.user.webserviceAPIResponseCode == UNAUTHORIZED){
			
			growl.error(UNAUTHORIZED_ERROR_MSG);
			$('#logout').click();
			return;
		}
		
	});
	$scope.saveUser = function() {  
		services.insertUser($scope.user, $scope.userId, growl,$scope.sessionId,$scope.loginUserId);
	};
		
	});

ccubeApp.config(function (localStorageServiceProvider) {
	  localStorageServiceProvider
	    .setPrefix('ccube')
	    .setStorageType('sessionStorage')
	    .setNotify(true, true)
	});

ccubeApp.config(['growlProvider', function (growlProvider) {
	  growlProvider.globalTimeToLive(2000);
	  growlProvider.globalReversedOrder(true);
	}]);


ccubeApp.config(['$routeProvider', '$httpProvider',
		function($routeProvider, $httpProvider) {
	
	$httpProvider.defaults.cache = false;
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
  
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
	
				$routeProvider
				
				.when('/job-applications', {	
					title: 'Job Application',
					templateUrl: 'angular-pages/job-applications.html',
					controller: 'adminJobApplicationCtrl'
					
				})
				
				.when('/', {	
					title: 'Login',
					templateUrl: 'angular-pages/login.html',
					controller: 'adminloCtrl'
				})
				.when('/dashboard', {
					title: 'Login',
					templateUrl: 'angular-pages/dashboard.html',
					controller: 'mainController'
			   })
				
				.when('/login', {
					title: 'Login',
					templateUrl: 'angular-pages/login.html',
					controller: 'adminloCtrl'
			   }).
			   when('/logout', {
				    title: 'Login',
					templateUrl: 'angular-pages/login.html',
					controller: 'logOutCtrl'
			   }).
				when('/companies', {
					title: 'Company List',
					templateUrl: 'angular-pages/companies.html',
					controller: 'companyListCtrl'
			   })/*.	
			   when('/company-jobs1', {
					title: 'Company List',
					templateUrl: 'angular-pages/companyjobs.html',
					controller: 'companyjobListCrtl'
			   }).	
			   when('/company-jobs1/:companyId/:jobUrl', {
					title: 'Company List',
					templateUrl: 'angular-pages/companyjobs.html',
					controller: 'companyjobListCrtl'
			   })*/.
			   when('/company-jobs', {
					title: 'Company List',
					templateUrl: '././common-files-v1.0/common-htmls/jobList-common.html',
					controller: 'jobListCommonCtrl'
			   }).	
			   when('/company-jobs/:companyId/:jobUrl', {
					title: 'Company List',
					templateUrl: '././common-files-v1.0/common-htmls/jobList-common.html',
					controller: 'jobListCommonCtrl'
			   }).
			   when('/view-company', {
					title: 'View Company',
					templateUrl: 'angular-pages/view-company.html',
					controller: 'viewCompanyCrtl'
			   }).	
				 when('/change-password', {
					    title: 'Change Password',
						templateUrl: 'angular-pages/change-password.html',
						controller: 'changePasswordCtrl',
						resolve: {
				            app: function($q, $rootScope, $location) {
				                var defer = $q.defer();
				                if ($rootScope.userName === null) {
				                    $location.path('/login');
				                };
				                defer.resolve();
				                return defer.promise;
				            }
				        }
				   }).
				   when('/configuration', {
					    title: 'Configuration',
						templateUrl: 'angular-pages/configuration.html',
						controller: 'configurationCtrl',
						resolve: {
				            app: function($q, $rootScope, $location) {
				                var defer = $q.defer();
				                if ($rootScope.userName === null) {
				                    $location.path('/login');
				                };
				                defer.resolve();
				                return defer.promise;
				            }
				        }
				   }).
				   when('/manage-user', {
					   title: 'Manage User',
					   	templateUrl: 'angular-pages/manage-user.html',
						controller: 'manageUserCtrl',
						resolve: {
				            app: function($q, $rootScope, $location) {
				                var defer = $q.defer();
				                if ($rootScope.userName === null) {
				                    $location.path('/login');
				                };
				                defer.resolve();
				                return defer.promise;
				            }
				        }
				   }).
				   when('/add-user', {
					   title: 'Add User',
					   	templateUrl: 'angular-pages/add-user.html',
						controller: 'createUserCtrl',
						resolve: {
				            app: function($q, $rootScope, $location) {
				                var defer = $q.defer();
				                if ($rootScope.userName === null) {
				                    $location.path('/login');
				                };
				                defer.resolve();
				                return defer.promise;
				            }
				        }
				   }).
				   when('/manageCustomquery', {
					   title: 'Add User',
					   	templateUrl: 'angular-pages/manageCustomquery.html',
						controller: 'adminManageQueryCtrl',
						resolve: {
				            app: function($q, $rootScope) {
				                var defer = $q.defer();
				                if ($rootScope.userName === null) {
				                    $location.path('/login');
				                };
				                defer.resolve();
				                return defer.promise;
				            }
				        }
				   }).
				   when('/scheduler-reports', {
					   title: 'Scheduling and Reports',
					   	templateUrl: 'angular-pages/scheduler-reports.html',
						controller: 'feedGeneratorCtrl',
						resolve: {
					    app: function($q, $rootScope) {
						var defer = $q.defer();
						if ($rootScope.userName === null) {
						    $location.path('/login');
						};
						defer.resolve();
						return defer.promise;
					    }
					}
					}).
				   when('/editUser', {
					   title: 'Edit User',
					   templateUrl: 'angular-pages/add-user.html',
					   controller: 'editUserCtrl',
					   resolve: {
				            app: function($q, $rootScope, $location) {
				                var defer = $q.defer();
				                if ($rootScope.userName === null) {
				                    $location.path('/login');
				                };
				                defer.resolve();
				                return defer.promise;
				            }
				        }
				   }).
				   when('/rbacConfiguration', {
					   title: 'Rbac Congiguration',
					   	templateUrl: 'angular-pages/rbacConfiguration.html',
						controller: 'rbacConfigurationCtrl',
						resolve: {
				            app: function($q, $rootScope) {
				                var defer = $q.defer();
				                if ($rootScope.userName === null) {
				                    $location.path('/login');
				                };
				                defer.resolve();
				                return defer.promise;
				            }
				        }
				   }).
				otherwise({
						redirectTo: '/'
				});
		
		}
]);

function getParameterByName(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
				results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

ccubeApp.controller('mainController', function($scope,localStorageService,services,$location,$rootScope) {
		// alert("h")
		pageName = "";
		$scope.dashboard =  null;
		var absUrl = window.location.href;
		$scope.zwayamUrl = "";
		
		
		$scope.userName = localStorage.getItem('userNameAdmin');
		$scope.welUserNameAdmin = localStorage.getItem('welUserNameAdmin');
		$scope.userPermissionForManageUser = localStorage.getItem('userPermissionForManageUser');
		$scope.currentUserSignedIn = false;
		$rootScope.selectedJobId = null;
		$rootScope.jobId = null;
		$rootScope.appStatus = null;
		 $rootScope.class1 = "push-class-no";
		 $rootScope.class2 = "push-class-no";
		 $rootScope.class3 = "push-class-no";
		 $rootScope.class4 = "push-class-no";
		 $rootScope.appFilter1 = null;
		 $rootScope.appFilter2 = null;
		 $rootScope.appFilter3 = null;
		 $rootScope.appFilter4 = null;
		 $rootScope.appFilter5 = null;
		 $rootScope.manageJobStatus = "MyJobs";
		 $rootScope.jobLimit = 5;
		 $rootScope.companyLimit = 5;
		var userId = localStorage.getItem('loginUserIdAdmin');
		$rootScope.jobApplicationWithResume = null;
	     $rootScope.jobApplicationWithoutResume = null;
	     $rootScope.AppliesFilterStatusValue = null;
		
		$scope.managecompanies = function() {
			$rootScope.currentPageNumber = 0;
			$location.path('/companies');
		}
		
		$scope.jobApplicationPage = function() {
			$rootScope.currentPageNumber = 0;
			$location.path('/job-applications');
		}
		$scope.managecustomquery = function() {
			$rootScope.currentPageNumber = 0;
			$location.path('/manageCustomquery');
		}
		
	
		
		$scope.applyJobOptions = {
	            chart: {
	                type: 'pieChart',
	                height: 300,
	                donut: true,
	                x: function(d){return d.key;},
	                y: function(d){return d.y;},
	                showLabels: false,
	                color:['#0A5776','#5491CA','#71D0F6'],

	                pie: {
	                    startAngle: function(d) { return d.startAngle/1 -Math.PI/1 },
	                    endAngle: function(d) { return d.endAngle/1 -Math.PI/1 }
	                },
	                transitionDuration: 500,
	                legend: {
	                    margin: {
	                        top: 5,
	                        right: 45,
	                        bottom: 5,
	                        left: 0
	                    }
	                }
	            }
	        };
		
		$scope.jobClosedSuspendOptions = {
	            chart: {
	                type: 'pieChart',
	                height: 300,
	                donut: true,
	                x: function(d){return d.key;},
	                y: function(d){return d.y;},
	                showLabels: false,
	                color:['#0A5776','#5491CA','#71D0F6'],

	                pie: {
	                    startAngle: function(d) { return d.startAngle/1 -Math.PI/1 },
	                    endAngle: function(d) { return d.endAngle/1 -Math.PI/1 }
	                },
	                transitionDuration: 500,
	                legend: {
	                    margin: {
	                        top: 5,
	                        right: 70,
	                        bottom: 5,
	                        left: 0
	                    }
	                }
	            }
	        };
		
		$scope.jobClosedSuspendStatusOptions = {
	            chart: {
	                type: 'pieChart',
	                height: 300,
	                donut: true,
	                x: function(d){return d.key;},
	                y: function(d){return d.y;},
	                showLabels: false,
	                color:['#0A5776','#5491CA','#71D0F6'],

	                pie: {
	                    startAngle: function(d) { return d.startAngle/1 -Math.PI/1 },
	                    endAngle: function(d) { return d.endAngle/1 -Math.PI/1 }
	                },
	                transitionDuration: 500,
	                legend: {
	                    margin: {
	                        top: 5,
	                        right: 110,
	                        bottom: 5,
	                        left: 0
	                    }
	                }
	            }
	        };
		
		
		$scope.jobStatusOptions = {
	            chart: {
	                type: 'pieChart',
	                height: 300,
	                donut: true,
	                x: function(d){return d.key;},
	                y: function(d){return d.y;},
	                showLabels: false,
	                color:['#0A3D66','#0A5776','#5491CA','#71D0F6','#4D7793'],

	                pie: {
	                    startAngle: function(d) { return d.startAngle/1 -Math.PI/1 },
	                    endAngle: function(d) { return d.endAngle/1 -Math.PI/1 }
	                },
	                transitionDuration: 500,
	                legend: {
	                    margin: {
	                        top: 5,
	                        right: 110,
	                        bottom: 5,
	                        left: 0
	                    }
	                }
	            }
	        };
		
		$scope.jobViewsOptions = {
			    chart: {
			        type: 'lineChart',
			        height: 270,
			        margin: {
			          top: 20,
			          right: 55,
			          bottom: 62,
			          left: 45
			        },
			        x: function(d) {
			          return new Date(d.date.year, d.date.month, d.date.day)
			        },
			        y: function(d) {
			          return d.value;
			        },
			        color:['#a4a3a3','#5491CA'],
			        transitionDuration: 250,
			        xAxis: {
			            axisLabel: 'Date',
			            tickFormat: function(d) {
			                return d3.time.format('%x')(new Date(d))
			            },
			            showMaxMin: true,
			            staggerLabels: true
			        },
			        yAxis: {
			            axisLabel: 'Numbers',
			            tickFormat: function(d) {
			              return d3.format(',f')(d)
			            },
			            axisLabelDistance:45
			        }
			       
			    }
			};

			
			$scope.jobSuspendedBulletOptions = {
		            chart: {
		                type: 'bulletChart',
		                transitionDuration: 500
		            }
		        };
			
				$scope.jobClosedBulletOptions = {
		            chart: {
		                type: 'bulletChart',
		                transitionDuration: 500
		            }
		        };
				
				$scope.jobSourceMixOptions = {
			            chart: {
			                type: 'multiBarChart',
			                height: 270,
			                stacked: true,
			                color:['#1D63A3','#AFADAE']
			            }
			        };
		                     
	     var jsonApplyJobChart = [];
	     var jsonJobStatusChart = [];
	     
	     var jsonClosedSuspendChart = [];
	     var jsonClosedSuspendStatusChart = [];
	    
	  if(userId != null){
		  
		  
		$scope.sessionId=localStorage.getItem('sessionId');
		$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
	    	
		services.getdashboardList(userId,$scope.sessionId,$scope.loginUserId).then(function(data){
	        $scope.dashboard = data.data;
	      
	        var jobLogList = $scope.dashboard.jobLogList;
	        var sourceMixList = $scope.dashboard.sourceMixList;
	        var data = [];
	        var sourceMixData = [];
	        
			for	(index = 0; index < jobLogList.length; index++) {
				var jobLog = jobLogList[index];
				// alert(JSON.stringify(jobLog));
				var jobLogDate = jobLog.logDate;
				var arrDate = jobLogDate.split('-');
				var year = arrDate[0];
				var month = arrDate[1];
				var day = arrDate[2];
				data.push({ 'noOfView': jobLog.noOfView, 'noOfApply': jobLog.noOfApply, 'date': { 'year': year, 'month': (month-1), 'day': day }});
			}
			
			if (jobLogList.length <= 0) {
  				$scope.lineGraph = "Empty";
  			}
			
  			$scope.jobViewsData = [
  			  { key: 'Views', 
  			    bar: true, 
  			    values: data.map(function(d){ 
  			      return { value: d.noOfView,  date: d.date }
  			    }) 
  			  },
  			  { key: 'Applies', 
  			    values: data.map(function(d){ 
  			      return { value: d.noOfApply, date: d.date }
  			    }) 
  			  }
  			];
  			
			if(sourceMixList.length <= 0){
  				
  				$scope.barGraph = "Empty";
  			}
  			
			var linkedInView = 0;
			var linkedInApply = 0;
			var indeedView = 0;
			var indeedApply = 0;
			var shineView = 0;
			var shineApply = 0;
			var facebookView = 0;
			var facebookApply = 0;
			var monsterView = 0;
			var monsterApply = 0;
			var twitterView = 0;
			var twitterApply = 0;
			var shareTwitterView = 0;
			var shareTwitterApply = 0;
			var naukriView = 0;
			var naukriApply = 0;
			var timesJobView = 0;
			var timesJobApply = 0;
			var facebookTabView = 0;
			var facebookTabApply = 0;
			var linkedinShareView = 0;
			var linkedinShareApply = 0;
			var googlePlusView = 0
			var googlePlusApply = 0;
			var otherView = 0;
			var otherApply = 0;
			
  			for	(index = 0; index < sourceMixList.length; index++) {
				var sourceMix = sourceMixList[index];
				
				linkedInView = sourceMix.linkedInView;
				linkedInApply = sourceMix.linkedInApply;
				indeedView = sourceMix.indeedView;
				indeedApply = sourceMix.indeedApply;
				shineView =  sourceMix.shineView;
				shineApply = sourceMix.shineApply;
				facebookView = sourceMix.facebookView;
				facebookApply = sourceMix.facebookApply;
				monsterView = sourceMix.monsterView;
				monsterApply = sourceMix.monsterApply;
				twitterView = sourceMix.twitterView;
				twitterApply = sourceMix.twitterApply;
				shareTwitterView = sourceMix.shareTwitterView;
				shareTwitterApply = sourceMix.shareTwitterApply;
				naukriView = sourceMix.naukriView;
				naukriApply = sourceMix.naukriApply;
				timesJobView = sourceMix.timesJobView;
				timesJobApply = sourceMix.timesJobApply;
				facebookTabView = sourceMix.facebookTabView;
				facebookTabApply = sourceMix.facebookTabApply;
				linkedinShareView = sourceMix.linkedInShareView;
				linkedinShareApply = sourceMix.linkedInShareApply;
				googlePlusView = sourceMix.googlePlusView;
				googlePlusApply = sourceMix.googlePlusApply;
				otherView = sourceMix.otherView;
			    otherApply = sourceMix.otherApply;
	
			}

  			$scope.jobSourceMixData = [{
  			    "values" : [{
  			        "y" : linkedInApply,
  			        "x" : "LinkedIn"
  			    }, {
  			        "y" : indeedApply,
  			        "x" : "Indeed"
  			    }, {
  			        "y" : shineApply,
  			        "x" : "Shine"
  			    }, {
  			        "y" : facebookTabApply,
  			        "x" : "Facebook Tab"
  			    }, {
  			        "y" : facebookApply,
  			        "x" : "Facebook Share"
  			    }, {
  			        "y" : twitterApply,
  			        "x" : "Twitter"
  			    },{
  			        "y" : shareTwitterApply,
  			        "x" : "TwitterShare"
  			    }, {
  			        "y" : linkedinShareApply,
  			        "x" : "Linkedin Share"
  			    }, {
  			        "y" : googlePlusApply,
  			        "x" : "Google+"
  			    }, {
  			        "y" : otherApply,
  			        "x" : "Career Site"
  			    } ],
  			    "key" : "Applies"
  			}, {
  			    "values" : [{
  			        "y" : linkedInView,
  			        "x" : "LinkedIn"
  			    }, {
  			        "y" : indeedView,
  			        "x" : "Indeed"
  			    }, {
  			        "y" : shineView,
  			        "x" : "Shine"
  			    }, {
  			        "y" : facebookTabView,
  			        "x" : "Facebook Tab"
  			    }, {
  			        "y" : facebookView,
  			        "x" : "Facebook Share"
  			    }, {
  			        "y" : twitterView,
  			        "x" : "Twitter"
  			    },{
  			        "y" : shareTwitterView,
  			        "x" : "TwitterShare"
  			    }, {
  			        "y" : linkedinShareView,
  			        "x" : "Linkedin Share"
  			    }, {
  			        "y" : googlePlusView,
  			        "x" : "Google+"
  			    }, {
  			        "y" : otherView,
  			        "x" : "Career Site"
  			    }],
  			    "key" : "Views"
  			}];
  			
  			if($scope.dashboard.shortlists > 0 || $scope.dashboard.rejects > 0 || $scope.dashboard.pendings > 0){
	      			
  				jsonApplyJobChart.push({ 'key': 'Shortlist','y':$scope.dashboard.shortlists});
  				jsonApplyJobChart.push({ 'key': 'Rejects','y':$scope.dashboard.rejects});
  				jsonApplyJobChart.push({ 'key': 'Pending','y':$scope.dashboard.pendings});
  				$scope.applyJobData =  jsonApplyJobChart;
  			} else {
  				 $scope.applyJobData = [];
  			}
	        
  			if($scope.dashboard.newStatusNoViews > 0 || $scope.dashboard.newStatusNoApplies > 0 || $scope.dashboard.newStatusNoShortlist > 0 || $scope.dashboard.newStatusAppliesPending > 0 || $scope.dashboard.newStatusShortlists > 0){
  				
// jsonJobStatusChart.push({ 'key': 'Filled','y':$scope.dashboard.filled});
// jsonJobStatusChart.push({ 'key': 'Vacant','y':$scope.dashboard.vancant});
  				
  				jsonJobStatusChart.push({ 'key': 'No Views','y':$scope.dashboard.newStatusNoViews});
  				jsonJobStatusChart.push({ 'key': 'No Applies','y':$scope.dashboard.newStatusNoApplies});
  				jsonJobStatusChart.push({ 'key': 'No Shortlists','y':$scope.dashboard.newStatusNoShortlist});
  				jsonJobStatusChart.push({ 'key': 'Applies Pending','y':$scope.dashboard.newStatusAppliesPending});
  				jsonJobStatusChart.push({ 'key': 'Shortlists','y':$scope.dashboard.newStatusShortlists});
  				
  				$scope.jobStatusData =  jsonJobStatusChart;
	        
  			} else {
  				$scope.jobStatusData = [];
  			}
	        
  			if($scope.dashboard.closedShortlists > 0 || $scope.dashboard.closedRejects > 0 || $scope.dashboard.closedPendings > 0){
  				
  				jsonClosedSuspendChart.push({ 'key': 'Shortlist','y':$scope.dashboard.closedShortlists});
  				jsonClosedSuspendChart.push({ 'key': 'Rejects','y':$scope.dashboard.closedRejects});
  				jsonClosedSuspendChart.push({ 'key': 'Pending','y':$scope.dashboard.closedPendings});
  				$scope.jobClosedSuspendData =  jsonClosedSuspendChart;
  				
  			} else {
  				$scope.jobClosedSuspendData = [];
  			}
  			
  			if($scope.dashboard.closedFilled > 0 || $scope.dashboard.closedVancant > 0){
	        
  				jsonClosedSuspendStatusChart.push({ 'key': 'Filled','y':$scope.dashboard.closedFilled});
  				jsonClosedSuspendStatusChart.push({ 'key': 'Vacant','y':$scope.dashboard.closedVancant});
  				$scope.jobClosedSuspendStatusData =  jsonClosedSuspendStatusChart;
	        
  			} else {
  				$scope.jobClosedSuspendStatusData = [];
  			}
	        
	        var maxRange = $scope.dashboard.suspended + $scope.dashboard.closed;
	        $scope.jobSuspendedBulletData = {
		            "title": $scope.dashboard.suspended + " Hidden",
		            "subtitle": "",
		            "ranges": [maxRange],
		            "measures": [$scope.dashboard.suspended]
		        }
		        
		        $scope.jobClosedBulletData = {
			            "title": $scope.dashboard.closed + " Closed",
			            "subtitle": "",
			            "ranges": [maxRange],
			            "measures": [$scope.dashboard.closed]
			    }
			
	        // alert (JSON.stringify($scope.dashboard));
	    });
}
	  $scope.sort = {
	            active: '',
	            descending: undefined
	        }  
	  $scope.changeSorting = function(column) {
          var sort = $scope.sort;

          if (sort.active == column) {
              sort.descending = !sort.descending;
				
          } else {
              sort.active = column;
              sort.descending = false;
          }
      };
		$scope.sessionId=localStorage.getItem('sessionId');
		$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
	  services.getAdminLoginHistory($scope.sessionId,$scope.loginUserId).then(function(data){
		 	 
		  	  $scope.user = data.data;
	  });
	  
		$scope.downloadReport=function(){
			$scope.reportName="superUserReport";
			 $scope.sessionId=localStorage.getItem('sessionId');
		     $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
		    /* $activityIndicator.startAnimating();*/
			  services.downloadExcelReport($scope.reportName,$scope.sessionId,$scope.loginUserId).then(function(data){
				  /*$activityIndicator.stopAnimating();*/
				if(data.status == 200){
					var companyExcelFile = data.data.result.message;
					var ex = companyExcelFile.split('.').pop();
					var today = new Date();
				    var dd = today.getDate();
				    var mm = today.getMonth()+1;

				    var yyyy = today.getFullYear();
				    if(dd<10){
				        dd='0'+dd
				    } 
				    if(mm<10){
				        mm='0'+mm
				    } 
				    var today = dd+'-'+mm+'-'+yyyy;
					
					$scope.currentDate = today

					$scope.reportsTempFolderPath = REPORTSTEMPFOLDERPATH;
					
					$scope.$apply();
					
					$scope.reportName="0_superUserReport";
					
					if(companyExcelFile != null && companyExcelFile != "" ){
						downloadURI($scope.reportsTempFolderPath+"csvreport/"+companyExcelFile,$scope.reportName+"_"+$scope.currentDate+"."+ex);
						//$activityIndicator.stopAnimating();
						growl.success(" Report downloaded successfully");
						//$('#myModalForReport').modal('hide');
						
					} else {
						//$('#myModalForReport').modal('hide');
						growl.error("Something went wrong");
					}

		    } else {
		    		//$('#myModalForReport').modal('hide');
		        	growl.error("Something went wrong");
		    }
				
				 function downloadURI(uri, fileName) {
						if(!(uri.indexOf("http") > -1)){
							uri = window.location.protocol+"//"+ uri;
						}
						
					  var link = document.createElement('a');
					  link.href = uri;
					  link.download = fileName;
					  document.body.appendChild(link);
					  link.click();
				  
				  }		
				
			});
		     
		}
		
		$scope.map = {
			center: {
				latitude: 45,
				longitude: -73
			},
			zoom: 8};

		$scope.map2 = {
			center: {
				latitude: 25,
				longitude: -33
			},
			zoom: 4};

		$scope.search_query = getParameterByName('query');

}).directive('search', function() {
return {
		restrict: 'A',
		link: function(scope, elm, attrs) {

			scope.keyword = scope.search_query;

			// Search action url
			scope.url = 'search.php';

			// Search result template
			scope.search_template = {name: 'search-result', url: 'angular-pages/search-result.html'};

				// Demo Result Data
				scope.result = [
				{
					Driver: {
						fname: 'John',
						lname: 'Doe',
					},
					points:322,
					country:'England'
				},
				{
					Driver: {
						fname: 'Jane',
						lname: 'Doe',
					},
					points:212,
					country:'England'
				},
				];

				/*
				 * $data = file_get_contents("php://input"); $objData =
				 * json_decode($data); // perform query or whatever you wish,
				 * sample: $query = 'SELECT * FROM tbl_content WHERE title="'.
				 * $objData->data .'"'; // Static array for this demo $values =
				 * array('php', 'web', 'angularjs', 'js'); // Check if the
				 * keywords are in our array if(in_array($objData->data,
				 * $values)) { echo 'I have found what you\'re looking for!'; }
				 * else { echo 'Sorry, no match!'; }
				 */

				// Create the http post request
				// the data holds the keywords
				// The request is a JSON request.
				/*
				 * $http.post($scope.url, { "data" : $scope.keywords}).
				 * success(function(data, status) { $scope.status = status;
				 * $scope.data = data; $scope.result = 'demo'; // Show result
				 * from server in our <pre></pre> element });
				 */

		}
	};
}).directive('verticalTabs', function() {
		return {
				restrict: 'A',
				link: function(scope, elm, attrs) {
						var jqueryElm = jQuery(elm[0]);
            			jQuery(jqueryElm).tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
						jQuery(jqueryElm).removeClass("ui-corner-top").addClass("ui-corner-left");
				}
		};
}).directive('collapsibleAccordion', function() {
		return {
				restrict: 'A',
				link: function(scope, elm, attrs) {
						var jqueryElm = $(elm[0]);
						$(jqueryElm).accordion({
								collapsible: true
						});
				}
		};
}).directive('animatedButton', function() {
		return {
				restrict: 'A',
				link: function(scope, elm, attrs) {
						var jqueryElm = $(elm[0]);
						$(jqueryElm).on('click', function() {
								var button_effect = $(this).attr('data-effect');
								$(this).removeClass(button_effect).addClass(button_effect + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
										$(this).removeClass(button_effect);
										$(this).removeClass('animated');
								});
						});
				}
		};
}).directive('charts', function() {
	return {
		restrict: 'A',
		link: function(scope, elm, attrs) {
			charts.revenue_chart.init();
		}
	};
}).directive('calendar', function() {
	return {
		restrict: 'A',
		link: function(scope, elm, attrs) {
			$('.calendar-widget').datepicker();
		}
	};
}).directive('vectorMap', function() {
		return {
				restrict: 'A',
				link: function(scope, elm, attrs) {
						var jqueryElm = $(elm[0]);

						$('.australia-map').vectorMap({
								map: 'au_mill_en',
								backgroundColor: 'transparent',
								regionStyle: {
										initial: {
												fill: '#dc6ea5'
										},
										hover: {
												"fill-opacity": 0.8
										}
								}
						});

						$('.austria-map').vectorMap({
								map: 'at_mill_en',
								backgroundColor: 'transparent',
								regionStyle: {
										initial: {
												fill: '#47bac1'
										},
										hover: {
												"fill-opacity": 0.8
										}
								}
						});

						$('.germany-map').vectorMap({
								map: 'de_mill_en',
								backgroundColor: 'transparent',
								regionStyle: {
										initial: {
												fill: '#343f51'
										},
										hover: {
												"fill-opacity": 0.8
										}
								}
						});

						$('.world-map').vectorMap({
								map: 'world_mill_en',
								backgroundColor: 'transparent',
								regionStyle: {
										initial: {
												fill: '#2f3949'
										},
										hover: {
												"fill-opacity": 0.8
										}
								}
						});

				}
		};
}).directive('modals', function() {
		return {
				restrict: 'A',
				link: function(scope, elm, attrs) {
						var jqueryElm = $(elm[0]);

						/** * ToolTips ** */
						if ($('[data-toggle="tooltip"]').length) {
								$('[data-toggle="tooltip"]').each(function(i, item) {
										var dataplace = $(item).data('placement');
										$(item).tooltip({
												placement: dataplace
										});
								});
						}

						/** * PopOvers ** */
						if ($('[data-toggle="popover"]').length) {
								$('[data-toggle="popover"]').each(function(i, item) {
										$(item).popover();
								});
						}
				}
		};
}).directive('forms', function(){
	return {
		restrict: 'A',
				link: function(scope, elm, attrs) {
						var jqueryElm = $(elm[0]);

						if($("input.icheck-blue").length) {
		$(".icheck-blue").iCheck({
			checkboxClass: 'icheckbox_flat-blue',
			radioClass: 'iradio_flat-blue'
		});
					}
				}
	}
}).directive('showtab',
	    function () {
    return {
        link: function (scope, element, attrs) {
            element.click(function(e) {
                e.preventDefault();
                $(element).tab('show');
            });
        }
    };
}).directive('documentSwitchOff', [
'$parse',
'$timeout',
function ($parse,$timeout) {
    return function (scope, element, attrs) {
        var getter = $parse(attrs.documentSwitchOff);
        var setter = getter.assign;
        var clickInsideElement = false;
        function elementClickHandler(){
            clickInsideElement = true;
        }
        function documentClickHandler(){
            if(!clickInsideElement){
                scope.$apply(function(){
                    setter(scope,false);
                });
            }
            clickInsideElement = false;
        }
        var bound = false;
        scope.$watch(attrs.documentSwitchOff,function(newVal){
            if(angular.isDefined(newVal)){
                if(newVal){
                    $timeout(function(){
                        bound = true;
                        element.bind("click",elementClickHandler);
                        var doc = angular.element(document)
                            doc.bind('click',documentClickHandler);
                    },0);
                }
                else{
                    if(bound){
                        element.unbind("click",elementClickHandler);
                        angular.element(document).unbind('click',documentClickHandler);
                        bound = false;
                    }

                }
            }
        });

        scope.$on("$destroy",function(){
            if(bound){
                element.unbind("click",elementClickHandler);
                angular.element(document).unbind('click',documentClickHandler);
                bound = false;
            }
        });
    }
}
]);


ccubeApp.controller("MenuCtrl", function($scope, $rootScope, $location) {
	

	$(".icon-color-custom").click(function(){
		if(pageName != "companyList"){
			
			$rootScope.company = null;	
		}
		
    });
	
	var path = "/dashboard";
	
	$rootScope.getClass = function(path) {
	    if ($location.path().substr(0, path.length) == path) {
	      return "active"
	    } else {
	      return ""
	    }
	};
	
	$scope.managecompanies = function() {
		$rootScope.currentPageNumber = 0;
		$location.path('/companies');
	}
	$scope.managecustomquery = function() {
		$rootScope.currentpageNumber = 0;
		$location.path('/manageCustomquery');
	}
	
	$scope.jobApplicationPage = function() {
		$rootScope.currentPageNumber = 0;
		$location.path('/job-applications');
	}
	
	$scope.go = function() {
		
		$rootScope.myClass = "";
	
	$rootScope.getClass = function(path) {
	    if ($location.path().substr(0, path.length) == path) {
	    	$rootScope.myClass = "active";
	      return "active"
	    } else {
	      return ""
	      $rootScope.myClass = "";
	    }
	};
	};
	
	});


angular.module('ngToggle', [])
    .controller('AppCtrl',['$scope', function($scope,localStorageService){
    	var IssuperUser = localStorage.getItem('IssuperUsers');
    	$scope.IssuperUser=IssuperUser;
        $scope.custom = true;
        $scope.toggleCustom = function() {
            $scope.custom = $scope.custom === false ? true: false;
        };
}]);

ccubeApp.controller('companyListCtrl', function ($scope,ngDialog,$filter,services,localStorageService,$location,growl,$window,$rootScope,Pagination,PAGESIZE,prompt,$activityIndicator,$q,$http,$sce) {
	$(".container").click(function(event) {
		companyListPaaageYaxisOffeset = event.pageY;
	});
	
	$scope.today = new Date();
	 $scope.logo ="images/loading-logo.png";
	var userName = localStorage.getItem('userNameAdmin');
	var userId = localStorage.getItem('loginUserIdAdmin');
	var welUserName = localStorage.getItem('welUserNameAdmin');
	var userPermissionForManageUser = localStorage.getItem('userPermissionForManageUser');
	var alreadyLoadedListSize = 0;
	var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
	
	$rootScope.filterStatusValue = '1';
	$scope.isCustomJob = false;
	$( "#changeSubscription" ).prop( "disabled", false )
	$rootScope.jobApplicationWithResume = null;
     $rootScope.jobApplicationWithoutResume = null;
     $rootScope.AppliesFilterStatusValue = null;
	
	
	
	
	// Disable weekend selection
  /*  $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };*/
	$scope.date= new Date();
    $scope.format="dd/MM/yyyy";
  $scope.dates = [{date:'01-05-2001'}, {date:'05-05-2014'}, {date:'10-11-2008'}]
    $scope.open = function($event) {
	  $scope.selectedDate = null;
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };
	
	 

    $scope.dateOptions = {
      formatYear: 'yyyy',
      startingDay: 1,
      showWeeks:'false'
    };
   
    $scope.dotCheck="true";
    $scope.checkDotValidation=function(){
		 if($scope.CompanyData.website.contains("."))
			 {
			 $scope.dotCheck="true";
			 }else{
				 $scope.dotCheck="false";
			 }
		
	 }
	
	pageName = "companyList";
	
	if(!$rootScope.company){
	 	$rootScope.company = null;
	 
		}
	if($rootScope.company){
		alreadyLoadedListSize = $rootScope.company;
    }
	
	$rootScope.selectedJobId = null;
	$scope.searchText ="";
	$rootScope.jobId = null;
	 $scope.isJobEmpty = false;
	 $rootScope.manageJobStatus = "MyJobs";
	 $scope.activeClassCompanies = $rootScope.myClass;
	 $rootScope.adminjobLimit =5;
	 var limitStep = 5;
	 $scope.required="";
	 $scope.filtercheck="";
	 $scope.userPermissionForDecomissionDeleteCompany= localStorage.getItem('userPermissionForDecomissionDeleteCompany');
	 $scope.userPermissionToManageForAdmin= localStorage.getItem('userPermissionToManageForAdmin');
	 $scope.loggedInAdmin=userId;
	 $scope.sessionId=localStorage.getItem('sessionId');
	 $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
	 
	 services.getcompanyNameList($scope.sessionId, $scope.loginUserId).then(function(data){
		 
		
		 
		 if (data.data.length == 1){
			 $activityIndicator.stopAnimating();
			 $scope.optionsObject=data.data[0];
			 if($scope.optionsObject.webserviceAPIResponseCode == UNAUTHORIZED){
				 var options=null;
			 growl.error(UNAUTHORIZED_ERROR_MSG);
			 $('#logout').click();
			 return;
			 }
		 }
		 
		 var options = data.data;
		 
		 $scope.dirty = {};

		  function suggest_companyName(term) {

		    var q = term.toLowerCase().trim();
		    var results = [];

		    // Find first 10 states that start with `term`.
		    for (var i = 0; i < options.length && results.length < 10; i++) {
		      var company = options[i];
		      // alert(JSON.stringify(company.companyName));
		      // alert(companyName);
		      if (company.companyName.toLowerCase().indexOf(q) === 0)
		        results.push({ label: company.companyName, value: company.companyName });
		    }

		    return results;
		  }

		  $scope.autocomplete_company_options = {
                  suggest: suggest_companyName,
                  on_select: function (selected) {
                          $scope.searchCompany();
                    }
                };

	 });
	 
	 
	 $scope.validTillNewDate = function(selectedDate){
		 $rootScope.selectedDate = selectedDate;
		 $scope.paymentDetails($rootScope.data,$rootScope.planName,$rootScope.selectedpackage);
	 }
	 
	 $scope.packageSelected = false;
	 
	    $scope.paymentDetails =function(data,packageName,selPackage){
			$scope.joblimitLessThanfifty =null;
		 
		 $scope.isCustomJob = true;
		 $scope.noOfCustomJobs = null;
		 $scope.curreny = null;
		 $scope.formattedpackagecostremainingcurreny = null;
		 $scope.formattedannualCost = null;
		 $scope.formattedpackagecostremaining = null;
		 $scope.formattedpayableAmount = null;
		 $scope.formattedserviceTaxx = null;
		 $scope.formattedgradTotal = null;
		 $scope.extendingDays = null;
			
			
			//$scope.billingCountry =  localStorage.getItem('billingCountry');
			 $scope.annualCostForCustomJobs =  localStorage.getItem('packageAmountForCustomJobs');
		     $scope.validFromNew = localStorage.getItem('packagevalidFrom');
		     $rootScope.data = data;
             $scope.selectedDate = $rootScope.selectedDate;
	    	 $rootScope.planName = packageName;
			 $rootScope.annualCost = data.annualCost;
			 $rootScope.selectedpackage = selPackage;
			 $scope.year=selPackage;
			 $rootScope.noOfdays=data.renewalFrequenyInDays;
			 localStorage.setItem('selectedpackage', selPackage);
			 localStorage.setItem('planName', data.packageName);
			 localStorage.setItem('annualCost', data.annualCost);
			 $rootScope.servicetax=$rootScope.servicetax;
			 var calculatefrom =null;
			 $scope.packageSelected = true;
			 $scope.vare=1;
			 $scope.extendingDays = null;
	    	
	    	
	    	
	    	if($scope.companyDetail.billingCountry ==null || $scope.companyDetail.billingCountry =="null"||
					$scope.companyDetail.billingCountry =="IN"){
				$scope.curreny="INR";
				$scope.formattedpackagecostremainingcurreny = "INR";
			}else{	
				$scope.curreny="$";
				$scope.formattedpackagecostremainingcurreny = "$";
			}
			
			if(selPackage == 11){
				$scope.curreny=null;
			}
	    	//alert("$scope.curreny-->"+$scope.curreny);
	    	  $scope.planName =$rootScope.planName;
	    	  $scope.annualCost =$rootScope.annualCost;
	    	 if((($scope.validTill !=null && $scope.validTill !="null") || $scope.selectedDate !=null && $scope.selectedDate !="null") && $scope.validFrom !=null  && 
	    			 $scope.validFrom !="null"){
	    		// alert("$scope.validTill !=null && $scope.validFrom !=null && $scope.validTill .selectedpackage !=11");
	    		 var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	    		 if($scope.selectedDate != null && $scope.selectedDate != undefined){
					 var validTill = $scope.validTill;
	    		 var validFrom = new Date(parseInt($scope.validFromNew));
					 
				 }else{
				 var validTill = new Date(parseInt($scope.validTill));
	    		 var validFrom = new Date(parseInt($scope.validFromNew));
				 }
				 var today = new Date();
	    		 var myDateNextyear = new Date();
	    		 myDateNextyear.setFullYear(validFrom.getFullYear() + 1);
				 if(typeof $scope.selectedDate !=undefined && $scope.selectedDate !=null){
				 //var selectedDate = new Date(parseInt($scope.selectedDate));
				 var calculatefromdate = $scope.selectedDate;
				 calculatefrom = calculatefromdate.getTime();
				 
				 }else{
					 calculatefrom =today.getTime();
					 var calculatefromdate = today;
				 }
	    		 if(calculatefromdate > validFrom){
	    		  diffDays = Math.round(Math.abs((validFrom.getTime() - calculatefrom)/(oneDay))-1);
				  if(diffDays < 0){
					  
	    			diffDays=0;
	    		}
	    		     
	    		 
	    			 $scope.noOfdays =$rootScope.noOfdays;
					 
	    	     if(validTill > myDateNextyear){
					 
					 if($scope.companyDetail.masterPackages.id == 11){
					 $scope.packagecostremaining= parseInt($scope.annualCostForCustomJobs)-Math.round((parseInt($scope.annualCostForCustomJobs)/parseInt($scope.noOfdays))*parseInt(diffDays));

					 }else{
	    	    	 $scope.packagecostremaining= parseInt($scope.companyDetail.masterPackages.annualCost)-Math.round((parseInt($scope.companyDetail.masterPackages.annualCost)/parseInt($scope.noOfdays))*parseInt(diffDays));
					 }
					 diffDaysto = Math.round(Math.abs((validTill.getTime() - myDateNextyear.getTime())/(oneDay)));
	    	    	
	    	    	  diifamountPerday = Math.round((parseInt($scope.companyDetail.masterPackages.annualCost)/parseInt($scope.noOfdays)));
	    	    	// alert("diifamountPerday---->"+diifamountPerday);
	    	    	 $scope.packagecostremaining = $scope.packagecostremaining+(diifamountPerday * diffDaysto );
	    	    	 //alert("final packagecostremaining----> "+ $scope.packagecostremaining);
	    	     } else{
					 if($scope.companyDetail.masterPackages.id == 11){
					$scope.packagecostremaining= parseInt($scope.annualCostForCustomJobs)-Math.round((parseInt($scope.annualCostForCustomJobs)/parseInt($scope.noOfdays))*parseInt(diffDays));
					 }else{
	    	    	 $scope.packagecostremaining= parseInt($scope.companyDetail.masterPackages.annualCost)-Math.round((parseInt($scope.companyDetail.masterPackages.annualCost)/parseInt($scope.noOfdays))*parseInt(diffDays));
					 }
				 }	 
				 
	    		}
	    		
	    	}
	    
	    	if($scope.packagecostremaining > 0 && typeof $scope.packagecostremaining !="undefined" && $scope.packagecostremaining !=null && 
	    			$scope.packagecostremaining !="null" && $rootScope.selectedpackage !=11){
	    	
	    		$scope.payableAmount = parseInt($scope.annualCost)- parseInt($scope.packagecostremaining);
	    		$scope.amountForServicetax = $scope.payableAmount;
	    	
	    		if(parseInt($scope.payableAmount) < 0 && $scope.payableAmount !=null && $scope.payableAmount !="null"){
	    			$scope.payableAmounts = $scope.payableAmount.toString().replace(/-/g,"");
	    			var perday= Math.round(parseInt($scope.annualCost)/ parseInt($scope.noOfdays));
	    		    extendingDays =Math.round(parseInt($scope.payableAmounts)/parseInt(perday));
	    		   
	    			localStorage.setItem('extendingDays', extendingDays);
	    			$scope.extendingDays=extendingDays;
	    			$scope.payableAmount=0;
	    			$scope.gradTotal=0;
	    			$scope.serviceTaxx=0;
	    			$scope.vare=0;
	    		}
	    	}else{
	    		$scope.amountForServicetax = $scope.annualCost;
	    	}
	    	
		if($scope.vare !=0 && $rootScope.selectedpackage !=11 && (parseInt($scope.payableAmount) > 0 || typeof $scope.payableAmount =="undefined" || $rootScope.selectedpackage != 1  )){
		var result = Math.round((parseInt(localStorage.getItem('servicetax')) / 100) * $scope.amountForServicetax);
		if($scope.companyDetail.billingCountry ==null || $scope.companyDetail.billingCountry =="null"||
				$scope.companyDetail.billingCountry =="IN"){
			$scope.serviceTaxx = result;
			$scope.curreny="INR";
		}else{
			$scope.serviceTaxx = 0;
			$scope.curreny="$";
		}
		
		if($rootScope.billingCountry != null){
		if($rootScope.billingCountry == "IN"){
			$scope.serviceTaxx = result;
			$scope.curreny="INR";
		}else{
			$scope.serviceTaxx = 0;
			$scope.curreny="$";
		}
		}
		
		//calculating grand total
		$scope.gradTotal=parseInt($scope.amountForServicetax) + parseInt($scope.serviceTaxx);
			
	   }
		// to show in indian currency format   
		//if($scope.packagecostremaining && $rootScope.selectedpackage !=3){
		if($scope.payableAmount && $rootScope.selectedpackage !=11){
			$scope.payableAmount=$scope.payableAmount.toString();
		    var payableAmount = $scope.payableAmount.substring($scope.payableAmount.length-3);
			var payableAmountNumbers = $scope.payableAmount.substring(0,$scope.payableAmount.length-3);
			if(payableAmountNumbers != ''){
			payableAmount = ',' + payableAmount;}
			$scope.formattedpayableAmount = payableAmountNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + payableAmount;
			}
		//}
		if($scope.packagecostremaining && $rootScope.selectedpackage !=1){
			$scope.packagecostremaining=$scope.packagecostremaining.toString();
		    var packagecostremaining = $scope.packagecostremaining.substring($scope.packagecostremaining.length-3);
			var packagecostremainingNumbers = $scope.packagecostremaining.substring(0,$scope.packagecostremaining.length-3);
			if(packagecostremainingNumbers != ''){
		    packagecostremaining = ',' + packagecostremaining;}
			$scope.formattedpackagecostremaining = packagecostremainingNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + packagecostremaining;
			if(parseInt($scope.formattedpackagecostremaining) < 0){
				$scope.formattedpackagecostremaining = null;
			}
			}
			
		if($rootScope.selectedpackage !=11){
			//$scope.gradTotal=$scope.gradTotal.toString();
			//var gradTotal = $scope.gradTotal.substring($scope.gradTotal.length-3);
		   // var gradTotalNumbers = $scope.gradTotal.substring(0,$scope.gradTotal.length-3);
		    //if(gradTotalNumbers != ''){
		  //  gradTotal = ',' + gradTotal;}
		    $scope.formattedgradTotal = $scope.gradTotal;
		    var annualCost = $scope.annualCost.substring($scope.annualCost.length-3);
			var annualCostNumbers = $scope.annualCost.substring(0,$scope.annualCost.length-3);
			
		if(annualCostNumbers != ''){
			annualCost = ',' + annualCost;
			}
			$scope.formattedannualCost = annualCostNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + annualCost;
			$scope.serviceTaxx=$scope.serviceTaxx.toString();
			var serviceTaxx = $scope.serviceTaxx.substring($scope.serviceTaxx.length-3);
			var serviceTaxNumbers = $scope.serviceTaxx.substring(0,$scope.serviceTaxx.length-3);
			if(serviceTaxNumbers != ''){
			serviceTaxx = ',' + serviceTaxx;}
			$scope.formattedserviceTaxx = serviceTaxNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + serviceTaxx;
			}
		
		 $rootScope.gradTotal=$scope.gradTotal;
		 $rootScope.serviceTaxx=$scope.serviceTaxx;
		 $rootScope.annualCost=$scope.annualCost;
		 
		 if($scope.formattedpackagecostremaining != null){
			if($scope.billingCountry == "IN"){
				$scope.formattedpackagecostremainingcurreny = "INR";
			}else{
				$scope.formattedpackagecostremainingcurreny =  "$";
			}
		}
	    
	 }
	 
	 $scope.loadPackagesOnContryChange = function(billingCountry){
		 
		 $scope.noOfCustomJobs = null;
		 $scope.curreny = null;
		$scope.formattedpackagecostremainingcurreny = null;
		 $scope.formattedannualCost = null;
		 $scope.formattedpackagecostremaining = null;
		 $scope.formattedpayableAmount = null;
		 $scope.formattedserviceTaxx = null;
		 $scope.formattedgradTotal = null;
		 $scope.extendingDays = null;
		 $scope.companyId = $rootScope.companyId;
		 $scope.currencyType = billingCountry;
		 $rootScope.billingCountry = billingCountry;
		 $scope.sessionId=localStorage.getItem('sessionId');
		 $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
		 services.getallPackagesOnContryChange($scope.companyId,$scope.sessionId,$scope.loginUserId,$scope.currencyType).then(function(data){
			 $scope.masterPackageList=data.data.masterPackages;
	 });
	 }
	 
	 
	 $scope.loadpackageDetails = function(companyId,billingCountry) {
		 $scope.sessionId=localStorage.getItem('sessionId');
		 $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
		 $scope.companyId = companyId;
			services.getallPackages(companyId,$scope.sessionId,$scope.loginUserId).then(function(data){
		 	
				 $scope.masterPackageList=data.data.masterPackages;

				 
				 $scope.getActivePackageDetails=data.data.packageRenewalHistoryobj;
				
				 $scope.companyDetail=data.data.company;
				 
				 $scope.serviceTax=data.data.configurationSystem;
				 $rootScope.servicetax=$scope.serviceTax.configurationValue;
				 $scope.usdRate=data.data.configurationSystemUsd;
				 localStorage.setItem('servicetax', $rootScope.servicetax);
				
				 $scope.servicetaxForDisp=$scope.serviceTax.configurationValue;
				 //$scope.billUserPhoneDetail= $scope.companyDetail.billingCompanyPhone;
				// if($scope.billUserPhoneDetail ==null || $scope.billUserPhoneDetail =="null"){
					// $scope.billUserPhoneDetail="-";
				// }
				  		 
				 if($scope.getActivePackageDetails !=null && $scope.getActivePackageDetails !="null" 
				     && $scope.getActivePackageDetails.packageId !=1){
	        	$scope.validTill=$scope.getActivePackageDetails.validTo;
				$scope.validFrom=$scope.getActivePackageDetails.validFrom;
				
	        }else{
	        	var today = new Date();
	        	$scope.validFrom = today;
	        }
				
				});
			 }
			 
			 
			  
	 $scope.getDetailsOfSubscription = function(companyId){
		 
		 $rootScope.billingCountry = null;
		 $scope.companyName = null;
		 $scope.isCustomJob = false;
		 $scope.datepicker = null;
		 $scope.validFrom = null;
		 $scope.noOfCustomJobs = null;
		 $scope.curreny = null;
		 $scope.formattedannualCost = null;
		 $scope.formattedpackagecostremaining = null;
		 $scope.formattedpayableAmount = null;
		 $scope.formattedserviceTaxx = null;
		 $scope.formattedgradTotal = null;
		 $scope.extendingDays = null;
		 $( "#changeSubscription" ).prop( "disabled", false );
				  
			$scope.companyId = companyId;
			$scope.sessionId=localStorage.getItem('sessionId');
			$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
		
		 services.getsubscriptionDetails($scope.companyId,$scope.sessionId,$scope.loginUserId).then(function(data){
			 $scope.clientInvoice='unChecked';
			 $http.get("js/countries.json")
			    .then(function(response) {
			    	$scope.countriesList = response.data;
			    });
		 		
			 $scope.getsubscriptionDetails=data.data.packageRenewalHistory;
			   
			   $scope.pagination = Pagination.getNew(PAGESIZE);
	    	
	        //$scope.user = data.data;
	        
	        $scope.pagination.numPages = Math.ceil($scope.getsubscriptionDetails.length/$scope.pagination.perPage);
	        $scope.pageSize = PAGESIZE;
	        
	        $scope.PactotalRecords = $scope.getsubscriptionDetails.length;
	        
	        $scope.PactotalNoOfPages =  $scope.pagination.numPages;
			 
			 
			 $scope.getActivePackageDetails=data.data.packageRenewalHistoryobj;
			 
			 
			 $scope.getsubscriptionDetailslength=$scope.getsubscriptionDetails.length;
			 $scope.companyDetails=data.data.company;
		        if($scope.getActivePackageDetails !=null && $scope.getActivePackageDetails !="null" && $scope.getActivePackageDetails.packageId !=1){
		        	$scope.validTill=$scope.getActivePackageDetails.validTo;
		        	localStorage.setItem('packagevalidtill', $scope.validTill);
		        	localStorage.setItem('packagevalidFrom', $scope.getActivePackageDetails.validFrom);
					localStorage.setItem('packageAmountForCustomJobs', $scope.getActivePackageDetails.amount);
		        }	
		        if($scope.companyDetails.billingCountry ==null || $scope.companyDetails.billingCountry =="null" ){
		        	$scope.companyDetails.billingCountry ="IN";
		        }
				//localStorage.setItem('billingCountry', $scope.companyDetails.billingCountry);
			});
		}	
			 $scope.validateCustomJob = function(joblimit){
				 $scope.joblimitLessThanfifty =null;
				// var jobnumber = $("input#customJoblimit").val();
				
    if (joblimit !== "" && !$.isNumeric(joblimit)) {
		$scope.joblimitLessThanfifty ="Please enter number";
	}else if(parseInt(joblimit) <= 50){
		$scope.joblimitLessThanfifty="Please enter greater than 50 jobs";
	}else if(parseInt(joblimit) > 50){
		$scope.joblimitLessThanfifty =null ;
	}
				
			
				 
			 }
	 $scope.change = function(formattedgradTotal,formattedpayableAmount,noOfCustomJobs,packageName){
	
       if($scope.curreny == null){
			if($scope.billingCountry == "IN"){
				$scope.curreny = "INR";
			}else{
				$scope.curreny= "$";
			}
		}
		$scope.validGrandTotal=null;
		$scope.error=false;
		if(typeof noOfCustomJobs =="undefined" && packageName ==">50 Active Jobs"){
			$scope.joblimitLessThanfifty ="Please enter Job limit";
			$scope.error=true;
		}
            if(formattedgradTotal !== "" && !$.isNumeric(formattedgradTotal)){
				$scope.validGrandTotal="Please enter numbers";
				$scope.error=true;
				
			}       
		 if(packageName !=">50 Active Jobs" && $scope.error==false){
		formattedgradTotal=formattedgradTotal.replace(/\,/g,'');
		 formattedgradTotal=parseInt(formattedgradTotal,10); 
if($scope.billingCountry == "IN"){		 
		 $scope.taxPercentage = ($scope.servicetaxForDisp/100)+1;
		 $scope.amount =  Math.round(formattedgradTotal/$scope.taxPercentage);
		
			var result = Math.round((parseInt(localStorage.getItem('servicetax')) / 100) * $scope.amount);
			$scope.formattedserviceTaxx = result;
}else{
	$scope.amount = formattedgradTotal;
}
		     if(formattedpayableAmount != null){
				formattedpayableAmount=parseInt(formattedpayableAmount,10);
				 $scope.formattedpayableAmount = $scope.amount;
				}else{
			     $scope.formattedannualCost = $scope.amount;
				}
		 }else if(packageName ==">50 Active Jobs" && $scope.error==false){
			 
		 formattedgradTotal=formattedgradTotal.replace(/\,/g,'');
		 formattedgradTotal=parseInt(formattedgradTotal,10); 
if($scope.billingCountry == "IN"){		 
		 $scope.taxPercentage = ($scope.servicetaxForDisp/100)+1;
		 $scope.amount =  Math.round(formattedgradTotal/$scope.taxPercentage);
		
			var result = Math.round((parseInt(localStorage.getItem('servicetax')) / 100) * $scope.amount);
			$scope.formattedserviceTaxx = result;
}else{
	 $scope.amount = formattedgradTotal;
}
		     if(formattedpayableAmount != null){
				formattedpayableAmount=parseInt(formattedpayableAmount,10);
				 $scope.formattedpayableAmount = $scope.amount;
				}else{
			     $scope.formattedannualCost = $scope.amount;
				}
			 
			 
		 }
		 		 
	 }
	
	
// showing the companies 5 at a time
	 
	 if(!$rootScope.company){
	 	$rootScope.company = null;
	 
		}
	 
	 if(!$rootScope.companyLimit){
		 $rootScope.companyLimit = null;
	 }
	 
	 if($rootScope.companyLimit){
		 $scope.limit = $rootScope.companyLimit;
		 
	 } else {
			 
		 $rootScope.companyLimit = limitStep;
		 $scope.limit = limitStep;
	 }
	 
	 
	 $scope.searchError = "no";
	 $scope.showCompanyNoFound = "";
	 $scope.searchCompany = function(){
		 $scope.limit = 5;
		 var isActive;
		 var isPremium;
		
	    	if($scope.companyfilterState){
	    		isActive = 1;
	    	}
	    	else {
	    		isActive = 0;
	    	} 
	    	
	    	if($scope.companyfilterStatePremium){
	      		isPremium=1;
	      	}else{
	      		isPremium=0
	      	}
		 
		 $scope.searchTexts = $('#searchRole').val();
		 $scope.searchError = "no";
		 if($scope.searchTexts == ''){
			// $scope.searchError = "yes";
			 $activityIndicator.startAnimating();
			 
			 $scope.sessionId=localStorage.getItem('sessionId');
			 $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
			 
			 services.getCompanyListByOrder(0,isActive,isPremium,$scope.sessionId,$scope.loginUserId).then(function(data){
					
					
					if (data.data.length == 1){
						 $activityIndicator.stopAnimating();
						 $scope.companyObject=data.data[0];
						 if($scope.companyObject.webserviceAPIResponseCode == UNAUTHORIZED){
							 $rootScope.company=null;
						 growl.error(UNAUTHORIZED_ERROR_MSG);
						 $('#logout').click();
						 return;
						 }
					 }
					$activityIndicator.stopAnimating();
	   				$rootScope.company = data.data;
	   				
	   				for (index in $rootScope.companys) {
	   					
	   					$rootScope.company.push($rootScope.companys[index]);
	   					
	   				}
	   				
	   				
	   				var keys = Object.keys($rootScope.company);
			        var last = keys[keys.length-1];
			        $rootScope.companyLastId = $rootScope.company[last].id;
			        
			        // console.log(JSON.stringify($rootScope.company));
			        var compList = $rootScope.company;			
			        $rootScope.companyLimitlength = compList.length;
			        
			        if(compList.length == 0){
			        	$scope.showCompanyNoFound = "No Companies to display";
			        }
	   				
	   			});
			 
		 }else{
			 
				$rootScope.company = "";
				$activityIndicator.startAnimating();
				$scope.sessionId=localStorage.getItem('sessionId');
				$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
				 

	    	services.searchCompanyList($scope.searchTexts,0,isActive,isPremium,$scope.sessionId,$scope.loginUserId).then(function(data){
	    		
	    		if (data.data.length == 1){
					 $activityIndicator.stopAnimating();
					 $scope.companyObject=data.data[0];
					 if($scope.companyObject.webserviceAPIResponseCode == UNAUTHORIZED){
						 $rootScope.company=null;
					 growl.error(UNAUTHORIZED_ERROR_MSG);
					 $('#logout').click();
					 return;
					 }
				 }
	    		$activityIndicator.stopAnimating();
	    		
	    		$rootScope.company = data.data;
	    		
	    	    $scope.limit = 0;
		        $scope.limit += limitStep;
			    $rootScope.companyLimit = $scope.limit;
			    var compList = $rootScope.company;
		        $rootScope.companyLimitlength = compList.length;
		        if(compList.length != 0){
		        var keys = Object.keys($rootScope.company);
		        var last = keys[keys.length-1];
		         
		        $rootScope.companyLastId = $rootScope.company[last].id;
		       
		        }else{
		        	$scope.showCompanyNoFound = "No Companies to display";
		        }
		    
				
			});
		 }
		 }
		
	 $scope.sessionId=localStorage.getItem('sessionId');
	 $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
	 
	 $scope.moreJobs = function() {
		 
		 var localStorage = $window.localStorage;
		 $scope.sessionId=localStorage.getItem('sessionId');
		 
		 
		 $activityIndicator.startAnimating();
		 
		 	var isActive;
	      	
	    	if($scope.companyfilterState){
	    		isActive = 1;
	    	}
	    	else {
	    		isActive = 0;
	    	}
	    	
	    	if($scope.companyfilterStatePremium){
	      		isPremium=1;
	      	}else{
	      		isPremium=0
	      	}
	    	
	    	$scope.searchTexts = $('#searchRole').val();
	    	
	    	if($scope.searchTexts != '' && typeof $scope.searchTexts != "undefined"){

		    	services.searchCompanyList($scope.searchTexts,$rootScope.companyLastId,isActive,isPremium,$scope.sessionId,$scope.loginUserId).then(function(data){
		    		
		    		$scope.showCompanyNoFound = "";
		    		if (data.data.length == 1){
						 $activityIndicator.stopAnimating();
						 $scope.companyObject=data.data[0];
						 if($scope.companyObject.webserviceAPIResponseCode == UNAUTHORIZED){
							 $rootScope.companys=null;
						 growl.error(UNAUTHORIZED_ERROR_MSG);
						 $('#logout').click();
						 return;
						 }
					 }
		    		$activityIndicator.stopAnimating();
		    		
		    		$rootScope.companys = data.data;
	   				
		    		
			         var compList = $rootScope.company;			
			        $rootScope.companyLimitlength = compList.length;  
			        
			        if(compList.length == 0){
			        	$scope.showCompanyNoFound = "No Companies to display";
			        }
			        
			        for (index in $rootScope.companys) {
	   					
	   					$rootScope.company.push($rootScope.companys[index]);
	   					
	   				}
	   				
			        var compList = $rootScope.company;			
			        $rootScope.companyLimitlength = compList.length;
	   				
	   				var keys = Object.keys($rootScope.company);
			        var last = keys[keys.length-1];
			        $rootScope.companyLastId = $rootScope.company[last].id;
					
				});
	    	}
	    	else{  	
	    		
			services.getCompanyListByOrder($rootScope.companyLastId,isActive,isPremium,$scope.sessionId,$scope.loginUserId).then(function(data){
				
				$scope.showCompanyNoFound = "";
				if (data.data.length == 1){
					 $activityIndicator.stopAnimating();
					 $scope.companyObject=data.data[0];
					 if($scope.companyObject.webserviceAPIResponseCode == UNAUTHORIZED){
						 $rootScope.companys=null;
					 growl.error(UNAUTHORIZED_ERROR_MSG);
					 $('#logout').click();
					 return;
					 }
				 }
				$activityIndicator.stopAnimating();
   				$rootScope.companys = data.data;
   				
   			 
		        for (index in $rootScope.companys) {
   					
   					$rootScope.company.push($rootScope.companys[index]);
   					
   				}
		        
		    	var compList = $rootScope.company;			
		        $rootScope.companyLimitlength = compList.length;
		        
		        if(compList.length == 0){
		        	$scope.showCompanyNoFound = "No Companies to display";
		        }
		        
		        var keys = Object.keys($rootScope.company);
		        var last = keys[keys.length-1];
		        $rootScope.companyLastId = $rootScope.company[last].id;
   				
   			});
			
			
			
	      
	 }

		 
		 
		    $scope.limit += limitStep;
		    $rootScope.companyLimit = $scope.limit;
		};
	
		// redirecting to login screen if session expired
		if(userName === null){
		$location.path('/login');
		return;
	}
	else {
		$scope.userName = userName;
		$scope.userId = parseInt(userId);
		$scope.userPermissionForManageUser = userPermissionForManageUser;
		$scope.welUserNameAdmin = welUserName;
	}
		
		
		
		
		
		
		
		$scope.getCompanyDetails = function(companyId) { 
	    $scope.annualCost = null;
		$scope.packagecostremaining = null;
		$scope.payableAmount = null;
		$scope.serviceTaxx = null;
		$scope.gradTotal = null;
			var cmpId = companyId;
			$rootScope.companyId = companyId;
			 $scope.webSiteCheck=true;
			 $scope.dotCheck="true";
			$scope.sessionId=localStorage.getItem('sessionId');
			$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
			$( "#changeSubscription" ).prop( "disabled", false );
			
		services.getcompanyDetails(cmpId,$scope.sessionId,$scope.loginUserId).then(function(data){
			
			if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
				
				growl.error(UNAUTHORIZED_ERROR_MSG);
				$('#logout').click();
				return;
			}
			$scope.CompanyData = data.data.company;
			$scope.billingCountry = $scope.CompanyData.billingCountry;
		//alert(JSON.stringify($scope.CompanyData.companyName));
		$scope.companyName = $scope.CompanyData.companyName;
			
			 if($scope.billingCountry ==null || $scope.billingCountry =="null" ){
		        	$scope.billingCountry ="IN";
		        }
			
			$scope.loadpackageDetails($rootScope.companyId,$scope.billingCountry);

		});
		
	}
	$scope.savePayment = function() { 
	
$scope.companyId = $scope.companyId;
$scope.packageId = $scope.data.id;
$scope.planName = $scope.data.packageName;
if($scope.currencyType == null){
	$scope.currencyType = 'I';
}else{
	$scope.currencyType = $scope.data.currencyType;
}

$scope.billingCountry = $scope.billingCountry;
$scope.annualCost = $scope.formattedannualCost;
$scope.serviceTax = $scope.formattedserviceTaxx;
$scope.grandTotal = $scope.formattedgradTotal;

	$scope.sessionId=localStorage.getItem('sessionId');
      $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
	  
	  if($scope.formattedpackagecostremaining == undefined){
		 
		  $scope.packagecostremaining = null;
	  }else{
		  $scope.packagecostremaining = $scope.formattedpackagecostremaining;
	  }
	   if($scope.formattedpayableAmount == undefined){
		  $scope.payableAmount = null;
	  }else{
		  $scope.payableAmount = $scope.formattedpayableAmount;
	  }
	  if($scope.noOfCustomJobs == undefined){
		  $scope.noOfCustomJobs = null;
	  }else{
		  
		  $scope.noOfCustomJobs = $scope.noOfCustomJobs;
	  }
	 // if($scope.extendingDays == undefined){
		// $scope.extendingDays = null;
	 // }else{
		  $scope.extendingDays = $scope.extendingDays;
	 // }
	
	 $scope.validFromNew = new Date(parseInt($scope.validFrom));
if($scope.validFromNew == "Invalid Date"){
	$scope.validFrom = $scope.validFrom;
}else{
	$scope.validFrom = $scope.validFromNew;
}

$( "#changeSubscription" ).prop( "disabled", true );
	 services.saveOfflinePayment($scope.companyId,$scope.packageId,$scope.planName,$scope.currencyType,$scope.validFrom,$scope.billingCountry,$scope.annualCost,$scope.serviceTax,$scope.grandTotal,$scope.packagecostremaining,$scope.payableAmount,$scope.extendingDays,$scope.noOfCustomJobs,$scope.sessionId,$scope.loginUserId,$scope.clientInvoice).then(function(response){				

					 $activityIndicator.stopAnimating();
					 
			if (response.status == 200 && response.data.code == 200) {
				$("#changeSubscriptionModal").modal("hide");
    			 //growl.success("Job package changed successfully");	 
    			 $("#SendEmailPopUp").modal("show");
    			 $scope.invoiceForEmail= response.data.additionalInfo;
    			 $scope.orderId= response.data.additionalInfo1;
    			
            }
    		 else {
    			 $( "#changeSubscription" ).prop( "disabled", false );
            	growl.error("Something went wrong. Please try again.");
            }
			$scope.getCompanyData();
						 }
	)};
	
	$scope.printDiv = function() {
	       w=window.open();    
		   w.document.write(jQuery('.print').html());
		   w.document.close();
		   w.print(); 
		   w.close();	  
	}


var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};
$scope.exportData=function(){
	
	services.createNdownloadInvoice($scope.sessionId,"<h2>Order Invoice</h2></br>"+$scope.invoiceForEmail,$scope.orderId).then(function(data){

    var path = JSON.parse(data.data);
        var a         = document.createElement('a');
        a.href        = INVOICEPATH+path; 
        a.target      = '_blank';
        a.download    = INVOICEPATH+path;
        document.body.appendChild(a);
        a.click();
	});
	
}



	$scope.sendInvoiceEmail=function(){
		 services.sendInvoiceEmail($scope.companyId,$scope.packageId,$scope.planName,$scope.currencyType,$scope.validFrom,$scope.billingCountry,$scope.annualCost,$scope.serviceTax,$scope.grandTotal,$scope.packagecostremaining,$scope.payableAmount,$scope.extendingDays,$scope.noOfCustomJobs,$scope.sessionId,$scope.loginUserId).then(function(response){				

			 $activityIndicator.stopAnimating();
	
	if (response.status == 200 && response.data.code == 200) {
		 $("#SendEmailPopUp").modal("hide");
		 growl.success("Invoice Sent Successfully");
		
  }
	 else {
		 $( "#SendEmailPopUp" ).prop( "disabled", false );
  	growl.error("Something went wrong while Sending the Email. Please try again.");
  }
	
		 });
	}
	
	 $scope.viewInvoice =function(){
		 $scope.invoiceContent = $sce.trustAsHtml($scope.invoiceForEmail);
		 $('#viewInvoice').modal('show');
		 
	 }
		
	// fetching all the company for admin
	$scope.getCompanyData = function() { 
		$scope.sessionId=localStorage.getItem('sessionIdOfAdmin');
		$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
		 
		$activityIndicator.startAnimating();
		$scope.showCompanyNoFound = "";
		
		var isActive;
      	if($rootScope.filterStatusValue == '1' || $rootScope.filterStatusValue == true){
      		isActive = 1;
      		$scope.companyfilterState = true;
      		$scope.companyfilterStatePremium = false;
			$scope.filterStatusValue = '1';
			
			$scope.filterStatusValue = '1';
			$scope.companystatusFilterChanged(1);
			
      	}else{
      		isActive = 0;
      	}
      	if($scope.companyfilterStatePremium){
      		isPremium=1;
      	}else{
      		isPremium=0
      	}
		
		services.getCompanyList(isActive,isPremium,$scope.sessionId,$scope.loginUserId).then(function(data){
			if (data.data.length == 1){
				 $activityIndicator.stopAnimating();
				 $scope.companyObject=data.data[0];
				 if($scope.companyObject.webserviceAPIResponseCode == UNAUTHORIZED){
					 $scope.company=null;
				 growl.error(UNAUTHORIZED_ERROR_MSG);
				 $('#logout').click();
				 return;
				 }
			 }

		if(typeof $scope.companyfilterState=="undefined"){
			$scope.companyfilterState = true;	
		}else{
			$scope.companyfilterState=$scope.filtercheck;
		}
		
		// $rootScope.companyfilterState = $scope.companyfilterState;
		
		
		$activityIndicator.stopAnimating();
		
		// $scope.pagination = Pagination.getNew(PAGESIZE);
	
		$rootScope.company  = data.data;

		
        var compList = $rootScope.company;	

        if(compList.length == 0){
        	$scope.showCompanyNoFound = "No Companies to display";
        }
        
        $rootScope.companyLimitlength = compList.length;
        
        var keys = Object.keys($rootScope.company);
        var last = keys[keys.length-1];
        
        $rootScope.companyLastId = $rootScope.company[last].id;
        
// defining checkbox status
		if(typeof $rootScope.isCheckedOrNot ==='undefined' || $rootScope.isCheckedOrNot =='yes'){
			
			if( typeof $rootScope.isCheckedOrNot === 'undefined'){
				
				$scope.companyfilterState = true;
				$scope.filterStatusValue = '1';
				
				
			}
			
			else if($rootScope.filterStatusValue == '1'){
				$scope.companyfilterState = true;
				// $rootScope.companyfilterState = $scope.companyfilterState;
				
			}else if($rootScope.filterStatusValue == ""){
				$scope.companyfilterState = false;	
				
				
			}
		}
		// showing live companies
		if($scope.companyfilterState){
			$scope.filteredJobs = $filter('filter')($rootScope.company, {isLive :'1'});
			
		}
		else {
			$scope.filteredJobs = $rootScope.company;
		}
    });

	}
	
	// used for refresh issue when job limit is added in popup
	$scope.init = function() {
		if(alreadyLoadedListSize == 0){
			
		this.getCompanyData();
	}
	};
	
	
	 // sorting
    $scope.sort = {
            active: '',
            descending: undefined
        }     
         	
        $scope.changeSorting = function(column) {
            var sort = $scope.sort;
 
            if (sort.active == column) {
                sort.descending = !sort.descending;
				
            } else {
                sort.active = column;
                sort.descending = false;
            }
        };
        // getting the relevent icon on sorting
        $scope.getIcon = function(column) {
                     
            var sort = $scope.sort;
            
            if (sort.active == column) {
              return sort.descending
                ? 'glyphicon-chevron-up'
                : 'glyphicon-chevron-down';
            }
            
            return 'glyphicon-star';
        }
        // on change of check box
  $scope.companystatusFilterChanged = function(status){
	  $scope.sessionId=localStorage.getItem('sessionIdOfAdmin');
	  $activityIndicator.startAnimating();
	  
	      	var isActive;
	      	var isPremium;
	      	$scope.searchError = "no";
	      	$rootScope.isCheckedOrNot = "yes";
	    	if($scope.companyfilterState){
	    		$scope.filterStatusValue = '1';
	    		$rootScope.filterStatusValue = '1';
	    		$rootScope.companyfilterState = $scope.companyfilterState;
	    		isActive = 1;
	    	}
	    	else {
	    		
	    		$scope.filterStatusValue = "";
	    		$rootScope.filterStatusValue = "";
	    		isActive = 0;
	    		$rootScope.companyfilterState = $scope.companyfilterState;
	    	}
	    	if($scope.companyfilterStatePremium){
	    		$rootScope.companyfilterStatePremium = $scope.companyfilterStatePremium;
	      		isPremium=1;
	      	}else{
	      		$rootScope.companyfilterStatePremium = $scope.companyfilterStatePremium;
	      		isPremium=0
	      	}
	    	
	    	
	    	$scope.searchTexts = $('#searchRole').val();
	    	if($scope.searchTexts != '' && typeof $scope.searchTexts != "undefined"){

		    	services.searchCompanyList($scope.searchTexts,0,isActive,isPremium,$scope.sessionId,$scope.loginUserId).then(function(data){
		    		
		    		if (data.data.length == 1){
						 $activityIndicator.stopAnimating();
						 $scope.companyObject=data.data[0];
						 if($scope.companyObject.webserviceAPIResponseCode == UNAUTHORIZED){
							 $rootScope.company=null;
						 growl.error(UNAUTHORIZED_ERROR_MSG);
						 $('#logout').click();
						 return;
						 }
					 }
		    		$activityIndicator.stopAnimating();
		    		
		    		$rootScope.company = data.data;
	   				
		    		
			        
			        // console.log(JSON.stringify($rootScope.company));
			        var compList = $rootScope.company;	
			        
			        if(compList.length == 0){
			        	$scope.showCompanyNoFound = "No Companies to display";
			        }
			        $rootScope.companyLimitlength = compList.length;
			        $scope.limit = 0;
			        $scope.limit += limitStep;
				    $rootScope.companyLimit = $scope.limit;
			       
			        
					
				});
	    	}else{
	    	
	    	
	    	
	    	services.getCompanyList(isActive,isPremium,$scope.sessionId,$scope.loginUserId).then(function(data){
	    		if (data.data.length == 1){
					 $activityIndicator.stopAnimating();
					 $scope.companyObject=data.data[0];
					 if($scope.companyObject.webserviceAPIResponseCode == UNAUTHORIZED){
						 $rootScope.company=null;
					 growl.error(UNAUTHORIZED_ERROR_MSG);
					 $('#logout').click();
					 return;
					 }
				 }
	    		$activityIndicator.stopAnimating();
	    		
	    		
   				$rootScope.company = data.data;
   				
   				
   				
   			 var keys = Object.keys($rootScope.company);
		        var last = keys[keys.length-1];
		        
		       
		        
		        $rootScope.companyLastId = $rootScope.company[last].id;
		        
   				// console.log(JSON.stringify($rootScope.company));
		        var compList = $rootScope.company;
		        $scope.limit = 0;
		        $scope.limit += limitStep;
			    $rootScope.companyLimit = $scope.limit;
		        $rootScope.companyLimitlength = compList.length;
		        
   			});
			
	    	}
	    }
        
        // gettig the company id to display jobs for that company
        $scope.companyJobPage = function(index,id,page,openjobs) {
        	$rootScope.openjobs = openjobs;
        	$rootScope.companyEditIndex = index;
        	 $(".clearable").val('');
        	$rootScope.CompanyId = id;
    		localStorage.setItem('companyId', $rootScope.CompanyId);
    		localStorage.removeItem('jobUrl');
    		if(page=='V'){
    			$location.path('/view-company');
    			
    		}else{
    			$location.path('/company-jobs');
    		}
    		   			
    		
    	}
       // clearing the search field on click of x button
        $(".clearable").click(function(){
        	
        	$scope.searchText = null;
        	
        	
        });
        // job limit popup
        $scope.addjoblimitModal = function(cmpny_id,comp_employees,comp_country) {
        	$scope.required="";
        	 localStorage.setItem('cmpny_id_forjoblimit', cmpny_id);
     		 		 
        	 var id =cmpny_id;
        	 $scope.numberOfEmployees = comp_employees;
        	 $scope.billingCountry = comp_country;
        	 $scope.sessionId=localStorage.getItem('sessionId');
        	 $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
             services.getJoblimit(id,$scope.sessionId,$scope.loginUserId).then(function(data){
            	 
            	 if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
            			
            			growl.error(UNAUTHORIZED_ERROR_MSG);
            			$('#logout').click();
            			return;
            	}
            	 
            	 if(data.data.jobLimit <="50"){
            	 $scope.joblimit = data.data.jobLimit; 
            	 $scope.joblimitCustom ="";   	
     		   }
            	 else
            	 {
     			   $scope.joblimit="custom";
                   $scope.joblimitCustom =data.data.jobLimit;
     		     }
             
             });
        }
       
        // saving the job limit
        $scope.savejoblimit = function() {
        	
        	$scope.required="";
        	var joblimit="";
        	
        	var CmpID    = localStorage.getItem('cmpny_id_forjoblimit'); 
    	// checking if custom limit is entered and setting it accordingly
        	if($scope.joblimit <=50){
    			 joblimit = $scope.joblimit;		
    			 $scope.joblimitCustom=51;
    		}else{
    			 joblimit = $scope.joblimitCustom;
    		}
        // validating the limit
        	$scope.sessionId=localStorage.getItem('sessionId');
        	$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
        	
    	if(joblimit !="" && $scope.joblimitCustom >50){
    		
    		services.setsavejoblimit(CmpID,joblimit,growl,$scope.sessionId,$scope.loginUserId)
    		.then(function (response) {
    			$activityIndicator.startAnimating();
    			
    			$scope.getCompanyData();
    			 
        		$location.path('/companies');
    		if (response.status == 200 && response.data.code == 200) {
    			 growl.success("Job Limits Saved successfully");	 
    			
            }
    		 else {
            	growl.error("Something went wrong. Please try again.");
            }
    		
    	});	
      		
    		$scope.required="";
      		 $('#closechangelimit').click();  		 		
    	}	
    	else if(joblimit ==""){
    		$scope.required="please enter the limit";
    		}else{
    		
    			$scope.required="please enter limit >50";
    		}
    	$scope.filtercheck=$scope.companyfilterState;
    	
     }
        $scope.check = function(event) {
        	$scope.required="";
        }
        $('#change-job-limit').change(function () {
        	$scope.required="";
    	});
        $scope.decomissionCompany = function(){
        	$activityIndicator.startAnimating();
        		$scope.sessionId=localStorage.getItem('sessionId');
        		$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');

              	services.decomissionCompany($scope.companyId,$scope.loggedInAdmin,$scope.sessionId,$scope.loginUserId).then(function(data){
              		$activityIndicator.stopAnimating();
              		if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
              			
              			growl.error(UNAUTHORIZED_ERROR_MSG);
              			$('#logout').click();
              			return;
              		}

              		
               		if (data.status == 200) {
               			
               			$scope.getCompanyData();
               		
               			growl.success("Company Decomissioned successfully");	 
           			
                   }
           		 else {
                   	growl.error("Something went wrong. Please try again.");
                   }
               	});
        		
			
		};
		
	
        $scope.deleteCompany = function(){
        	$activityIndicator.startAnimating();
        	$scope.sessionId=localStorage.getItem('sessionId');
        	 $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
        	
        	services.deleteCompany($scope.companyId,$scope.loggedInAdmin,$scope.sessionId,$scope.loginUserId).then(function(data){
        		$activityIndicator.stopAnimating();
        		if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
        			
        			growl.error(UNAUTHORIZED_ERROR_MSG);
        			$('#logout').click();
        			return;
        		}

        		if (data.status == 200 ) {
        			$scope.getCompanyData();
        			
        		
       			 growl.success("Company Deleted successfully");	 
       			
               }
       		 else {
               	growl.error("Something went wrong. Please try again.");
               }
        		
    		
    		});
        
			
		};
		
		 $scope.goLiveCompany = function(companyId){
			 $activityIndicator.startAnimating();
			 $scope.sessionId=localStorage.getItem('sessionId');
			 $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
		       
	        	services.goLiveCompany($scope.companyId,$scope.loggedInAdmin,$scope.carrersiteURl,$scope.sessionId,$scope.loginUserId).then(function(data){
	        		$activityIndicator.stopAnimating();
	        		if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
	        			
	        			growl.error(UNAUTHORIZED_ERROR_MSG);
	        			$('#logout').click();
	        			return;
	        		}

	        		
	        		
	        		$scope.validateCode=data.data.code;
	        		
	        		if (data.data.code==200 ) {
	        			$("#goLiveModal").modal("hide");
	        		
	        			//$scope.getCompanyData();
	        			$scope.carrersiteURl=null;
	       			 growl.success("Launch successful.");	 
	       			
	               }else if(data.data.code==502 ){
	            	   // growl.error("Carrier site URL already exists.");
	               }else {
	               	growl.error("Something went wrong. Please try again.");
	               	
	               }
	        		
	    		
	    		});
	        
	        
				
			};
		
		 $scope.whiteLabelCompany = function(companyId){
			 $activityIndicator.startAnimating();
			 $scope.sessionId=localStorage.getItem('sessionId');
			 $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
			 
	        	services.whiteLabelCompany($scope.companyId,$scope.loggedInAdmin,$scope.carrersiteURl,$scope.suggestedDomainName,$scope.sessionId,$scope.loginUserId).then(function(data){
	        		$activityIndicator.stopAnimating();
	        		if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
	        			
	        			growl.error(UNAUTHORIZED_ERROR_MSG);
	        			$('#logout').click();
	        			return;
	        		}
	        		
	        		
	        		$scope.validateCode=data.data.code;
	        		
	        		if (data.data.code==200 ) {
	        			// $('#goLiveModal').hide();
	        			 $("#whiteLabelModal").modal("hide");
	        			
	        			$scope.getCompanyData();
	        			$scope.carrersiteURl=null;
	        			
	        		
	       			 growl.success("Company White Labeled successfully.");	 
	       			
	               }else if(data.data.code==502 ){
	            	   	growl.error("Carrier site URL already exists.");
	               }else if(data.data.code==503 ){
	            	    growl.error("Domain Name already exists.");
	               }else {
	               	growl.error("Something went wrong. Please try again.");
	               	
	               }
	        		
	    		
	    		});
	        
	        
				
			};
			
			 $scope.cancelCompany = function(){
				 $scope.carrersiteURl=null;
				 $scope.validateCode=null;
			 }
			 
			 $scope.suggestDomainName=function(companyId){
				 $scope.dotCheck=true;
				 
				 $scope.sessionId=localStorage.getItem('sessionId');
				 $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
				 
				 services.suggestDomainName($scope.companyId,$scope.sessionId,$scope.loginUserId).then(function(data){
					
					 if(data.data == '"'+UNAUTHORIZED+'"'){
		        			growl.error(UNAUTHORIZED_ERROR_MSG);
		        			$('#logout').click();
		        			 $("#whiteLabelModal").modal("hide");
		        			return;
		        		}

					 
					 $scope.fullDomainName= data.data.replace(/"/g, '');
					 $scope.homeDomain= $scope.fullDomainName.substring( $scope.fullDomainName.lastIndexOf("-") + 0);
					 $scope.suggestedDomainName= $scope.fullDomainName.replace($scope.homeDomain, '');
					 $scope.homeDomain= $scope.homeDomain.replace("-",'');
				 });
				 
				 
			 }
			 
			 
			
			 $scope.checkDotValidation=function(){
				 if($scope.carrersiteURl.contains("."))
					 {
					 $scope.dotCheck="true";
					 }else{
						 $scope.dotCheck="false";
					 }
				
			 }
			 $scope.resetPage = function(){
				 $scope.adminUserSearch = "";
				 $scope.userList = 0;
				};
			 $scope.adminUserSearch = "";
			 $scope.getUserListForCompany = function(adminUserSearch,companyId){
				 
				 if(adminUserSearch == undefined || adminUserSearch ==""){
					 $scope.adminUserSearch = "";
					}
				 $activityIndicator.startAnimating();
				 $scope.sessionId=localStorage.getItem('sessionId');
				 $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
				 services.getUserListForCompany($scope.adminUserSearch,$scope.companyId,$scope.sessionId,$scope.loginUserId).then(function(data){
				 $activityIndicator.stopAnimating();
					 if (data.data.length == 1){
						 $scope.userListObject=data.data[0];
						 if($scope.userListObject.webserviceAPIResponseCode == UNAUTHORIZED){
							 $scope.userList=null;
						 growl.error(UNAUTHORIZED_ERROR_MSG);
						 $('#logout').click();
	        			 $("#pickFromAnotherJobPopUp").modal("hide");
						
						 return;
						 }
					 }
					 
					 $scope.userList = data.data;
						
			 });
				
			 }
			 $scope.manageLogin=function(companyId,emailId,password)
			 {
				 $rootScope.emailIdToProceed=emailId;
				 $rootScope.companyIdToProceed=companyId;
				 $rootScope.passwordToProceed=password;
				 
				if(isLocal){
					 $scope.careerSiteUrl=COMPANYURL;
					 
				 }else{
					 $scope.careerSiteUrl="http://"+$scope.companyObj.careerSiteUrl;
					
				 }
				
				$scope.sessionId=localStorage.getItem('sessionId');
				$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
				$scope.sessionId="";
				 services.adminLoginManage(companyId,emailId,password,$scope.sessionId,$scope.loginUserId).then(function(ResponseObject){
						$rootScope.sessionTimeOut = false;
						$scope.loginstatus = ResponseObject.data.data10; 
				        $scope.sessionId=ResponseObject.data.data1;
				        if($scope.loginstatus == 2 || $scope.loginstatus == 0){
				        	$scope.failuremsg = " Sorry! Looks like you typed it wrong. Please try again.";
				        }else if($scope.loginstatus == 3){
				        	$scope.userDoesntExstMsg = "Your account has been deactivated";
				        }else{
				        	$scope.manageCompanyId=$scope.companyObj.id;
							 services.loggedInUserManage(emailId, $scope.manageCompanyId,$scope.sessionId).then(function(data){
								 localStorage.setItem('adminLoginToManage', "true");
				        		 $scope.loggedInUserAdmin = data.data.user;
				        		 $scope.configurationExternalSystem = data.data.configurationExternalSystem;
				        		 var emailIdEncode = window.btoa(emailId);
				        		 
				        		// for getting the status of events and job
								// visibility duration
				        		 $scope.companyCommonConfiguration  = data.data.companyCommonConfiguration;
				        		 var hostName = $location.host();
				        		 var siteUrl = "";
				        		
				        		 xdLocalStorage.setItem('sessionId', $scope.loggedInUserAdmin.sessionId, function (data) {  /* callback */  });
				        		 xdLocalStorage.setItem('sessionIdManage', $scope.loggedInUserAdmin.sessionId, function (data) {  /* callback */  });
				        		 xdLocalStorage.setItem('loggedAdminIdAdmin', $scope.loggedAdminId, function (data) {  /* callback */  });
				        		 xdLocalStorage.setItem('welUserNameFromAdmin',  $scope.welUserNameAdmin, function (data) {  /* callback */  });
				        		 xdLocalStorage.setItem('adminLoginToManage', "true", function (data) {  /* callback */  });
				        		 
				        		 if(isLocal){
				        			 window.open($scope.careerSiteUrl+"/public/manage/#/admin/"+$scope.loggedInUserAdmin.sessionId+"/"+ localStorage.getItem('loginUserIdOfAdminToManage')+"/"+emailIdEncode,"_blank");
				        		 }else{
				        			 window.open($scope.careerSiteUrl+"/manage/#/admin/"+$scope.loggedInUserAdmin.sessionId+"/"+ localStorage.getItem('loginUserIdOfAdminToManage')+"/"+emailIdEncode,"_blank");	 
				        		 }
				        		 
				        		
					                });
									
				        }
				        	});
							
				        
				    }
			 
			 $scope.checkManageLogin=function(companyId,emailId,password)
			 {
				 $rootScope.emailIdToProceed=emailId;
				 $rootScope.companyIdToProceed=companyId;
				 $rootScope.passwordToProceed=password;
				 
				if(isLocal){
					 $scope.careerSiteUrl=COMPANYURL;
					 
				 }else{
					 $scope.careerSiteUrl="http://"+$scope.companyObj.careerSiteUrl;
					
				 }
				
				$scope.sessionId=localStorage.getItem('sessionId');
				$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
				$scope.sessionId="";
				
				 services.checkAdminLoginManage(companyId,emailId,password,$scope.sessionId,$scope.loginUserId).then(function(data){
					 $rootScope.sessionTimeOut = false;
				        $scope.loginstatus = data.data;
				        localStorage.setItem('companyRoles',ResponseObject.data.data3);
				        if($scope.loginstatus == 2 || $scope.loginstatus == 0){
				        	$scope.failuremsg = " Sorry! Looks like you typed it wrong. Please try again.";
				        }else if($scope.loginstatus == 3){
				        	$scope.userDoesntExstMsg = "Your account has been deactivated";
				        }else if($scope.loginstatus == 4){
				        	$('#adminProceed').modal('show');
				        	
				        }else{
				        	$scope.manageCompanyId=$scope.companyObj.id;
							 services.loggedInUserManage(emailId, $scope.manageCompanyId).then(function(data){
								 localStorage.setItem('adminLoginToManage', "true");
				        		 $scope.loggedInUserAdmin = data.data.user;
				        		 $scope.configurationExternalSystem = data.data.configurationExternalSystem;
				        		 
				        		// for getting the status of events and job
								// visibility duration
				        		 $scope.companyCommonConfiguration  = data.data.companyCommonConfiguration;
				        		 var hostName = $location.host();
				        		 var siteUrl = "";
				        		 var emailIdEncode = window.btoa(emailId);
				        		
				        		 xdLocalStorage.setItem('sessionId', $scope.loggedInUserAdmin.sessionId, function (data) {  /* callback */  });
				        		 xdLocalStorage.setItem('sessionIdManage', $scope.loggedInUserAdmin.sessionId, function (data) {  /* callback */  });
				        		 xdLocalStorage.setItem('loggedAdminIdAdmin', $scope.loggedAdminId, function (data) {  /* callback */  });
				        		 xdLocalStorage.setItem('welUserNameFromAdmin',  $scope.welUserNameAdmin, function (data) {  /* callback */  });
				        		 xdLocalStorage.setItem('adminLoginToManage', "true", function (data) {  /* callback */  });
				        		 
				        		 if(isLocal){
				        			 window.open($scope.careerSiteUrl+"/public/manage/#/admin/"+$scope.loggedInUserAdmin.sessionId+"/"+ localStorage.getItem('loginUserIdOfAdminToManage')+"/"+emailIdEncode,"_blank");
				        		 }else{
				        			 window.open($scope.careerSiteUrl+"/manage/#/admin/"+$scope.loggedInUserAdmin.sessionId+"/"+ localStorage.getItem('loginUserIdOfAdminToManage')+"/"+emailIdEncode,"_blank");	 
				        		 }
				        		
					                
							 });
									
				        }
				        	});
							
				        
				    }
			 
			 $scope.checkManageLogin=function(companyId,emailId,password)
			 {
				 $rootScope.emailIdToProceed=emailId;
				 $rootScope.companyIdToProceed=companyId;
				 $rootScope.passwordToProceed=password;
				 
				if(isLocal){
					 $scope.careerSiteUrl=COMPANYURL;
					 
				 }else{
					 $scope.careerSiteUrl="http://"+$scope.companyObj.careerSiteUrl;
					
				 }
				
				$scope.sessionId=localStorage.getItem('sessionId');
				$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
				
				 services.checkAdminLoginManage(companyId,emailId,password,$scope.sessionId,$scope.loginUserId).then(function(ResponseObject){
					 $rootScope.sessionTimeOut = false;
					 $scope.loginstatus = ResponseObject.data.data10; 
				        $scope.sessionId=ResponseObject.data.data1;
				        localStorage.setItem('companyRoles',ResponseObject.data.data3);
				        if($scope.loginstatus == 2 || $scope.loginstatus == 0){
				        	$scope.failuremsg = " Sorry! Looks like you typed it wrong. Please try again.";
				        }else if($scope.loginstatus == 3){
				        	$scope.userDoesntExstMsg = "Your account has been deactivated";
				        }else if($scope.loginstatus == 4){
				        	$('#adminProceed').modal('show');
				        	
				        }else{
				        	$scope.manageCompanyId=$scope.companyObj.id;
							 services.loggedInUserManage(emailId, $scope.manageCompanyId,$scope.sessionId).then(function(data){
								 localStorage.setItem('adminLoginToManage', "true");
				        		 $scope.loggedInUserAdmin = data.data.user;
				        		 $scope.configurationExternalSystem = data.data.configurationExternalSystem;
				        		 
				        		// for getting the status of events and job
								// visibility duration
				        		 $scope.companyCommonConfiguration  = data.data.companyCommonConfiguration;
				        		 var hostName = $location.host();
				        		 var siteUrl = "";
				        		 var emailIdEncode = window.btoa(emailId);
				        		
				        		 xdLocalStorage.setItem('sessionId', $scope.loggedInUserAdmin.sessionId, function (data) {  /* callback */  });
				        		 xdLocalStorage.setItem('sessionIdManage', $scope.loggedInUserAdmin.sessionId, function (data) {  /* callback */  });
				        		 xdLocalStorage.setItem('loggedAdminIdAdmin', $scope.loggedAdminId, function (data) {  /* callback */  });
				        		 xdLocalStorage.setItem('welUserNameFromAdmin',  $scope.welUserNameAdmin, function (data) {  /* callback */  });
				        		 xdLocalStorage.setItem('adminLoginToManage', "true", function (data) {  /* callback */  });
				        		 
				        		 if(isLocal){
				        			 window.open($scope.careerSiteUrl+"/public/manage/#/admin/"+$scope.loggedInUserAdmin.sessionId+"/"+ localStorage.getItem('loginUserIdOfAdminToManage')+"/"+emailIdEncode,"_blank");
				        		 }else{
				        			 window.open($scope.careerSiteUrl+"/manage/#/admin/"+$scope.loggedInUserAdmin.sessionId+"/"+ localStorage.getItem('loginUserIdOfAdminToManage')+"/"+emailIdEncode,"_blank");	 
				        		 }
				        		
					                });
									
				        }
				        	});
							
				        
				    }
			
			 $scope.closeModal = function () {
				 $("#pickFromAnotherJobPopUp").modal("hide");
				};
});

/*ccubeApp.controller('companyjobListCrtl', function ($scope,$rootScope,ngDialog,$filter,$routeParams,services,localStorageService,$location,growl,$window,Pagination,PAGESIZE,prompt,$activityIndicator,$timeout) { 
	
	var userName = localStorage.getItem('userNameAdmin');
	var jobUrl = localStorage.getItem('jobUrl');
	var userId = localStorage.getItem('loginUserIdAdmin');
	var welUserName = localStorage.getItem('welUserNameAdmin');
	var userPermissionForManageUser = localStorage.getItem('userPermissionForManageUser');
	var cmpId = localStorage.getItem('companyId'); 
	$rootScope.selectedJobId = null;
	$scope.parseInt = parseInt;
	 // for source filter
	 flag=0;
	 is_clicked=0;
	 is_clicked1=0;
	$rootScope.jobId = null;
	$rootScope.appStatus = null;
	$rootScope.manageJobStatus = "MyJobs";
	$scope.isShowMoreJobs = "no";
	$scope.sessionId=localStorage.getItem('sessionId');
	$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
	$scope.filterState = true;
	$rootScope.filterStatusValue = '1';
	var isActive = 1;
	var limitStep = 5;
	$rootScope.job = null;
	$scope.job = null;
	$rootScope.jobs = null;
	$rootScope.jobApplicationWithResume = null;
    $rootScope.jobApplicationWithoutResume = null;
    $rootScope.AppliesFilterStatusValue = null;
	
	$scope.searchTexts = $('#searchRole').val();
	  $scope.statusFilterChanged = function(status){
		  $activityIndicator.startAnimating();
		      	$rootScope.isCheckedOrNot = "yes";
		    	if($scope.filterState){
		    		$scope.filterStatusValue = '1';
		    		$rootScope.filterStatusValue = '1';
		    		$rootScope.filterState = $scope.filterState;
		    		isActive = 1;
		    	}
		    	else {
		    		$scope.filterStatusValue = "";
		    		$rootScope.filterStatusValue = "";
		    		isActive = 0;
		    		$rootScope.filterState = $scope.filterState;
						$rootScope.jobs = []; 
						$scope.job = [];
						
		    	}
		    	$rootScope.jobs =[]; 
				
		    	services.getCompanyjobList(cmpId,isActive,$scope.sessionId,$scope.loginUserId,$scope.searchTexts).then(function(data){
		    		$scope.limit =5;
		    		if (data.data.length == 1){
		    			 $activityIndicator.stopAnimating();
		    			 $rootScope.jobObject=data.data[0];
		    			 if($rootScope.jobObject.webserviceAPIResponseCode == UNAUTHORIZED){
		    				 $rootScope.job=null;
		    			 growl.error(UNAUTHORIZED_ERROR_MSG);
		    			 $('#logout').click();
		    			 return;
		    			 }
		    		 }
		    		
		    		$scope.job = data.data;
		    		//
		    		if(data.data.length == 0){
		    			$scope.filterState = false;
		    			$scope.filterStatusValue = 1;
		    			$scope.statusFilterChanged(1);
		    		}
		            for (index in $rootScope.jobs) {
		    				
		            	$scope.job.push($rootScope.jobs[index]);
		    				
		    			}
		            
		            var keys = Object.keys($scope.job);
		            var last = keys[keys.length-1];
		            var compjobList = $scope.job; 
		            $scope.companyjobLimitlength = compjobList.length;
		            
		            if(compjobList.length == 0){
		                    $scope.showCompanyNoFound = "No Jobs to display";
		            }
		            
		            
		    		$activityIndicator.stopAnimating();
		    		$rootScope.lastId = $scope.job[last].id;
		            $scope.job  = data.data;
		           
		        	var jobList = $scope.job;			
		    		$scope.jobListLength = jobList.length;
		    	

		    		var filteresJobList = $scope.filteredJobs;		
		    		$scope.filteredJobListLength = filteresJobList.length;
		    		if($scope.filteredJobListLength <= 0){
		    			
		    			$scope.filterState = false;
		    			$scope.filterStatusValue = 1;
		    			$scope.statusFilterChanged(1);
		    			
		    		}
		        });
		    	
		    }
	  
	  
	  
	  
	  $scope.getJobRoles=function(jobId){
		  $activityIndicator.startAnimating();
		  $scope.jobId=jobId;
		  document.getElementById('searchRole').value = '';
		  $scope.sessionId=localStorage.getItem('sessionId');
	        $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
		  services.getJob(jobId,$scope.sessionId,$scope.loginUserId).then(function(data){
				$scope.selectedJob = data.data;
				if($scope.selectedJob.roleId !=null){
					document.getElementById('searchRoles').value = $scope.selectedJob.masterJobRole.roleName;
				}else{
					document.getElementById('searchRoles').value = null;
				}
				  
			
			});
	
		  services.getJobRoles().then(function(data){
			  $activityIndicator.stopAnimating();
			  $scope.masterRoleList=data.data;
			  $scope.dirty = {};
			  var states = $scope.masterRoleList;
			  
			  function suggest_state(term) {
			    var q = term.toLowerCase().trim();
			    var results = [];

			    // Find first 10 states that start with `term`.
			    for (var i = 0; i < states.length && results.length < 10; i++) {
			      var masterRole = states[i];
			     
			      if (masterRole.roleName.toLowerCase().indexOf(q) === 0)
			        results.push({ label: masterRole.roleName, value:masterRole.roleName,id: masterRole.id});
			    }
			  
			    return results;
			  }
			 
			  $scope.autocomplete_options = {
			    suggest: suggest_state,
			    on_select: function (selected) {
			    	$scope.selectedRoleId=selected.id;
              }
			  };
		  });
		  
		 
	  };
    	
	  $scope.searchRole=function(){
		  if($scope.searchRoleText==null || $scope.searchRoleText=="undefined" || $scope.searchRoleText == ""){
			  $scope.searchRoleTextSend="empty";
		  }
		  else{
			  $scope.searchRoleTextSend=$scope.searchRoleText;
		  }
		  services.getRoles($scope.searchRoleTextSend).then(function(data){
			  $scope.masterRoleList=data.data;
		  });
	  };
	  
	  $scope.saveRole=function(){
		
		  services.saveRole($scope.selectedRoleId,$scope.jobId).then(function(data){
			  if (data.data.code == 200) {
					$("#jobRoleModal").modal("hide");
					 growl.success("Role assigned successfully");
		        }
				 else {
		        	growl.error("Something went wrong. Please try again.");
		        }
		        return;
		  });
	  };
	  
  	if($scope.filterState){
  		isActive = 1;
  	}
  	else {
  		isActive = 0;
  		
  	}
	
	if($routeParams.companyId){
		cmpId = $routeParams.companyId;
	 }
	
	 
	// to show more job with 5 each time
	 
	 if($rootScope.adminjobLimit){
		 $scope.limit = $rootScope.adminjobLimit;
		 
	 } else {
			 
		 $rootScope.adminjobLimit = limitStep;
		 $scope.limit = limitStep;
	 }
   	if($rootScope.filterStatusValue == '1' || $rootScope.filterStatusValue == true){
   		isActive = 1;
   		$scope.filterState = true;
   		
   		$scope.filterState = true;
			$scope.filterStatusValue = '1';
			
			$scope.filterStatusValue = '1';
			$scope.statusFilterChanged(1);
			
   	}else{
   		isActive = 0;
   	}
	// onclick of more button showing 5 more companies
		
		 $scope.moreJobs = function() {
			 $scope.searchTexts = $('#searchRole').val();
			 $activityIndicator.startAnimating();
		      	
		    	if($scope.filterState){
		    		isActive = 1;
		    	}
		    	else {
		    		isActive = 0;
		    		
		    	}
		    	
				services.getCompanyJobListByOrder($rootScope.lastId,cmpId,isActive,$scope.sessionId,$scope.loginUserId,$scope.searchTexts).then(function(data){
					
					$scope.showCompanyNoFound = "";
					if (data.data.length == 1){
						
						$activityIndicator.stopAnimating();
						 $scope.jobObject=data.data[0];
						 if($scope.jobObject.webserviceAPIResponseCode == UNAUTHORIZED){
							 $rootScope.job=null;
						 growl.error(UNAUTHORIZED_ERROR_MSG);
						 $('#logout').click();
						 return;
						
						 }
					 }
					$activityIndicator.stopAnimating();
	   				$rootScope.jobs = data.data;
	   				
	   			
			        for (index in $rootScope.jobs) {
	   					
	   					$scope.job.push($rootScope.jobs[index]);
	   					
	   				}
			        
			    	var compJobList = $scope.job;			
			        $scope.companyjobLimitlength = compJobList.length;
			        
			        if(compJobList.length == 0){
			        	$scope.showCompanyNoFound = "No Jobs to display";
			        }
			        
			        var keys = Object.keys($scope.job);
			        var last = keys[keys.length-1];
			        $rootScope.lastId = $scope.job[last].id;
	   			});
				
			    $scope.limit += limitStep;
			    $rootScope.companyJobLimit = $scope.limit;
			};
	
		
		// redirecting if user is null or session expired
	if(userName === null){
		if($routeParams.companyId){
		 localStorage.setItem('managePagePath', "company-jobs");
		 localStorage.setItem('jobUrl', $routeParams.jobUrl);
		 localStorage.setItem('companyId', $routeParams.companyId);
		 
		}
		$location.path('/login');
		return;
	}
	else {
		$scope.userName = userName;
		$scope.userId = parseInt(userId);
		$scope.userPermissionForManageUser = userPermissionForManageUser;
		$scope.welUserNameAdmin = welUserName;
	
	}
    jobUrl = localStorage.getItem('jobUrl');
	if($routeParams.jobUrl || (jobUrl != "null" && typeof jobUrl != "undefined" && jobUrl != null && jobUrl != "")){ 
		services.getJobByUrl(jobUrl,$scope.sessionId,$scope.loginUserId).then(function(data){
			if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
				
				growl.error(UNAUTHORIZED_ERROR_MSG);
				$('#logout').click();
				return;
			}

			$scope.jobDetail  = data.data;
			$scope.searchText = $scope.jobDetail.jobTitle;
			$scope.isShowMoreJobs = "yes";
		
		});
	
	}
	// fetching the jobs for that company
	if(isjobexpwebservice=="no"){
	$activityIndicator.startAnimating();
	
	$scope.sessionId=localStorage.getItem('sessionId');
	$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
	
	services.getCompanyjobList(cmpId,isActive,$scope.sessionId,$scope.loginUserId,$scope.searchTexts).then(function(data){
		
		if (data.data.length == 1){
			 $activityIndicator.stopAnimating();
			 $rootScope.jobObject=data.data[0];
			 if($rootScope.jobObject.webserviceAPIResponseCode == UNAUTHORIZED){
				 $rootScope.job=null;
			 growl.error(UNAUTHORIZED_ERROR_MSG);
			 $('#logout').click();
			 return;
			 }
		 }
		
		$rootScope.job = data.data;
			 
        for (index in $rootScope.jobs) {
				
        	$rootScope.job.push($rootScope.jobs[index]);
				
			}
        
        var keys = Object.keys($rootScope.job);
        var last = keys[keys.length-1];
        
        
        
        
        // console.log(JSON.stringify($rootScope.company));
        var compjobList = $rootScope.job;                        
        $scope.companyjobLimitlength = compjobList.length;
        
        if(compjobList.length == 0){
                $scope.showCompanyNoFound = "No Companies to display";
        }

		
	
		//$scope.statusFilterChanged(1);
		$activityIndicator.stopAnimating();
		$rootScope.lastId = $rootScope.job[last].id;
		
		// $scope.pagination = Pagination.getNew(PAGESIZE);
	
        $scope.job  = data.data;
       
    	var jobList = $scope.job;			
		$scope.jobListLength = jobList.length;
		
		if(typeof $rootScope.isCheckedOrNot ==='undefined' || $rootScope.isCheckedOrNot =='yes'){
			
			if( typeof $rootScope.isCheckedOrNot === 'undefined'){
				
				$scope.filterState = true;
				$scope.filterStatusValue = 1;
			}
			
			else if($rootScope.filterStatusValue == 1){
				$scope.filterState = true;
				
			}else if($rootScope.filterStatusValue == ""){
				$scope.filterState = false;	
				
			}
		}


		if($scope.filterState){
			$scope.filteredJobs = $filter('filter')($scope.job, {status:'1'});
		}
		else {
			
			$scope.filteredJobs = $scope.job;
		}

		var filteresJobList = $scope.filteredJobs;		
		$scope.filteredJobListLength = filteresJobList.length;
		if($scope.filteredJobListLength <= 0){
			
			$scope.filterState = false;
			$scope.filterStatusValue = 1;
			$scope.statusFilterChanged(1);
			
		}
    });
	}
	
	$scope.searchTexts = $('#searchRole').val();
	
	// search the job of a company
	 $scope.searchJob = function(){
		$scope.companyjobLimitlength =0;
		$rootScope.jobs = []; 
		$scope.job = [];
		$scope.limit = 5;
		 var isActive;
	      	
		 if($scope.filterState){
	    		isActive = 1;
	    	}
	    	else {
	    		isActive = 0;
	    		
	    	}
		 
		 $scope.searchTexts = $('#searchRole').val();
		 $scope.searchError = "no";
		  
			 $activityIndicator.startAnimating();
			 
			 $scope.sessionId=localStorage.getItem('sessionId');
			 $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
		
			 services.getCompanyjobList(cmpId,isActive,$scope.sessionId,$scope.loginUserId,$scope.searchTexts).then(function(data){
					
					if (data.data.length == 1){
						 $activityIndicator.stopAnimating();
						 $rootScope.jobObject=data.data[0];
						 if($rootScope.jobObject.webserviceAPIResponseCode == UNAUTHORIZED){
							 $rootScope.job=null;
						 growl.error(UNAUTHORIZED_ERROR_MSG);
						 $('#logout').click();
						 return;
						 }
					 }else if (data.data.length == 0){
						 $activityIndicator.stopAnimating();
						 
						 $rootScope.jobs = [];
						 $scope.job = [];
						 $scope.jobs = [];
			             $scope.showCompanyNoFound = "No Companies to display";
			           
					 }
					
					$rootScope.jobs = data.data;
					
					
						 
			        for (index in $rootScope.jobs) {
							
			        	$scope.job.push($rootScope.jobs[index]);
							
						}
			        
			        var keys = Object.keys($scope.job);
			        var last = keys[keys.length-1];
			        
			        
			        
			        
			        // console.log(JSON.stringify($rootScope.company));
			        var compjobList = $scope.job;   
			        
			        $scope.companyjobLimitlength = compjobList.length;


			        
			        if(compjobList.length == 0){
			        		$scope.job = [];
			                $scope.showCompanyNoFound = "No Jobs to display";
			                
			                $scope.job = [];
							$scope.jobs = [];
				             
			        }

					
				
					//$scope.statusFilterChanged(1);
					$activityIndicator.stopAnimating();
					$rootScope.lastId = $scope.job[last].id;
					
					// $scope.pagination = Pagination.getNew(PAGESIZE);
				
			        $scope.job  = data.data;
			       
			    	var jobList = $scope.job;			
					$scope.jobListLength = jobList.length;
					
					if(typeof $rootScope.isCheckedOrNot ==='undefined' || $rootScope.isCheckedOrNot =='yes'){
						
						if( typeof $rootScope.isCheckedOrNot === 'undefined'){
							
							$scope.filterState = true;
							$scope.filterStatusValue = 1;
						}
						
						else if($rootScope.filterStatusValue == 1){
							$scope.filterState = true;
							
						}else if($rootScope.filterStatusValue == ""){
							$scope.filterState = false;	
							
						}
					}


					if($scope.filterState){
						$scope.filteredJobs = $filter('filter')($scope.job, {status:'1'});
					}
					else {
						
						$scope.filteredJobs = $scope.job;
					}

					var filteresJobList = $scope.filteredJobs;		
					$scope.filteredJobListLength = filteresJobList.length;
					if($scope.filteredJobListLength <= 0){
						
						$scope.filterState = false;
						$scope.filterStatusValue = 1;
						$scope.statusFilterChanged(1);
						
					}
			    });
			 
		 
		 }
	 $scope.clearCurated = function(){
		 $scope.curatedby = null;
	 };


	// clearing the search field on click of x button
	$(".clearable").click(function(){
    	
    	$scope.searchText = null;
    	
    });
	 // sorting the data
    $scope.sort = {
            active: '',
            descending: undefined
        }     
         	
        $scope.changeSorting = function(column) {

            var sort = $scope.sort;
 
            if (sort.active == column) {
                sort.descending = !sort.descending;
				
            } else {
                sort.active = column;
                sort.descending = false;
            }
        };
        
       // getting the relevent icon on sorting
        $scope.getIcon = function(column) {
                     
            var sort = $scope.sort;
            
            if (sort.active == column) {
              return sort.descending
                ? 'glyphicon-chevron-up'
                : 'glyphicon-chevron-down';
            }
            
            return 'glyphicon-star';
        }
       
        
        // To change workflow name job wise
        $scope.getJobWorkFlowName = function(jobId) {
        	$scope.workflowJobId = jobId;
        	$rootScope.workflowJobId = jobId;
      		
            services.getJobExpression(jobId,$scope.sessionId,$scope.loginUserId).then(function(data){
            	
            	if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
            		
            		growl.error(UNAUTHORIZED_ERROR_MSG);
            		$('#logout').click();
            		return;
            	}
            	
            	var workflowName = data.data.workflowName;    	
            	
            	//To ge workflow names
            	services.getRecruiterWorkflowMaster($scope.sessionId,$scope.loginUserId).then(function(data){
            		
            		if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
            			growl.error(UNAUTHORIZED_ERROR_MSG);
            			$('#logout').click();
            			return;
            		}
            		
            		$scope.workflowNameList = data.data;
            		
            		var index = -1;

    				_.each($scope.workflowNameList, function(data, idx) { 
    				   if (_.isEqual(data.workflowName, workflowName)) {
    				      index = idx;
    				      return;
    				   }
    				});
    				 
    				$scope.jobWorkflowName = $scope.workflowNameList[index];
            	});
         });
      		
      	}
        
        $scope.toSaveModifiedJobWorkflowName = function(){
        	
        	if(!$scope.workflowJobId){
        		
        		$scope.workflowJobId = $rootScope.workflowJobId;
        	}
        	
        	$scope.workflowName = $scope.jobWorkflowName.workflowName;
        	
        	  services.saveModifiedJobWorkflowName($scope.workflowJobId,$scope.workflowName,growl,$scope.sessionId,$scope.loginUserId).then(function (response) {
   		    	 
    		    	if(response.data.webserviceAPIResponseCode == UNAUTHORIZED){
    		    		
    		    		growl.error(UNAUTHORIZED_ERROR_MSG);
    		    		$('#logout').click();
    		    		return;
    		    	}
    		    	
    		    	$activityIndicator.stopAnimating();
    				if (response.status == 200 && response.data.code == 200) {
    					$("#workflowModel").modal("hide");
    					 growl.success("Workflow name changed successfully");
    		        }
    				 else {
    		        	growl.error("Something went wrong. Please try again.");
    		        }
    		        return;
    				 
    			});	
        	
        }
        
        // opening the job expression popup
        $scope.jobexpPopup = function(job_id) {
   		 localStorage.setItem('jobId', job_id);		
   		 isjobexpwebservice ="yes";
  	 
   		 ngDialog.open({
   			    template: 'jobexpPopup',
   			    showClose: false,
   		        closeByEscape: true
   			});		 		 
   	 }
  
     $scope.filterNoOfApplication = function(id,status,userId) {
    	
	        localStorage.setItem('userId', userId);
 	        localStorage.setItem('jobId', id);
 			$rootScope.appStatus = status;
 			localStorage.setItem('appStatus',$rootScope.appStatus);
			$location.path('/job-applications');
	  }
        
      // closing the job expression popup
        $scope.closejobexp = function() {
    	   isjobexpwebservice="no";
  		  ngDialog.close();
  		  
  	  }
        
        $scope.backtoCompanyList = function() {
        	$("body,html").animate({scrollTop: companyListPaaageYaxisOffeset}, "slow");
        	
   		}
        $scope.JobData={};
        $scope.getJobCuration = function(jobId){
        	  $scope.JobFields={};
    		$scope.curatedJobId = jobId;
    		$rootScope.curatedJobId = jobId;
    		$activityIndicator.startAnimating();
    			
    		//To get the master fields and its values for selection
        	services.getJob(jobId,$scope.sessionId,$scope.loginUserId).then(function(data){
        		$scope.JobData = data.data;
        	});
        	
        	services.getMasterFieldsForEntity($scope.sessionId,"Job").then(function(data){
        		
        		$scope.dataList=data.data.editableFields;
        		$timeout(function() {$.each($scope.dataList, function(key, value) {
        			$scope.lowerCaseKey=key.replace(/ /g, '');
        			$scope.lowerCaseKey=$scope.lowerCaseKey.toString().charAt(0).toLowerCase() + $scope.lowerCaseKey.slice(1);
        			  $scope.JobFields[key]=$scope.JobData[$scope.lowerCaseKey];
        		});}, 1000);
        		
        		
        		
        	});
        	
        	//values for selection
        	services.getMasterData("masterData").then(function(data){
        		   $scope.dataValueList = data.data;
        		 //  $('#jobCuration').modal('show') 
        	});
        	
    			//	});
    		services.getJobExpression(jobId,$scope.sessionId,$scope.loginUserId).then(function(data){
        	
        	if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
        		
        		growl.error(UNAUTHORIZED_ERROR_MSG);
        		$('#logout').click();
        		return;
        	}
        	if(data.data.isCurated == 0) {
          		 $scope.isCurated = false;
          		$scope.curatedby = null;
           	} else{
          		 $scope.isCurated = true;
          		 $scope.curatedby = data.data.curatedBy;     		
           	}    		
		
     });
    		
    		$activityIndicator.stopAnimating();
    		
    };
    $scope.getNotes = function(jobId){
    	$scope.noteJobId = jobId;
    	$rootScope.noteJobId = jobId;
    	services.getJobExpression(jobId,$scope.sessionId,$scope.loginUserId).then(function(data){
        	
        	if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
        		
        		growl.error(UNAUTHORIZED_ERROR_MSG);
        		$('#logout').click();
        		return;
        	}

        	if(data.data.notes != "" || data.data.notes !=null){
       		 $scope.notes = data.data.notes;
        	}
        	else{
       		$scope.notes = "";
        	}  		
		
     });
    }
       // fetching the job expression if already entered
        if(isjobexpwebservice=="yes"){
        	
        var id = localStorage.getItem('jobId');
        
        $scope.sessionId=localStorage.getItem('sessionId');
        $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
        
        services.getJobExpression(id,$scope.sessionId,$scope.loginUserId).then(function(data){
        	
        	if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
        		
        		growl.error(UNAUTHORIZED_ERROR_MSG);
        		$('#logout').click();
        		return;
        	}
        	
        	if(data.data.scoreExpression=="null"){
        		$scope.jobexp="";		
        	}else{
        		$scope.jobexp = data.data.scoreExpression;    		
        	}
        	if(data.data.filterExpression=="null"){
        		$scope.filterexp="";
        	}else{
        		$scope.filterexp=data.data.filterExpression; 
        	}
		
        });
     }
        
       // saving the job expression popup
        $scope.saveJobexp = function() {
        	var jobId = localStorage.getItem('jobId'); 
  		   			  			   	  		  
    		  var jobExp = null;
    		  var filterexp = null;
    		  
    		  
    		  if(typeof $scope.jobexp =="undefined" || $scope.jobexp =="undefined"){
    			 
    			  jobExp=null;
    		  }else{
    			  jobExp = $scope.jobexp;
    		  }
    		  
    		  if(typeof $scope.filterexp =="undefined" || $scope.filterexp =="undefined"){
    			
    			   filterexp=null;
    		  }else{
    			   filterexp = $scope.filterexp;
    		  }
    		  
    		  
    		  $activityIndicator.startAnimating();
    		
    		
    		  $scope.sessionId=localStorage.getItem('sessionId');
    		  $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
    			 
  		     services.setJobExpression(jobId,jobExp,filterexp,growl,$scope.sessionId,$scope.loginUserId).then(function (response) {
  		    	$activityIndicator.stopAnimating();
  		    	if(response.data.webserviceAPIResponseCode == UNAUTHORIZED){
  		    		
  		    		growl.error(UNAUTHORIZED_ERROR_MSG);
  		    		$('#logout').click();
  		    		return;
  		    	}
		    	
  	  				if (response.status == 200 && response.data.code == 200) {
  	  					 growl.success("Job Expression added successfully");
  	  		        }
  	  				 else {
  	  		        	growl.error("Something went wrong. Please try again.");
  	  		        	
  	  		        }
  	  			return;
  				
  			});	
  		     
  		   isjobexpwebservice="no";
  		   ngDialog.close();
  		  	
  	  }
        $scope.saveJobCurated = function () {
      		
      		var curatedBy = null;
    		var notes = null;
    		var isCurated = 0;
    		if(!$scope.curatedJobId){
    			$scope.curatedJobId = $rootScope.curatedJobId;
    		}
    		if($scope.isCurated == false) {
    			  curatedBy = null;
    		  } else {
    			  isCurated = 1;
    			  curatedBy = $scope.curatedby;
    		  }
    		
    		 $activityIndicator.startAnimating();
    		 $scope.sessionId=localStorage.getItem('sessionId');
    		 $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
    		 $scope.jobResult=true;
    		 services.setJobCurated($scope.curatedJobId,isCurated,curatedBy,$scope.loginUserId).then(function(response){
     		    	$activityIndicator.stopAnimating();
     				if (response.status == 200 && response.data.code == 200) {
     					$scope.jobResult=true;
     		        }
     				 else {
     					$scope.jobResult=false;
     		        }
     				
    			});
    		 if($scope.jobResult){
    		 services.saveJobOrCompanyMasterDetails("Job",$scope.curatedJobId,$scope.JobFields).then(function(data){
    			 if (data.data.code == 200) {
  					
  					 growl.success("Job curated successfully");
  					$scope.JobFields={};
  		        }
  				 else {
  		        	growl.error("Something went wrong. Please try again.");
  		        	
  		        }
    		 });
    		 }
    		 
    		 $('#jobCuration').modal('toggle');
      	  };
      	  $scope.saveNotes = function(){
      		  
      		var notes = null;
      		if(!$scope.noteJobId){
      			$scope.noteJobId = $rootScope.noteJobId;
      		}
      		if($scope.notes == null) {
    			  notes = "";
    		  } else {
    		  notes = $scope.notes;
    		  }
    		  $activityIndicator.startAnimating();
    		
    		
    		  $scope.sessionId=localStorage.getItem('sessionId');
    		  $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
    		  services.setNotes($scope.noteJobId,notes,$scope.sessionId,$scope.loginUserId).then(function(response){
    			  $activityIndicator.stopAnimating();
    				if (response.status == 200 && response.data.code == 200) {
    					 growl.success("Notes added successfully");
    		        }
    				 else {
    		        	growl.error("Something went wrong. Please try again.");
    		        	
    		        }			  
    		  });
    		  $('#notes').modal('toggle');
      	  };  
     
      	  
      	  $scope.saveIndicateSalary = function(){
      		$activityIndicator.startAnimating();  
        	
        	
        	$scope.jobObject.minJobIndicateSalary = $scope.jobObject.minJobIndicateSalary;
        	$scope.jobObject.maxJobIndicateSalary = $scope.jobObject.maxJobIndicateSalary;
        	
        	  services.saveIndicateSalary($scope.jobObject,$scope.sessionId,$scope.loginUserId).then(function(response){
        		 
    			  $activityIndicator.stopAnimating();
    				if (response.status == 200 && response.data.code == 200) {
    					$('#salary').modal('hide');
    					 growl.success("Salary added successfully");
    		        }
    				 else {
    		        	growl.error("Something went wrong. Please try again.");
    		        	
    		        }			  
    		  });
      		
        	  };  
        	  
        	  $scope.validatesalary = function(jobObject1,jobObject2){
        		
  				 $scope.salaryonlynumber =null;
  				
  				 if ( jobObject1 !=null  && !$.isNumeric(jobObject1) && jobObject1 !="null" && jobObject1 !== "") {
  					
  					 	$scope.salaryonlynumber ="Please enter only numbers";

  				 } 
  				 if(jobObject2 !=null && jobObject2 !="null" && jobObject2 !== "" && !$.isNumeric(jobObject2)){
  					
  					$scope.salaryonlynumber ="Please enter only numbers";
  				 }
  			 }
        	  
        	  $scope.getJobObject =function(data){
          		  
              	$scope.jobObject = data;
              	
              
            		
              	  };  
              	 
        	  
        	  
      	  
      	//To get the job distribution
      	  $scope.getJobDistribution=function(){
      		var jobId = localStorage.getItem('jobId'); 
      		service.getJobDistribution(jobId).then(function(response){
      		});
      			
      		
      	  }
      	 $scope.userNameList = {};
         services.getAllUsersName().then(function (response) {
         		$scope.userNameList = response.data;
         });
});*/


ccubeApp.controller('adminJobApplicationCtrl', function ($scope,ngDialog,$filter, services,localStorageService,$location,growl,$window,$rootScope,Pagination,PAGESIZE,prompt,$activityIndicator,$sce,$timeout) {
	pageName = "";
	var userName = localStorage.getItem('userNameAdmin');
	var companyId = localStorage.getItem('companyId');	
	var userId = localStorage.getItem('userId');
	var welUserName = localStorage.getItem('welUserNameAdmin');
	$scope.welUserNameAdmin=welUserName;
	var jobId = localStorage.getItem('jobId');
	 $rootScope.class1 = "push-class-no";
	 $rootScope.class2 = "push-class-no";
	 $rootScope.class3 = "push-class-no";
	 $rootScope.class4 = "push-class-no";
	$scope.parseInt = parseInt;
	$rootScope.adminjobAppLimit =5;
	$rootScope.appFilter5 = null;
	$rootScope.appFilter1 = null;
	$rootScope.jobApplicationWithResume = null;
    $rootScope.jobApplicationWithoutResume = null;
    $rootScope.AppliesFilterStatusValue = null;
	
	$scope.sessionId=localStorage.getItem('sessionId');
	$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
	 
	var limitStep = 5;
	 if($rootScope.adminjobAppLimit){
		 $scope.limit = $rootScope.adminjobAppLimit;
		 
	 } else {
			 
		 $rootScope.adminjobAppLimit = limitStep;
		 $scope.limit = limitStep;
	 }
	
	// onclick of more button showing 5 more companies
	 $scope.moreApplies = function() {
		    $scope.limit += limitStep;
		    
		    $rootScope.adminjobAppLimit = $scope.limit;
		};
	
	if(jobId){
		
		// To get job
		services.getJob(jobId,$scope.sessionId,$scope.loginUserId).then(function(data){
			
			if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
				
				growl.error(UNAUTHORIZED_ERROR_MSG);
				$('#logout').click();
				return;
			}
			
			$rootScope.selectedJob = data.data;
			
			$scope.companyName = data.data.companyName;
		
	    });
		var status =localStorage.getItem('appStatus');
		// var status = $rootScope.appStatus;
		services.getJobListByJobId(jobId, userId, status, companyId,$scope.sessionId,$scope.loginUserId).then(function(data){
			
			if (data.data.length == 1){
				 $activityIndicator.stopAnimating();
				 $scope.jobApplicationObject=data.data[0];
				 if($scope.jobApplicationObject.webserviceAPIResponseCode == UNAUTHORIZED){
					 $scope.jobApplication=null;
				 growl.error(UNAUTHORIZED_ERROR_MSG);
				 $('#logout').click();
				 return;
				 }
			 }

	    		$scope.jobApplicationAll = data.data;
		        $rootScope.jobApplicationAll = $scope.jobApplicationAll;
			    $scope.jobApplication = $scope.jobApplicationAll;
	    		
	    		$activityIndicator.stopAnimating();
	    						
	    		var jobApplicationList = $scope.jobApplication;
	    		var jobAppList = $scope.jobApplication;			
	    		$scope.jobAppbListLength = jobAppList.length;
	    						
	    		if(!$scope.jobApplication || $scope.jobApplication == ""){
	    				$scope.isAppEmpty = true;
	    				$scope.noAppliesMsg = "No applications to display";
	    		} else {
	    				$scope.isAppEmpty = false;
	    		}
	    					    
	    		$scope.totalRecords = $scope.jobApplication.length;
	    		 $scope.filterApplicationByStatus($rootScope.appStatus);
	    	});
		} 
	
	
  $scope.appliesFilterChanged = function(){
		  
		  $('.dropdown-menu input, .dropdown-menu label').click(function(e) {
		        e.stopPropagation();
		    });
		  
		   if($scope.appliesFilterStateWithResume == true && ($scope.appliesFilterStateWithoutResume == null || $scope.appliesFilterStateWithoutResume == false)){
			   	$scope.jobApplication = $filter('filter')($rootScope.jobApplicationAll, {isResumePresent:1});
			   	$rootScope.jobApplicationWithResume = $scope.jobApplication;
			    $scope.AppliesFilterStatusValue = 1;
	    		$rootScope.AppliesFilterStatusValue = 1;
	    	
		  }else if(($scope.appliesFilterStateWithResume == null || $scope.appliesFilterStateWithResume == false) && $scope.appliesFilterStateWithoutResume == true){
			    $scope.jobApplication = $filter('filter')($rootScope.jobApplicationAll, {isResumePresent:0});
	    		$rootScope.jobApplicationWithoutResume = $scope.jobApplication;
		    	$scope.AppliesFilterStatusValue = 0;
		    	$rootScope.AppliesFilterStatusValue = 0;
		    	
		  }else {
			  	$scope.jobApplication = $rootScope.jobApplicationAll;
			  	$scope.AppliesFilterStatusValue = null;
			  	$rootScope.AppliesFilterStatusValue = null;
		  }
		     	$scope.getstatus();
		     	$scope.getsource();
		     	$scope.getApplicantName();
		     	$scope.getAppliedDate();
}
	
	
	
	$rootScope.isDataFilterRemoved = "no";
	$scope.filterApplicationByStatus = function(status,filterStatus) {
		$scope.filterReco=""; 
		$scope.filterStatus="";
		if(status == '-'){
			if($rootScope.class1 == "push-class-no"){
				$rootScope.class1 = "push-class";
				$rootScope.class2 = "push-class-no";
				$rootScope.class3 = "push-class-no";
				$rootScope.class4 = "push-class-no";
			} else {
				
				if($rootScope.goBack == "Yes"){
					$rootScope.class1 = "push-class";
				} else {
					$rootScope.class1 = "push-class-no";
				}
			}
		} else if(status == 'A'){
			if(filterStatus != 'A' && filterStatus != 'I' && filterStatus != 'J' && filterStatus != 'C' &&  filterStatus != 'E' && filterStatus != 'F'){
				$rootScope.appFilterClass1 = "is-filtered-no";
				$rootScope.isDataFilterRemoved = "yes";
			
			}else{
				$rootScope.appFilterClass1 = "is-filtered";
				$rootScope.isDataFilterRemoved = "no";
			}
			if($rootScope.class2 == "push-class-no"){
				$rootScope.class1 = "push-class-no";
				$rootScope.class2 = "push-class";
			} else {
				
				if($rootScope.goBack == "Yes"){
					$rootScope.class2 = "push-class";
				} else {
					$rootScope.class2 = "push-class-no";
				}
			}
			 /*
				 * $rootScope.class3 = "push-class-no"; $rootScope.class4 =
				 * "push-class-no";
				 */
		}else if(status == 'N'){   
			if(filterStatus != 'N'){
				$rootScope.appFilterClass1 = "is-filtered-no";
				$rootScope.isDataFilterRemoved = "yes";
			}else{
				$rootScope.appFilterClass1 = "is-filtered";
				$rootScope.isDataFilterRemoved = "no";
			}
			if($rootScope.class3 == "push-class-no"){
				 $rootScope.class1 = "push-class-no";
				 /* $rootScope.class2 = "push-class-no"; */
				 $rootScope.class3 = "push-class";
				 /* $rootScope.class4 = "push-class-no"; */
			} else {
				
				if($rootScope.goBack == "Yes"){
					$rootScope.class3 = "push-class";
				} else {
					$rootScope.class3 = "push-class-no";
				}
			}
			 
		}else if(status == 'G'){
			if(filterStatus != 'G' && filterStatus != 'S' && filterStatus != 'T' && filterStatus != 'U'){
				$rootScope.appFilterClass1 = "is-filtered-no";
				$rootScope.isDataFilterRemoved = "yes";
			}else{
				$rootScope.appFilterClass1 = "is-filtered";
				$rootScope.isDataFilterRemoved = "no";
			}
			if($rootScope.class4 == "push-class-no"){
				$rootScope.class1 = "push-class-no";
				 /*
					 * $rootScope.class2 = "push-class-no"; $rootScope.class3 =
					 * "push-class-no";
					 */
				 $rootScope.class4 = "push-class";
			} else {
				
				if($rootScope.goBack == "Yes"){
					$rootScope.class4 = "push-class";
				} else {
					$rootScope.class4 = "push-class-no";
				}
			}
		}
		
		// Approved & Rejected & Pending pressed - Change to All
		if($rootScope.class2 == "push-class" && $rootScope.class3 == "push-class" && $rootScope.class4 == "push-class"){
			$rootScope.class1 = "push-class";
			$rootScope.class2 = "push-class-no";
			$rootScope.class3 = "push-class-no";
			$rootScope.class4 = "push-class-no";
			status = '-';
			if(filterStatus != ''){
				$rootScope.appFilterClass1 = "is-filtered";
				$rootScope.isDataFilterRemoved = "no";
			}
		} else if($rootScope.class2 == "push-class" && $rootScope.class3 == "push-class"){
			// Approved & Joined pressed - status X
			status = 'B';
			if(filterStatus != 'N' && filterStatus != 'A' && filterStatus != 'I' && filterStatus != 'J' && filterStatus != 'C' &&  filterStatus != 'E' && filterStatus != 'F'){
				$rootScope.appFilterClass1 = "is-filtered-no";
				$rootScope.isDataFilterRemoved = "yes";
			
			}else{
				$rootScope.appFilterClass1 = "is-filtered";
				$rootScope.isDataFilterRemoved = "no";
			}
		} else if($rootScope.class2 == "push-class" && $rootScope.class4 == "push-class"){
			// Approved & Offers pressed - status Y
			status = 'C';
			if( filterStatus == 'N' || filterStatus == ''){
				$rootScope.appFilterClass1 = "is-filtered-no";
				$rootScope.isDataFilterRemoved = "yes";
			
			}else{
				$rootScope.appFilterClass1 = "is-filtered";
				$rootScope.isDataFilterRemoved = "no";
			}
		} else if($rootScope.class3 == "push-class" && $rootScope.class4 == "push-class"){
			// Joins & Offers pressed - status Z
			status = 'D';
			if(filterStatus != 'N' && filterStatus != 'G' && filterStatus != 'S' && filterStatus != 'T' && filterStatus != 'U'){
				$rootScope.appFilterClass1 = "is-filtered-no";
				$rootScope.isDataFilterRemoved = "yes";
			}else{
				$rootScope.appFilterClass1 = "is-filtered";
				$rootScope.isDataFilterRemoved = "no";
			}
		} else if($rootScope.class2 == "push-class"){
			// Approved pressed - status A
			status = 'A';
		} else if($rootScope.class3 == "push-class" ){
			// Joins pressed - status N
			status = 'N';
		} else if($rootScope.class4 == "push-class" ){
			// Offers pressed - status G
			status = 'G';
		} else {
			status = '-';
		}
		
		
	
		if(jobId  == null){
			jobId = $rootScope.selectedJobId;
		}
		
		/*$scope.sessionId=localStorage.getItem('sessionId');
		$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
		
		 services.getJobListByJobId(jobId, userId, status, companyId,$scope.sessionId,$scope.loginUserId).then(function(data){
			 
			 if (data.data.length == 1){
				 $activityIndicator.stopAnimating();
				 $scope.jobApplicationObject=data.data[0];
				 if($scope.jobApplicationObject.webserviceAPIResponseCode == UNAUTHORIZED){
					 $scope.jobApplication=null;
				 growl.error(UNAUTHORIZED_ERROR_MSG);
				 $('#logout').click();
				 return;
				 }
			 }
			 $scope.filterName="";
				
	    		$scope.jobApplication = data.data;
	    		
	    		$activityIndicator.stopAnimating();
	    						
	    		var jobApplicationList = $scope.jobApplication;
	    		var jobAppList = $scope.jobApplication;			
	    		$scope.jobAppbListLength = jobAppList.length;
	    						
	    		if(!$scope.jobApplication || $scope.jobApplication == ""){
	    				$scope.isAppEmpty = true;
	    				$scope.noAppliesMsg = "No applications to display";
	    		} else {
	    				$scope.isAppEmpty = false;
	    		}
	    					    
	    		$scope.totalRecords = $scope.jobApplication.length;
	    		
	    		$scope.getstatus();

	    	});*/
		if(jobId){
		 $rootScope.appStatus = status;
		 $scope.sessionId=localStorage.getItem('sessionId');
			$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
			
			 services.getJobListByJobId(jobId, userId, status, companyId,$scope.sessionId,$scope.loginUserId).then(function(data){
				 
				 if (data.data.length == 1){
					 $activityIndicator.stopAnimating();
					 $scope.jobApplicationObject=data.data[0];
					 if($scope.jobApplicationObject.webserviceAPIResponseCode == UNAUTHORIZED){
						 $scope.jobApplication=null;
					 growl.error(UNAUTHORIZED_ERROR_MSG);
					 $('#logout').click();
					 return;
					 }
				 }
				 $scope.filterName="";
					
		    		
		    		$scope.jobApplicationAll = data.data;
			        $rootScope.jobApplicationAll = $scope.jobApplicationAll;
				    $scope.jobApplication = $scope.jobApplicationAll;
		    		
		    		$activityIndicator.stopAnimating();
		    					
		    		var jobApplicationList = $scope.jobApplication;
		    		var jobAppList = $scope.jobApplication;			
		    		$scope.jobAppbListLength = jobAppList.length;
		    						
		    		if(!$scope.jobApplication || $scope.jobApplication == ""){
		    				$scope.isAppEmpty = true;
		    				$scope.noAppliesMsg = "No applications to display";
		    		} else {
		    				$scope.isAppEmpty = false;
		    		}
		    					    
		    		$scope.totalRecords = $scope.jobApplication.length;
		    		
		    		$scope.getstatus();
		    		$scope.getApplicantName();

		    	});
		 
		
		} 
		
		$rootScope.goBack = "No";
		
	}
	
/*
 * $scope.filterApplicationByStatus = function(status) { $scope.filterReco="";
 * $scope.filterStatus=""; if(status == '-'){ if($rootScope.class1 ==
 * "push-class-no"){ $rootScope.class1 = "push-class"; $rootScope.class2 =
 * "push-class-no"; $rootScope.class3 = "push-class-no"; $rootScope.class4 =
 * "push-class-no"; } else {
 * 
 * if($rootScope.goBack == "Yes"){ $rootScope.class1 = "push-class"; } else {
 * $rootScope.class1 = "push-class-no"; } } } else if(status == 'A'){
 * if($rootScope.class2 == "push-class-no"){ $rootScope.class1 =
 * "push-class-no"; $rootScope.class2 = "push-class"; } else {
 * 
 * if($rootScope.goBack == "Yes"){ $rootScope.class2 = "push-class"; } else {
 * $rootScope.class2 = "push-class-no"; } } $rootScope.class3 = "push-class-no";
 * $rootScope.class4 = "push-class-no"; }else if(status == 'R'){
 * if($rootScope.class3 == "push-class-no"){ $rootScope.class1 =
 * "push-class-no"; $rootScope.class2 = "push-class-no"; $rootScope.class3 =
 * "push-class"; $rootScope.class4 = "push-class-no"; } else {
 * 
 * if($rootScope.goBack == "Yes"){ $rootScope.class3 = "push-class"; } else {
 * $rootScope.class3 = "push-class-no"; } }
 * 
 * }else if(status == 'P'){
 * 
 * if($rootScope.class4 == "push-class-no"){ $rootScope.class1 =
 * "push-class-no"; $rootScope.class2 = "push-class-no"; $rootScope.class3 =
 * "push-class-no"; $rootScope.class4 = "push-class"; } else {
 * 
 * if($rootScope.goBack == "Yes"){ $rootScope.class4 = "push-class"; } else {
 * $rootScope.class4 = "push-class-no"; } } }
 * 
 * //Approved & Rejected & Pending pressed - Change to All if($rootScope.class2 ==
 * "push-class" && $rootScope.class3 == "push-class" && $rootScope.class4 ==
 * "push-class"){ $rootScope.class1 = "push-class"; $rootScope.class2 =
 * "push-class-no"; $rootScope.class3 = "push-class-no"; $rootScope.class4 =
 * "push-class-no"; status = '-'; } else if($rootScope.class2 == "push-class" &&
 * $rootScope.class3 == "push-class"){ // Approved & Rejected pressed - status X
 * status = 'X'; } else if($rootScope.class2 == "push-class" &&
 * $rootScope.class4 == "push-class"){ // Approved & Pending pressed - status Y
 * status = 'Y'; } else if($rootScope.class3 == "push-class" &&
 * $rootScope.class4 == "push-class"){ // Rejected & Pending pressed - status Z
 * status = 'Z'; } else if($rootScope.class2 == "push-class"){ // Approved
 * pressed - status A status = 'A'; } else if($rootScope.class3 == "push-class" ){ //
 * Rejected pressed - status R status = 'R'; } else if($rootScope.class4 ==
 * "push-class" ){ // Pending pressed - status P status = 'P'; } else { status =
 * '-'; }
 * 
 * if(jobId == null){ jobId = $rootScope.selectedJobId; }
 * 
 * $scope.sessionId=localStorage.getItem('sessionId');
 * $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
 * 
 * services.getJobListByJobId(jobId, userId, status,
 * companyId,$scope.sessionId,$scope.loginUserId).then(function(data){
 * 
 * if (data.data.length == 1){ $activityIndicator.stopAnimating();
 * $scope.jobApplicationObject=data.data[0];
 * if($scope.jobApplicationObject.webserviceAPIResponseCode == UNAUTHORIZED){
 * $scope.jobApplication=null; growl.error(UNAUTHORIZED_ERROR_MSG);
 * $('#logout').click(); return; } }
 * 
 * 
 * $scope.jobApplication = data.data;
 * 
 * $activityIndicator.stopAnimating();
 * 
 * var jobApplicationList = $scope.jobApplication; var jobAppList =
 * $scope.jobApplication; $scope.jobAppbListLength = jobAppList.length;
 * 
 * if(!$scope.jobApplication || $scope.jobApplication == ""){ $scope.isAppEmpty =
 * true; $scope.noAppliesMsg = "No applications to display"; } else {
 * $scope.isAppEmpty = false; }
 * 
 * $scope.totalRecords = $scope.jobApplication.length;
 * 
 * }); if(jobId){ $rootScope.appStatus = status;
 * 
 * $scope.getJobListByJobId(jobId, userId, status,companyId);
 * 
 *  }
 * 
 * $rootScope.goBack = "No";
 *  }
 */
	$('#viewResumeModal').on('hidden.bs.modal', function () {	
		  document.getElementById('resumeFrame').src = "";
	});
	
	$scope.viewDownloadResume = function(applicationId,fileName,jobsource) {
		
		$scope.sessionId=localStorage.getItem('sessionId');
		 $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
				
		services.viewDownloadResume(applicationId,fileName,$scope.sessionId,$scope.loginUserId).then(function(data){
			
			if(data.data == '' || data.data == null){
				
				// growl.error(UNAUTHORIZED_ERROR_MSG);
				
					return;
			}
			
			
			var hostName = $location.host();
			var fileUrl;
			var FileNameToCheck = applicationId+"<->"+fileName;
                   	var fileNameExt = null;
                               $.ajax({
                               url:RESUMEUPLAODPATH + FileNameToCheck,
                               
                               error: function()
                              
                               {
                                  fileNameExt = applicationId+"-"+fileName;
                                  fileNameExt = encodeURIComponent(fileNameExt);
                                          fileUrl = RESUMEUPLAODPATH + fileNameExt; // application
                                          $sce.trustAsResourceUrl(fileUrl);
                                          document.getElementById('resumeFrame').src = 'https://docs.google.com/gview?url='+fileUrl+'&embedded=true';
                                          $('#viewResumeModal').modal('show');
                               },
                               success: function()
                               {
                                 fileNameExt = applicationId+"<->"+fileName;
                                 fileNameExt = encodeURIComponent(fileNameExt);
                                         fileUrl = RESUMEUPLAODPATH + fileNameExt; // application
                                                                                                                               // resumes
                                         $sce.trustAsResourceUrl(fileUrl);
                                         document.getElementById('resumeFrame').src = 'https://docs.google.com/gview?url='+fileUrl+'&embedded=true';
                                         $('#viewResumeModal').modal('show');
                               }
                           });


		});
	}
	
	$scope.downloadResume = function(id,fileName) {
			
		$scope.sessionId=localStorage.getItem('sessionId');
		 $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
		 
		services.downloadResume(id,fileName,$scope.sessionId,$scope.loginUserId).then(function(data){
			if(data.data == '' || data.data == null){
				
				// growl.error(UNAUTHORIZED_ERROR_MSG);
				
					return;
			}
	    });
			
	}
	
	// opening the admin score popup
    $scope.manageScorePopup = function(data) {
	
    	$rootScope.jobApp = data;
    	
		 ngDialog.open({
			    template: 'manageScorePopup',
			    showClose: false,
		        closeByEscape: true
		});		 		 
	 }
	
    // closing the admin score popup
    $scope.closeAdminScore = function() {
	   
		  ngDialog.close();
		  
	}
    
    $scope.statusOptions = [ {id: null, status: '-- Select --'},
                             {id: 'A', status: 'Shortlist'},
                             {id: 'R', status: 'Reject'}
                           ];
    
    $scope.saveAdminScore = function(jobApp) {
    	
    	if(($scope.adminReco == null || $scope.adminReco == "" ) && ($scope.adminExp == null || $scope.adminExp == "" || $scope.adminExp == "null")) { 
    		
    		$scope.errorReco = 'Yes';
    		
    	} else {
    	
    		$scope.errorReco = 'no';
    		
    	    jobApp.adminRecommendation = $scope.adminReco;
    	    jobApp.adminExperience = $scope.adminExp;
    	
            var id = jobApp.id;
         
            var adminExperience = $scope.adminExp;
         
            var adminRecommendation = jobApp.adminRecommendation;
            
            $scope.sessionId=localStorage.getItem('sessionId');
            $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
    	
    	    services.saveAdminScores(id,adminExperience,adminRecommendation,growl,$scope.sessionId,$scope.loginUserId,$scope.category,$scope.domain,$scope.expLevel).then(function (response) {
    		 
    	    $activityIndicator.stopAnimating();
    	    
    	    if(response.data.webserviceAPIResponseCode == UNAUTHORIZED){
    	    	
    	    	growl.error(UNAUTHORIZED_ERROR_MSG);
    	    	$('#logout').click();
    	    	return;
    	    }
    		 
		     if (response.status == 200) {
			   growl.success("Saved Successfully");	 
             } else {
        	   growl.error("Something went wrong. Please try again.");
             }
		
	        });	
    	
	       ngDialog.close();
    		
    	}
    }
    
    var filteredJobApplications=[];
    $scope.selectedAllXyz = true;
    $scope.statusArrayTemp=[];
    $scope.statusArray = [];
    $scope.getstatus = function () {
 	   $scope.statusArray = [];
 	   $scope.statusArrayTemp=[];
 	   
 	  if($scope.appliesFilterState){
		    $scope.statusArrayTemp=[];
		    $scope.statusArray = [];
		    $scope.jobApplication = $rootScope.jobApplicationWithResume;
		}else{
			$scope.jobApplication = $rootScope.jobApplicationAll;
		}
 	  
 	   if($scope.jobApplication.length > 0){
 			for(var i= 0;i<=$scope.jobApplication.length;i++){
 				if($scope.jobApplication[i] != null && $scope.jobApplication[i] != "undefined" && $scope.jobApplication[i] != "null" && $scope.jobApplication[i] != "" && typeof $scope.jobApplication[i] != undefined){ 
 				
 				if($scope.jobApplication[i].currentStatus != null && $scope.jobApplication[i].currentStatus != "undefined" && $scope.jobApplication[i].currentStatus != "null" && $scope.jobApplication[i].currentStatus != "" && typeof $scope.jobApplication[i].currentStatus != undefined){
 					
 					if($scope.jobApplication[i].currentStatus =="Pending" && $scope.jobApplication[i].finalRecommendation =="Shortlist" ){
 						
 						$scope.statusArrayTemp.push({'name' : "Reco Shortlist",'on' : true});
 						
 					}else if($scope.jobApplication[i].currentStatus =="Pending" && $scope.jobApplication[i].finalRecommendation == "Reject"){
 						
 						$scope.statusArrayTemp.push({'name' :"Reco Reject",'on' : true});
 						
 					}else{
 							$scope.statusArrayTemp.push({'name' : $scope.jobApplication[i].currentStatus,'on' : true});
 					}
 				}
 				}
 			}
 			
 			}
 	   
 	   var sl = $scope.statusArrayTemp;
 	   var out = [];

 	   for (var i = 0, l = sl.length; i < l; i++) {
 	       var unique = true;
 	       for (var j = 0, k = out.length; j < k; j++) {
 	           if (sl[i].name === out[j].name) {
 	               unique = false;
 	           }
 	       }
 	       if (unique) {
 	           out.push(sl[i]);
 	       }
 	   }
 	   
 	   $scope.statusArray = out; 

    }
    	
    	
    	   	$scope.filterByStatus = function(jobApplication) {
         for(status1 in $scope.statusArray){
             var r = $scope.statusArray[status1];
             if(selectedStatus.indexOf(r) == -1) {
        		 	selectedStatus.push(r);
        		 ab= selectedStatus.length;
             }
         
             if(!r.on){
             	$scope.selectedAllXyz = false;
             } 
          
             if(jobApplication.currentStatus != null && jobApplication.currentStatus != 'null' && jobApplication.currentStatus != 'empty' && jobApplication.currentStatus != ""){
          
             	if(r.on && jobApplication.currentStatus.indexOf(r.name) > -1){
             		return true;   
             	} else if(r.on && jobApplication.currentStatus == "Pending" && jobApplication.finalRecommendation == "Reject"){
             		if(r.name ==  "Reco Reject"){
                 		if(r.name.indexOf(jobApplication.finalRecommendation) > -1){   
                 			return true;   
                 		}
                 		}
             	}else if(r.on && jobApplication.currentStatus == "Pending" && jobApplication.finalRecommendation == "Shortlist"){
             		
             		if(r.name ==  "Reco Shortlist"){
             		if(r.name.indexOf(jobApplication.finalRecommendation) > -1){  
             			return true;   
             		}}
             	}else{
             	
             	}
             
             } else {
             	
             	if($scope.selectedAllXyz){
             		return true;   
             	}
             }
         }
         
         $rootScope.appFilter1 = selectedStatus; 
         if(selectedStatus){
        	 
        	 if($rootScope.appFilter1 != ''){
        		 $rootScope.appFilterClass1 = "is-filtered";
        	 }else{
        		 $rootScope.appFilterClass1 = "is-filtered-no";
        	 }
         	
         } else {
         	$rootScope.appFilterClass1 = "is-filtered-no";
         }
     };
     
	   if(is_clicked1 ==1){
	  	    //DO SOMETHING
	  	$scope.getstatus();
	  }
	  $scope.selectedAllXyz = true;

	  $scope.checkAllStatus = function () {
	          if ($scope.selectedAllXyz) {
	              $scope.selectedAllXyz = false;
	          } else {
	              $scope.selectedAllXyz = true;
	          }
	          angular.forEach($scope.statusArray, function (item) {
	              item.on = $scope.selectedAllXyz;
	          });

	      };
	      
	     var selectedStatus = [];
	     
	     if($rootScope.appFilter1){
	  	     
	  	   $scope.statusArray = $rootScope.appFilter1;
	  	   $rootScope.appFilterClass1 = "is-filtered";
	     } else {
	  	   $rootScope.appFilterClass1 = "is-filtered-no";
	     }






    
    
 /*   // To filter by status if the top filter is not in pending state
    $scope.filterByStatus = function (jobApplication) {
        // console.log(jobApplication, $scope.filterByStatus);
    	if($rootScope.isDataFilterRemoved == "yes"){
			$scope.filterStatus = "";
			$rootScope.isDataFilterRemoved = "no";
		}
    	$rootScope.appFilter1 = $scope.filterStatus;
    	if($scope.filterStatus != ''){
    		 $rootScope.appFilterClass1 = "is-filtered";
    	} else {
    		$rootScope.appFilterClass1 = "is-filtered-no";
    	}
    		
    	angular.forEach($scope.jobApplication, function (jobApplication, index) {
    		
			if(jobApplication.currentStatus == "Pending" && jobApplication.adminRecommendation != null){
				if(jobApplication.adminRecommendation == 'R')
          	  {
          		 jobApplication.recommendation = "Reject";
          	 }
          	 else if(jobApplication.adminRecommendation == 'A'){
          		 jobApplication.recommendation = "Shortlist";
          	 }
			}
			else{
				if (jobApplication.adminRecommendation == null && jobApplication.currentStatus == "Pending" && jobApplication.filterScore != null && parseInt(jobApplication.filterScore) >=0 && parseInt(jobApplication.filterScore) < 100){
					jobApplication.recommendation = "Reject";
				}else if (jobApplication.adminRecommendation == null && jobApplication.currentStatus == "Pending" && jobApplication.filterScore != null && parseInt(jobApplication.filterScore) == 100){
            		 jobApplication.recommendation = "Shortlist";
            	 }else if(jobApplication.adminRecommendation == null && jobApplication.currentStatus == "Pending" && jobApplication.filterScore == null || parseInt(jobApplication.filterScore) < 0){
         			jobApplication.recommendation = "Pending";
         		} else {
         			jobApplication.recommendation = "All";
         		}
			}
            
        });
		
		if($scope.filterStatus == 'RR' && jobApplication.finalRecommendation == "Reject" && jobApplication.currentStatus == "Pending"){
 		    return !$scope.filterStatus ? 
 		    		filteredJobApplications : (jobApplication.finalRecommendation == "Reject" && jobApplication.currentStatus == "Pending");
 		}else if($scope.filterStatus == 'RS' && jobApplication.finalRecommendation == "Shortlist" && jobApplication.currentStatus == "Pending"){
 		    
 		    return !$scope.filterStatus ? 
 		    		filteredJobApplications : (jobApplication.finalRecommendation == "Shortlist" && jobApplication.currentStatus == "Pending");
 		    
 		} else if($scope.filterStatus == "Pending" && jobApplication.currentStatus == "Pending"){
 			
 			return !$scope.filterStatus ? 
  					filteredJobApplications : (jobApplication.currentStatus == "Pending");

 		}else{
 			 return !$scope.filterStatus ? 
  					filteredJobApplications : ($scope.filterStatus != "Pending" && jobApplication.currentStatus == $scope.filterStatus);
 		}
 			// $scope.jobAppbListLength = filteredJobApplications.length;
     };
     */
     if($rootScope.appFilter3){
    	 
    	 $rootScope.appFilterClass3 = "is-filtered";
    	 $scope.filterName = $rootScope.appFilter3;
    	 
     } else {
    	
    	 $rootScope.appFilterClass3 = "is-filtered-no";
    	 $scope.filterName = "";
     }
     
     
     
     $scope.filterByDate = function (jobApplication) {
         // console.log(jobApplication, $scope.filterByReco);
    	$scope.filterThisWeek = false;
 		$scope.filterLastWeek = false;
 		$scope.filterThisMonth = false;
 		$scope.filterEarlier = false;
  		var filterval= $scope.filterDate;
  		$rootScope.appFilter4 = $scope.filterDate;
  		if($scope.filterDate != ''){
  			 $rootScope.appFilterClass4 = "is-filtered";
  		} else {
  			$rootScope.appFilterClass4 = "is-filtered-no";
  		}
  		
  		var curr = new Date;
  		var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
  		var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));
  		
  		var oneWeekAgo = new Date();
  		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  		
  		var lastWeekFirstday = new Date(oneWeekAgo.setDate(oneWeekAgo.getDate() - oneWeekAgo.getDay()));
  		var lastWeekLastday = new Date(oneWeekAgo.setDate(oneWeekAgo.getDate() - oneWeekAgo.getDay()+6));
  		
  		var currentMonth = curr.getMonth();
  		var currentYear =curr.getFullYear();
  		
  		if($scope.appliesFilterState){
			$scope.jobApplication = $rootScope.jobApplicationWithResume;
		}else{
			$scope.jobApplication = $rootScope.jobApplicationAll;
		}
  		
  		angular.forEach($scope.jobApplication, function (jobApplication, index) {
  			
  			var a = new Date(jobApplication.dateApplied);
  			
  			if(new Date(jobApplication.dateApplied) >= new Date(firstday) && new Date(jobApplication.dateApplied) <= new Date(lastday))
  			{// compare end <=, not >=
  			    // your code here
  				
  				jobApplication.filterByDate = 0;
  				$scope.filterThisWeek = true;
  			} else if(new Date(jobApplication.dateApplied) >= new Date(lastWeekFirstday) && new Date(jobApplication.dateApplied) <= new Date(lastWeekLastday)){
  				
  				jobApplication.filterByDate = 1;
  				$scope.filterLastWeek = true;
  			} else if(parseInt(currentMonth) == parseInt(a.getMonth())){
  				
  				jobApplication.filterByDate = 2;
  				$scope.filterThisMonth = true;
  			} else if((a.getFullYear() == curr.getFullYear() &&  a.getMonth() < curr.getMonth()) || a.getFullYear() != curr.getFullYear()){
  				
  				jobApplication.filterByDate = 3;
  				$scope.filterEarlier = true;
  			}
  			
          });
  		
  		   
  		return !$scope.filterDate ? 
  				filteredJobApplications : (jobApplication.filterByDate == $scope.filterDate);
  		// $scope.jobAppbListLength = filteredJobApplications.length;
      };
     
      if($rootScope.appFilter4){
    		 
    		$rootScope.appFilterClass4 = "is-filtered";
    		 $scope.filterDate = $rootScope.appFilter4;
    		 
    	 } else {
    		
    		 $rootScope.appFilterClass4 = "is-filtered-no";
    		 $scope.filterDate = "";
    	 }
      
      
      
      $scope.isOpen4 = false;
      $scope.selectedAllApplicantName= true;
      $scope.applicantNameArrayTemp=[];
      $scope.applicantNameArray = [];
      var selectedApplicantName= [];
      
      $scope.getApplicantName=function(){
      	$rootScope.appFilter3 = $scope.filterApplicantName;
  		if($scope.filterDate != ''){
  			 $rootScope.appFilterClass3 = "is-filtered";
  		} else {
  			$rootScope.appFilterClass3 = "is-filtered-no";
  		}
   	   if($scope.appliesFilterState){
   		   $scope.applicantNameArrayTemp=[];
   		    $scope.applicantNameArray = [];
   			$scope.jobApplication = $rootScope.jobApplicationWithResume;
   		}else if($rootScope.AppliesFilterViewedValue == 1){
   			 $scope.applicantNameArrayTemp=[];
   			    $scope.applicantNameArray = [];
      		$scope.jobApplication = $rootScope.viewedApplications;
        	}else if($rootScope.AppliesFilterViewedValue == 0){
        		 $scope.applicantNameArrayTemp=[];
    		    $scope.applicantNameArray = [];
      		$scope.jobApplication = $rootScope.unviewedApplications;
      	    }else{
   			$scope.jobApplication = $rootScope.jobApplicationAll;
   		}
   	   if($scope.jobApplication.length > 0){
   			for(var i= 0;i<=$scope.jobApplication.length;i++){
   				if($scope.jobApplication[i] != null && $scope.jobApplication[i] != "undefined" && $scope.jobApplication[i] != "null" && $scope.jobApplication[i] != "" && typeof $scope.jobApplication[i] != undefined){ 
   					var applicantName = null;
   	 				if($scope.jobApplication[i].firstName != null && 
   	 						$scope.jobApplication[i].firstName != "null" &&
   	 						$scope.jobApplication[i].firstName != "empty" &&
   	 						$scope.jobApplication[i].firstName != "" &&
   	 						typeof $scope.jobApplication[i].firstName != "undefined" &&
   	 						$scope.jobApplication[i].firstName != undefined){
   	 					applicantName = $scope.jobApplication[i].firstName.charAt(0);
   	 					applicantName = applicantName.toUpperCase();
   	 				}
   					
   					
   					 if (applicantName == 'A' || applicantName == 'B' || applicantName == 'C' || applicantName == 'D' || applicantName == 'E') {
   		                 
   						 $scope.applicantNameArrayTemp.push({'name' : "A-E",'on' : true});
           
               } else if (applicantName == 'F' || applicantName == 'G' || applicantName == 'H' || applicantName == 'I' || applicantName == 'J') {
                   
             	  		$scope.applicantNameArrayTemp.push({'name' : "F-J",'on' : true});
           
               } else if (applicantName == 'K' || applicantName == 'L' || applicantName == 'M' || applicantName == 'N' || applicantName == 'O') {
                   
                   	$scope.applicantNameArrayTemp.push({'name' : "K-O",'on' : true});
           
               } else if (applicantName == 'P' || applicantName == 'Q' || applicantName == 'R' || applicantName == 'S' || applicantName == 'T') {
                   
                  $scope.applicantNameArrayTemp.push({'name' : "P-T",'on' : true});
           
               } else if (applicantName == 'U' || applicantName == 'V' || applicantName == 'W' || applicantName == 'X' || applicantName == 'Y' || applicantName == 'Z') {
                   
                   $scope.applicantNameArrayTemp.push({'name' : "U-Z",'on' : true});
           
               } else {
                 
                 // do notthing
               }
   				}
   			}
   			
   			}
   	   
   	   var sl = $scope.applicantNameArrayTemp;
   	   var out = [];

   	   for (var i = 0, l = sl.length; i < l; i++) {
   	       var unique = true;
   	       for (var j = 0, k = out.length; j < k; j++) {
   	           if (sl[i].name === out[j].name) {
   	               unique = false;
   	           }
   	       }
   	       if (unique) {
   	           out.push(sl[i]);
   	       }
   	   }
   	   
   	   $scope.applicantNameArray = out;
        
      }
      
      $scope.filterByApplicantName= function(jobApplication) {
    	  
    	
    	  
    	  if($scope.applicantNameArray.length == 0){
    		  
    		 $scope.getApplicantName();
    		  
    		  
    		
    	  }
    	  
    	  for(applicantName in $scope.applicantNameArray){
      		if(!$scope.applicantNameArray[applicantName].on){
      			$scope.isCheckAllApplicantName = false;
      			break;
      		}else{
      			$scope.isCheckAllApplicantName = true;
      		}
      	}

          for(applicantName in $scope.applicantNameArray){
              var r = $scope.applicantNameArray[applicantName];
              
              
              if(selectedApplicantName.indexOf(r) == -1) {
              	selectedApplicantName.push(r);
         		 ab= selectedApplicantName.length;
              }
          
              if(!r.on){
              	$scope.selectedAllApplicantName= false;
              } 
           
              //console.log(JSON.stringify(r));
              
              if(jobApplication && jobApplication.firstName){
            	  var applicantName = null;
            	  if(jobApplication.firstName != null && 
      					jobApplication.firstName != "null" &&
      					jobApplication.firstName != "empty" &&
      					jobApplication.firstName != "" &&
      					typeof jobApplication.firstName != "undefined" &&
      					jobApplication.firstName != undefined){
              	var a = new Date(jobApplication.dateApplied);
              	var applicantName = jobApplication.firstName.charAt(0);
                  applicantName = applicantName.toUpperCase();
                  
                  
              }
                  
              if($scope.isCheckAllApplicantName == true){
          		return true;
          	}else{			
                  if(r.on && r.name=='A-E'){
          					 if (applicantName == 'A' || applicantName == 'B' || applicantName == 'C' || applicantName == 'D' || applicantName == 'E') {
                          
          						 return true;
          					 }
                      } else  if(r.on && r.name=='F-J'){
                      	if (applicantName == 'F' || applicantName == 'G' || applicantName == 'H' || applicantName == 'I' || applicantName == 'J') {
                          
                      		return true;
                      	}
                      } else  if(r.on && r.name=='K-O'){
                      	if (applicantName == 'K' || applicantName == 'L' || applicantName == 'M' || applicantName == 'N' || applicantName == 'O') {
                          
                      		return true;
                      	}
                      } else  if(r.on && r.name=='P-T'){
                      	if (applicantName == 'P' || applicantName == 'Q' || applicantName == 'R' || applicantName == 'S' || applicantName == 'T') {
                          
                      		return true;
                      }
                      } else  if(r.on && r.name=='U-Z'){
                      	if (applicantName == 'U' || applicantName == 'V' || applicantName == 'W' || applicantName == 'X' || applicantName == 'Y' || applicantName == 'Z') {
                          
                      		return true;
                      	}
                      } else {
                        
                        // do notthing
                      }
          	}
                 
          }
          
          $rootScope.appFilter1 = selectedApplicantName; 
          } 
      };
      


     
   //To filter by applicant name
 	$scope.filterByName = function (jobApplication) {
         //console.log(jobApplication, $scope.filterByStatus);
 		$scope.filterAtoE = false;
		$scope.filterFtoJ = false;
		$scope.filterKtoO = false;
		$scope.filterPtoT = false;
		$scope.filterUtoZ = false;
 		
 		$rootScope.appFilter3 = $scope.filterName;
 		if($scope.filterName != ''){
 			 $rootScope.appFilterClass3 = "is-filtered";
 		} else {
 			$rootScope.appFilterClass3 = "is-filtered-no";
 		}
 		
 		if($scope.appliesFilterState){
			$scope.jobApplication = $rootScope.jobApplicationWithResume;
		}else{
			$scope.jobApplication = $rootScope.jobApplicationAll;
		}
 		
 		angular.forEach($scope.jobApplication, function (jobApplication, index) {
 			
 			var applicantName = jobApplication.firstName.charAt(0);
 			applicantName = applicantName.toUpperCase();
 				
 			 if (applicantName == 'A' || applicantName == 'B' || applicantName == 'C' || applicantName == 'D' || applicantName == 'E') {
                  
 				 jobApplication.filterByNameRange = 0;
 				 $scope.filterAtoE = true;
 				 
              } else if (applicantName == 'F' || applicantName == 'G' || applicantName == 'H' || applicantName == 'I' || applicantName == 'J') {
                  
             	 jobApplication.filterByNameRange = 1;
             	 $scope.filterFtoJ = true;
 				 
              } else if (applicantName == 'K' || applicantName == 'L' || applicantName == 'M' || applicantName == 'N' || applicantName == 'O') {
                  
             	 jobApplication.filterByNameRange = 2;
             	 $scope.filterKtoO = true;
 				 
              } else if (applicantName == 'P' || applicantName == 'Q' || applicantName == 'R' || applicantName == 'S' || applicantName == 'T') {
                  
             	 jobApplication.filterByNameRange = 3;
             	 $scope.filterPtoT = true;
             	 
 				 
              } else if (applicantName == 'U' || applicantName == 'V' || applicantName == 'W' || applicantName == 'X' || applicantName == 'Y' || applicantName == 'Z') {
                  
             	 jobApplication.filterByNameRange = 4;
             	 $scope.filterUtoZ = true;
 				 
              } else {
             	 
             	 //do notthing
              }
            
         });
 		
 		    return !$scope.filterName ? 
 		    		filteredJobApplications : (jobApplication.filterByNameRange == $scope.filterName);
 		   
 		  // $scope.jobAppbListLength = filteredJobApplications.length;
     };
     
     $scope.isOpen3 = false;
     var selectedAppliedDate = [];
     var curr = new Date;
		var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
		var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));
		
		var oneWeekAgo = new Date();
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
		
		var lastWeekFirstday = new Date(oneWeekAgo.setDate(oneWeekAgo.getDate() - oneWeekAgo.getDay()));
		var lastWeekLastday = new Date(oneWeekAgo.setDate(oneWeekAgo.getDate() - oneWeekAgo.getDay()+6));
		
		var currentMonth = curr.getMonth();
		var currentYear =curr.getFullYear();
		$scope.selectedAllDate=true;
	    $scope.selectedAllDate= true;
	    $scope.dateArrayTemp=[];
	    $scope.dateArray = [];
	    var selectedDate= [];
	    $scope.isopen3=false
	    var curr = new Date;
		var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
		var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));
		
		var oneWeekAgo = new Date();
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
		
		var lastWeekFirstday = new Date(oneWeekAgo.setDate(oneWeekAgo.getDate() - oneWeekAgo.getDay()));
		var lastWeekLastday = new Date(oneWeekAgo.setDate(oneWeekAgo.getDate() - oneWeekAgo.getDay()+6));
		
		var currentMonth = curr.getMonth();
		var currentYear =curr.getFullYear();
	    
	    $scope.getAppliedDate=function(){
	    	$rootScope.appFilter4 = $scope.filterDate;
			if($scope.filterDate != ''){
				 $rootScope.appFilterClass4 = "is-filtered";
			} else {
				$rootScope.appFilterClass4 = "is-filtered-no";
			}
	 	   if($scope.appliesFilterState){
	 		   $scope.dateArrayTemp=[];
	 		    $scope.dateArray = [];
	 			$scope.jobApplication = $rootScope.jobApplicationWithResume;
	 		}else if($rootScope.AppliesFilterViewedValue == 1){
	 			 $scope.dateArrayTemp=[];
	 			    $scope.dateArray = [];
	    		$scope.jobApplication = $rootScope.viewedApplications;
	      	}else if($rootScope.AppliesFilterViewedValue == 0){
	      		 $scope.dateArrayTemp=[];
	  		    $scope.dateArray = [];
	    		$scope.jobApplication = $rootScope.unviewedApplications;
	    	    }else{
	 			$scope.jobApplication = $rootScope.jobApplicationAll;
	 		}
	 	   if($scope.jobApplication.length > 0){
	 			for(var i= 0;i<=$scope.jobApplication.length;i++){
	 				if($scope.jobApplication[i] != null && $scope.jobApplication[i] != "undefined" && $scope.jobApplication[i] != "null" && $scope.jobApplication[i] != "" && typeof $scope.jobApplication[i] != undefined){ 
	 					var a = new Date($scope.jobApplication[i].dateApplied);
	 					
	 					if(new Date($scope.jobApplication[i].dateApplied) >= new Date(firstday) && new Date($scope.jobApplication[i].dateApplied) <= new Date(lastday))
	 					{
	 						$scope.dateArrayTemp.push({'name' : "This Week",'on' : true});
	 					} else if(new Date($scope.jobApplication[i].dateApplied) >= new Date(lastWeekFirstday) && new Date($scope.jobApplication[i].dateApplied) <= new Date(lastWeekLastday)){
	 						$scope.dateArrayTemp.push({'name' : "Last Week",'on' : true});
	 					} else if(parseInt(currentMonth) == parseInt(a.getMonth())){
	 						$scope.dateArrayTemp.push({'name' : "This Month",'on' : true});
	 					} else if(a.getMonth() < curr.getMonth() || a.getFullYear() != curr.getFullYear()){
	 						$scope.dateArrayTemp.push({'name' : "Earlier",'on' : true});
	 					}
	 				}
	 			}
	 			
	 			}
	 	   
	 	   var sl = $scope.dateArrayTemp;
	 	   var out = [];

	 	   for (var i = 0, l = sl.length; i < l; i++) {
	 	       var unique = true;
	 	       for (var j = 0, k = out.length; j < k; j++) {
	 	           if (sl[i].name === out[j].name) {
	 	               unique = false;
	 	           }
	 	       }
	 	       if (unique) {
	 	           out.push(sl[i]);
	 	       }
	 	   }
	 	   
	 	   $scope.dateArray = out;
	      
	    }
     
	  	$scope.filterByAppliedDate= function(jobApplication) {
	  		
	  		if($scope.dateArray.length==0){
	  			$scope.getAppliedDate();
	  		}
	  		
	        for(date in $scope.dateArray){
	            var r = $scope.dateArray[date];
	            if(selectedDate.indexOf(r) == -1) {
	            	selectedDate.push(r);
	       		 ab= selectedDate.length;
	            }
	        
	            if(!r.on){
	            	$scope.selectedAllDate= false;
	            } 
	         
	            if(jobApplication.dateApplied != null && jobApplication.dateApplied != 'null' && jobApplication.dateApplied != 'empty' && jobApplication.dateApplied != ""){
	            	var a = new Date(jobApplication.dateApplied);
	            	if(r.on && r.name=='This Week'){
		         		if(new Date(jobApplication.dateApplied) >= new Date(firstday) && new Date(jobApplication.dateApplied) <= new Date(lastday)){
		         			return true;
		         		}
		         	}
		         	
	            	else if(r.on && r.name=='Last Week'){
		         		if(new Date(jobApplication.dateApplied) >= new Date(lastWeekFirstday) && new Date(jobApplication.dateApplied) <= new Date(lastWeekLastday)){
		         			return true;
		         		}
		         	}
		         	
		         	else if(r.on && r.name=='This Month'){
		         		if(parseInt(currentMonth) == parseInt(a.getMonth())){
		         			return true;
		         		}
		         	}
		         	
		         	else if(r.on && r.name=='Earlier' ){
		         		if(a.getMonth() < curr.getMonth() || a.getFullYear() != curr.getFullYear()){
		         			return true;
		         		}
		         	}
		         	else{
		         		
	            	}
	            
	            } else {
	            	
	            	if($scope.selectedAllDate){
	            		return true;   
	            	}
	            }
	        }
	        
	        $rootScope.appFilter1 = selectedDate; 
	       
	    };
     
      // source flags
        $scope.others=0;
        $scope.Facebook=0;
        $scope.LinkedIn=0;
        $scope.Twitter=0;
        $scope.TwitterShare=0;
        $scope.Indeed=0;
        $scope.Naukri=0;
        $scope.Monster=0;
        $scope.Shine=0;
        $scope.FacebookTab=0;
        $scope.LinkedInShare=0;
        $scope.TimesJob=0;
        $scope.GooglePlus=0;
        $scope.RecruiterUpload=0;
        $scope.DailyHunt=0;
        $scope.SimplyHired=0;
        $scope.EmailInvite=0;
        $scope.CareerBuilder=0;
        $scope.JobRapido=0;
        $scope.LiveCareer=0;
        $scope.CareerSite=0;
        $scope.GlassDoor=0;
        $scope.EmployeeReferral=0;
        $scope.ReferralInvite=0;
        $scope.Whatsapp=0;
        $scope.Quikr=0;
        $scope.Partner=0;
    	$scope.TalentPoolInvite=0;
        
        // on click selecting the sources
        $scope.selectedAll = true;
        //referrerEmailId
        $scope.getsource = function () {
        	if($scope.appliesFilterState){
    			$scope.jobApplication = $rootScope.jobApplicationWithResume;
    		}else{
    			$scope.jobApplication = $rootScope.jobApplicationAll;
    		}
        	$scope.selectedAll = true;
    		selectedSource = [];				   	    
        	if(flag ==0){
        		$scope.sourceArray=[];
        		$scope.refferrerArray=[];
        		angular.forEach($scope.jobApplication, function (jobApplication, index) { 	
      			//start referrerEmailId
        		/*	if(jobApplication.referrerEmailId){
           			 var sfound = false;
           			 for(var i = 0; i < $scope.refferrerArray.length; i++) {  
           						if ($scope.refferrerArray[i].name ==  jobApplication.referrerEmailId) {
               						sfound = true;
           						}
           			 }
           			if(!sfound){
           			var sfound = false;
           			for(var i = 0; i < $scope.refferrerArray.length; i++) {
           						if ($scope.refferrerArray[i].name ==  jobApplication.referrerEmailId) {
               						sfound = true;
           						}
       				}
           			if(!sfound){
           			$scope.refferrerArray.push({ name: jobApplication.referrerEmailId, value:jobApplication.referrerEmailId, tag :"referrerEmailId", order:"Ta", on: true})
           			}
           			}
               		}*///End referrerEmailId
     			
        		if(jobApplication.subSource){
    			 var sfound = false;
    			 for(var i = 0; i < $scope.sourceArray.length; i++) {  
    						if ($scope.sourceArray[i].name ==  jobApplication.subSource) {
        						sfound = true;
    						}
    			 }
    			if(!sfound){
    			var sfound = false;
    			for(var i = 0; i < $scope.sourceArray.length; i++) {
    						if ($scope.sourceArray[i].name ==  jobApplication.subSource) {
        						sfound = true;
    						}
				}
    			if(!sfound){
    			$scope.sourceArray.push({ name: jobApplication.subSource, value:jobApplication.subSource, tag :"subSource", order:"Ta", on: true})
    			}
    			}
        		}
       		if(jobApplication.source =='Others' && $scope.others==0){
        			$scope.sourceArray.push({ name: "Others", value:"Others", on: true})
        			$scope.others=1;       
        		}else if(jobApplication.source =='FacebookShare' && $scope.Facebook==0){
        			$scope.sourceArray.push({ name: "FacebookShare", value:"Facebook Share", on: true})	 			
        			$scope.Facebook=1; 
        		} else if(jobApplication.source =='LinkedIn' && $scope.LinkedIn==0 ){
        			$scope.sourceArray.push({ name: "LinkedIn", value:"LinkedIn", on: true})			
        			$scope.LinkedIn=1; 
        		}else if(jobApplication.source =='Twitter' && $scope.Twitter==0){
        			$scope.sourceArray.push({ name: "Twitter", value:"Twitter", on: true})	
        			$scope.Twitter=1; 
        		}else if(jobApplication.source =='TwitterShare' && $scope.TwitterShare==0){
        			$scope.sourceArray.push({ name: "TwitterShare", value:"Twitter Share", on: true})	
        			$scope.TwitterShare=1; 
        		}else if(jobApplication.source =='Indeed' && $scope.Indeed==0){
        			$scope.sourceArray.push({ name: "Indeed", value:"Indeed", on: true})	
        			$scope.Indeed=1; 
        		}else if(jobApplication.source =='Naukri' && $scope.Naukri==0){
        			$scope.sourceArray.push({ name: "Naukri", value:"Naukri", on: true})	
        			$scope.Naukri=1; 
        		}else if(jobApplication.source =='Monster' && $scope.EmailInvite==0){
        			$scope.sourceArray.push({ name: "Monster", value:"Monster", on: true})	
        			$scope.Monster=1; 
        		}else if(jobApplication.source =='Shine' && $scope.Shine==0){
        			$scope.sourceArray.push({ name: "Shine", value:"Shine", on: true})	
        			$scope.Shine=1; 
        		}else if(jobApplication.source =='FacebookTab' && $scope.FacebookTab==0){
        			$scope.sourceArray.push({ name: "FacebookTab", value:"Facebook Tab", on: true})	
        			$scope.FacebookTab=1; 
        		}else if(jobApplication.source =='LinkedInShare' && $scope.LinkedInShare==0){
        			$scope.sourceArray.push({ name: "LinkedInShare", value:"LinkedIn Share", on: true})	
        			$scope.LinkedInShare=1; 
        		}else if(jobApplication.source =='TimesJobs' && $scope.TimesJob==0){
        			$scope.sourceArray.push({ name: "TimesJobs", value:"Times Job", on: true})	
        			$scope.TimesJob=1; 
        		}else if(jobApplication.source =='GooglePlus' && $scope.GooglePlus==0){
        			$scope.sourceArray.push({ name: "GooglePlus", value:"Google Plus", on: true})	
        			$scope.GooglePlus=1;
        		}else if(jobApplication.source =='DailyHunt' && $scope.DailyHunt==0){
        			$scope.sourceArray.push({ name: "DailyHunt", value:"Daily Hunt", on: true})	
        			$scope.DailyHunt=1;
        		}else if(jobApplication.source =='RecruiterUpload' && $scope.RecruiterUpload==0){
        			$scope.sourceArray.push({ name: "RecruiterUpload", value:"Recruiter Upload", on: true})	
        			$scope.RecruiterUpload=1;
        		}else if(jobApplication.source =='SimplyHired' && $scope.SimplyHired==0){
        			$scope.sourceArray.push({ name: "SimplyHired", value:"Simply Hired", on: true})	
        			$scope.SimplyHired=1; 
        		}else if(jobApplication.source =='EmailInvite' && $scope.EmailInvite==0){
        			$scope.sourceArray.push({ name: "EmailInvite", value:"Email Invite", on: true})	
        			$scope.EmailInvite=1; 
        		}else if(jobApplication.source =='CareerBuilder' && $scope.CareerBuilder==0){
        			$scope.sourceArray.push({ name: "CareerBuilder", value:"Career Builder", on: true})	
        			$scope.CareerBuilder=1; 
        		}else if(jobApplication.source =='JobRapido' && $scope.JobRapido==0){
        			$scope.sourceArray.push({ name: "JobRapido", value:"Job Rapido", on: true})	
        			$scope.JobRapido=1; 
        		}else if(jobApplication.source =='LiveCareer' && $scope.LiveCareer==0){
        			$scope.sourceArray.push({ name: "LiveCareer", value:"LiveCareer", on: true})	
        			$scope.LiveCareer=1; 
        		}else if(jobApplication.source =='CareerSite' && $scope.CareerSite==0){
        			$scope.sourceArray.push({ name: "CareerSite", value:"CareerSite", on: true})	
        			$scope.CareerSite=1; 
        		}	else if(jobApplication.source =='Glassdoor' && $scope.GlassDoor==0){
        			$scope.sourceArray.push({ name: "Glassdoor", value:"Glassdoor", on: true})	
        			$scope.GlassDoor=1; 
        		}else if(jobApplication.source =='EmployeeReferral' && $scope.EmployeeReferral==0){
        			$scope.sourceArray.push({ name: "EmployeeReferral", value:"Employee Referral", on: true})	
        			$scope.EmployeeReferral=1; 
        		}else if(jobApplication.source =='ReferralInvite' && $scope.ReferralInvite==0){
        			$scope.sourceArray.push({ name: "ReferralInvite", value:"Referral Invite", on: true})	
        			$scope.ReferralInvite=1; 
        		}else if(jobApplication.source =='Whatsapp' && $scope.Whatsapp==0){
        			$scope.sourceArray.push({ name: "Whatsapp", value:"Whatsapp", on: true})	
        			$scope.Whatsapp=1; 
        		} else if(jobApplication.source =='Quikr' && $scope.Quikr==0){
        			$scope.sourceArray.push({ name: "Quikr", value:"Quikr", on: true})	
        			$scope.Quikr=1; 
        		}else if(jobApplication.source =='TalentPoolInvite' && $scope.TalentPoolInvite==0){
        			$scope.sourceArray.push({ name: "TalentPoolInvite", value:"Talent Pool Invite", order:"A",on: true})	
        			$scope.TalentPoolInvite=1; 
        		}else if(jobApplication.source =='Partner' && $scope.Partner==0){
                    $scope.sourceArray.push({ name: "Partner", value:"Partner", on: true})    
                    $scope.Partner=1; 
                }			 
        	});
        	flag=1;
        	}//end flag loop
        	$scope.checkBoxClicked = "";
    		$scope.getCheckBoxValue = function(value) {
	    	$scope.checkBoxClicked = value;
	    		//console.log(": " +value);
    		};

          $scope.filterBySource = function(jobApplication) {
          for(source in $scope.sourceArray){
              var s = $scope.sourceArray[source];
              
              if(selectedSource.indexOf(s) == -1) {
         		 	selectedSource.push(s);
         		 ab= selectedSource.length;
              }
              
           
              if(!s.on){
              	$scope.selectedAll = false;
              } 
              

              if(s.name =='RecruiterUpload' && s.on && $scope.checkBoxClicked == 'RecruiterUpload'){

          	
          	
			for (var i=0; i<$scope.sourceArray.length; i++) {
 			 if ($scope.sourceArray[i].tag == 'subSource') {
    				$scope.sourceArray[i].on = true;
   					 //break;
 			 	}
			}

          } 

           if(s.tag =='subSource' && !s.on && $scope.checkBoxClicked != 'RecruiterUpload'){
          	
			for (var i=0; i<$scope.sourceArray.length; i++) {
 			 if ($scope.sourceArray[i].name == 'RecruiterUpload') {
    				$scope.sourceArray[i].on = false;
   					 break;
 			 	}
			}

          } 
                
              if(jobApplication.source != null && jobApplication.source != 'null' && jobApplication.source != 'empty' && jobApplication.source != ""){
              
              	if((s.on && jobApplication.source.indexOf(s.name) > -1) || (jobApplication.subSource && s.on && jobApplication.subSource.indexOf(s.name) > -1)){
              		return true;   
              	}  
              
              } else {
              	
              	if($scope.selectedAll){
              		return true;   
              	}
              }
          }
          
          $rootScope.appFilter5 = selectedSource; 
          if(selectedSource){
          	$rootScope.appFilterClass5 = "is-filtered";
          } else {
          	$rootScope.appFilterClass5 = "is-filtered-no";
          }
      };
        
        
        }
        if(is_clicked ==1){
    	    // DO SOMETHING
    	
    	$scope.getsource();
    	$scope.getApplicantName();
    	$scope.getAppliedDate();
    }
      $scope.selectedAll = true;
    // // if ($scope.sourceArray[index] == null) {
    // if(ab <=0){
    // $scope.sourceArray = [{ name: "Others", value:"Career Site", on: true},
// {name:"Facebook", value:"Facebook", on:true},
// {name:"LinkedIn", value:"LinkedIn", on:true},
// {name:"Twitter", value:"Twitter", on:true},
// {name:"Indeed", value:"Indeed", on:true},
// {name:"Naukri", value:"Naukri", on:true},
// {name:"Monster", value:"Monster", on:true},
// {name:"Shine", value:"Shine", on:true},
// {name:"FacebookTab", value:"Facebook Tab", on:true},
// {name:"LinkedInShare", value:"LinkedIn Share", on:true},
// {name:"TimesJob", value:"Times Job", on:true},
// {name:"GooglePlus", value:"Google Plus", on:true},
// {name:"RecruiterUpload", value:"Recruiter Upload", on:true},
// {name:"SimplyHired", value:"Simply Hired", on:true},
// {name:"EmailInvite", value:"Email Invite", on:true}
//                              
// ];
    // }
      // }



        $scope.checkAll = function () {
            if ($scope.selectedAll) {
                $scope.selectedAll = false;
            } else {
                $scope.selectedAll = true;
            }
            angular.forEach($scope.sourceArray, function (item) {
                item.on = $scope.selectedAll;
            });

        };
        
        $scope.checkAllDate = function () {
            if ($scope.selectedAllDate) {
                $scope.selectedAllDate = false;
            } else {
                $scope.selectedAllDate = true;
            }
            angular.forEach($scope.dateArray, function (item) {
                item.on = $scope.selectedAllDate;
            });

        };
        
        
        $scope.checkAllApplicantName= function () {
            if ($scope.selectedAllApplicantName) {
                $scope.selectedAllApplicantName = false;
            } else {
                $scope.selectedAllApplicantName = true;
            }
            angular.forEach($scope.applicantNameArray, function (item) {
                item.on = $scope.selectedAllApplicantName;
            });

        };
       
  
       var selectedSource = [];
       
       if($rootScope.appFilter5){
    	     
    	   $scope.sourceArray = $rootScope.appFilter5;
    	   $rootScope.appFilterClass5 = "is-filtered";
       } else {
    	   $rootScope.appFilterClass5 = "is-filtered-no";
       }
        
     // sorting
       $scope.sort = {
               active: '',
               descending: undefined
           }     
            	
           $scope.changeSorting = function(column) {
               var sort = $scope.sort;
    
               if (sort.active == column) {
                   sort.descending = !sort.descending;
   				
               } else {
                   sort.active = column;
                   sort.descending = false;
               }
           };
           
    	$scope.getJobListByJobId= function(jobId, userId, status,companyId){
    		
  		  var jobId = jobId;
  		  var userId = userId;
  		  var status = status;
  		  
  		$scope.sessionId=localStorage.getItem('sessionId');
  		$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
  		  services.getJobListByJobId(jobId, userId, status,companyId,$scope.sessionId,$scope.loginUserId).then(function(data){
  			  
  			if (data.data.length == 1){
				 $activityIndicator.stopAnimating();
				 $scope.jobApplicationObject=data.data[0];
				 if($scope.jobApplicationObject.webserviceAPIResponseCode == UNAUTHORIZED){
					 $scope.jobApplication=null;
				 growl.error(UNAUTHORIZED_ERROR_MSG);
				 $('#logout').click();
				 return;
				 }
			 }

  		    			
  		    		$scope.jobApplication = data.data;
  		    		$activityIndicator.stopAnimating();
  		    						
  		    		var jobApplicationList = $scope.jobApplication;
  		    		var jobAppList = $scope.jobApplication;			
  		    		$scope.jobAppbListLength = jobAppList.length;
  		    						
  		    		if(!$scope.jobApplication || $scope.jobApplication == ""){
  		    				$scope.isAppEmpty = true;
  		    				$scope.noAppliesMsg = "No applications to display";
  		    		} else {
  		    				$scope.isAppEmpty = false;
  		    		}
  		    					    
  		    		$scope.totalRecords = $scope.jobApplication.length;

  		    	});

  		
  		  }
    	
    	$scope.backtoCompanyList = function() {
        	$("body,html").animate({scrollTop: companyListPaaageYaxisOffeset}, "slow");
        	
    		}
    	
    	
    	 /* $scope.getJobApplicationCuration = function(jobApplicationId){
        	  $scope.JobApplicationFields={};
    		$rootScope.curatedJobApplicationId = jobApplicationId;
    		$activityIndicator.startAnimating();
    			
    		//To get the master fields and its values for selection
        	services.getJobApplication(jobApplicationId).then(function(data){
        		$scope.JobApplicationData = data.data;
        	});
        	
        	services.getMasterFieldsForEntity($scope.sessionId,"JobApplication").then(function(data){
        		
        		$scope.dataList=data.data.editableFields;
        		$timeout(function() {$.each($scope.dataList, function(key, value) {
        			$scope.lowerCaseKey=key.replace(/ /g, '');
        			$scope.lowerCaseKey=$scope.lowerCaseKey.toString().charAt(0).toLowerCase() + $scope.lowerCaseKey.slice(1);
        			  $scope.JobApplicationFields[key]=$scope.JobApplicationData[$scope.lowerCaseKey];
        		});}, 1000);
        		
        		
        		
        	});
        	
        	//values for selection
        	services.getMasterData("masterData").then(function(data){
        		   $scope.dataValueList = data.data;
        	});
        	
    	
    		
    		$activityIndicator.stopAnimating();
    		
    };
    
    $scope.saveJobApplicationCuration = function(){
		$activityIndicator.startAnimating();

    	$scope.curatedJobApplicationId = $rootScope.curatedJobApplicationId;
	 services.saveJobOrCompanyMasterDetails("JobApplication",$scope.curatedJobApplicationId,$scope.JobApplicationFields).then(function(data){
		 if (data.data.code == 200) {
	    		$activityIndicator.stopAnimating();

				
				 growl.success("Job Application curated successfully");
				 $('#jobApplicationCuration').modal('hide');
				 
				$scope.JobFields={};
	        }
			 else {
	        	growl.error("Something went wrong. Please try again.");
	        	
	        }
	 });
    }*/
    	
    
});

// view company details controller
ccubeApp.controller('viewCompanyCrtl', function ($scope,$rootScope,services,$filter,
		localStorageService,growl,$activityIndicator,$window,$timeout) {
	
	pageName = "";
	
	var userName = localStorage.getItem('userNameAdmin');
	var userId = localStorage.getItem('loginUserIdAdmin');
	var welUserName = localStorage.getItem('welUserNameAdmin');
	var cmpId = localStorage.getItem('companyId');
	$scope.companyId = cmpId;
	$scope.userPermissionToManageForAdmin=localStorage.getItem('userPermissionToManageForAdmin');
	$scope.IssuperUsers = localStorage.getItem('IssuperUsers');
	$scope.userPermissionForModifiyCompany = localStorage.getItem('userPermissionForModifiyCompany');
	$scope.userNameAdmin=userName;
	$scope.welUserNameAdmin=welUserName;
	$scope.configurationExternalSystem=null;
	$scope.configsubmit=false;
	/*$scope.enableRecruiterWorkflow = false;*/
	$scope.enableRequestApproval = false;
	$scope.freemiumenable = false;
	$scope.CompaniesFields={};
	// used for refresh issue when ats is added
	$scope.init = function() {
		this.getcompantdetails();
	};
	///new company fields
	
	$('#notesDiv,#noteserr').click(function() {

	    $('#notes').css('display', 'none');
	    $('#noteserr').css('display', 'none');
	    $('#notes_edit1')
	        .val($('#notes').text())
	        .css('display', '')
	        .focus();

	});

	 $scope.sampleDownloadVendorXL = function() {
	 		
		 $scope.type = "manage";
		 services.getPartnerFieldsConfiguration($scope.companyId,$scope.type).then(function(data){
			 if(data.status == 200){
		    		$scope.partnerFieldsConfiguration = data.data.partnerFieldsConfiguration;
		    		}
	    	});
		 
		  var link = document.createElement('a');
		  if($scope.partnerFieldsConfiguration.length > 0 ){
			  link.href = EMPLOYEESAMPLEDARATEMPFOLDERPATH+"vendorsampleuploadOne.xls";
			  link.download = "vendorsampleuploadOne.xls";
		  }else{
			  link.href = EMPLOYEESAMPLEDARATEMPFOLDERPATH+"vendorsampleupload.xls";
			  link.download = "vendorsampleupload.xls";
		  }
		  document.body.appendChild(link);
		  link.click();
	};
	 
	$('#notes_edit1').blur(function() {
	    $('#notes_edit1').css('display', 'none');
	    $('#noteserr').css('display', '');
	    $('#notes')
	        .text($('#notes_edit1').val())
	        .css('display', '');
	    $scope.saveCompany(true);
	});
	
	
    $(document).ready(function(){
        $('#notesDiv').hover(function(){  
            $(this).children('#pencilEdit').css({'display' : 'block'});
        },function(){  
            $(this).children('#pencilEdit').css({'display' : 'none'});
        });
    });
    
	var uploadedFile = null;
	
	$scope.setFileName = function(fileInput) {

		var validFileExtensions = ZIP_FILE_TYPES;   
          var sFileName =fileInput.value;
                for (var j = 0; j < validFileExtensions.length; j++) {
                    var sCurExtension = validFileExtensions[j];
                    if (typeof fileUpload.files[0] != "undefined" &&  sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                    	$scope.filetype = "valid";
                        break;
                        
                    }else{
                    	$scope.filetype = "invalid";
                    }
                }
		var file = fileInput.value;
		var filename = file.replace(/^.*[\\\/]/, '');
		$scope.fileName = filename;
		$("#filename").html(filename);
		uploadedFile =  fileUpload.files[0];
		$scope.fileuploadEmpty= false;
		
	};
	
	$scope.clearModelForm = function() {
		$scope.fileName = null;
		$scope.filetype = "valid";
		$("#filename").html('');
		uploadedFile = null;
		
	};
	
	
	$scope.sessionId=localStorage.getItem('sessionId');
	$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
	
	$scope.downloadTemplate = function() { 
		
		services.downloadTemplate(cmpId,$window,$scope.sessionId,$scope.loginUserId).then(function(data){
		if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
						
						growl.error(UNAUTHORIZED_ERROR_MSG);
						$('#logout').click();
						return;
					}

		});
		
	}

	$scope.uploadCareerSiteTemplate = function() { 
		
		if(uploadedFile == null || uploadedFile =="null"){
			$scope.fileuploadEmpty= true;
			return;
		}
		$activityIndicator.startAnimating();
		
		$scope.sessionId=localStorage.getItem('sessionId');
		$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
		
		services.UploadCareerSiteTemplate(cmpId,uploadedFile,$scope.sessionId,$scope.loginUserId).then(function(data){
			
			if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
				
				growl.error(UNAUTHORIZED_ERROR_MSG);
				$('#logout').click();
				return;
			}
			if (data.data.webserviceAPIResponseCode == INVALIDFILETYPE){
				$activityIndicator.stopAnimating();
				 growl.error(INVALID_FILETYPE_ERROR_MSG);
				 return;
			 }


			$scope.fileName = null;
			$("#filename").html('');
			uploadedFile = null;
			
			$('#uploadCareerSiteModal').modal('hide');
			
			$activityIndicator.stopAnimating();
			
			if (data.data.code == 200) {
	  			 
				growl.success("Careers site uploaded successfully");	 
	  			     
	        } 
			
			else if (data.data.code == 1001) {
				
				growl.error(data.data.message);
				
			}
			else {
	            	 
	          	 growl.error("Something went wrong. Please try again.");
	          	    
	         }
			
		});
		
	}
	
	$scope.getcompantdetails = function() { 
		 $scope.webSiteCheck=true;
		 $scope.dotCheck="true";
		$scope.sessionId=localStorage.getItem('sessionId');
		$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
		
	services.getcompanyDetails(cmpId,$scope.sessionId,$scope.loginUserId).then(function(data){
		if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
			
			growl.error(UNAUTHORIZED_ERROR_MSG);
			$('#logout').click();
			return;
		}
		$scope.CompanyData = data.data.company;
		$scope.CompanyData.dateOfRegistration = $filter('date')(new Date($scope.CompanyData.dateOfRegistration), 'yyyy-MM-dd');
		$scope.configurationExternalSystemcompany = data.data.configurationExternalSystem;
		$scope.companyCommonConfiguration = data.data.companyCommonConfiguration;
		$scope.employeeReferalStatus = data.data.employeeReferralStatus;		
		if($scope.companyCommonConfiguration.requisitionJobVisibility == null){
			$scope.reqJobVisibility = "N";
		}else{
			$scope.reqJobVisibility = $scope.companyCommonConfiguration.requisitionJobVisibility;
		}
		// To get hire craft / hire pro details
		if($scope.configurationExternalSystemcompany.hirecraftUrl !=null && $scope.configurationExternalSystemcompany.hirecraftUrl !="null"){
			$scope.selectedATSdisplay="HireCraft" ;
		}else if($scope.configurationExternalSystemcompany.hireproUrl !=null && $scope.configurationExternalSystemcompany.hireproUrl !="null"){
			$scope.selectedATSdisplay="HirePro" ;
		}else{
			$scope.selectedATSdisplay="Disabled";
		}
		
		// to get common company configuration
		if($scope.companyCommonConfiguration != null && $scope.companyCommonConfiguration.enableRecruiterWorkflow == 'N'){
			$scope.enableRecruiterWorkflowDisplay = "Disabled";
		} else {
			$scope.enableRecruiterWorkflowDisplay = "Enabled";
		}
		if($scope.companyCommonConfiguration != null && $scope.companyCommonConfiguration.enableRequestApproval == 'N'){
			$scope.enableRequisitionDisplay = "Disabled";
		}else {
			$scope.enableRequisitionDisplay = "Enabled";
		}
		/*
		if($scope.companyCommonConfiguration != null && $scope.companyCommonConfiguration.isPremium == 'N'){
			$scope.otherSettingDisplay = "Disabled";
		}else {
			$scope.otherSettingDisplay = "Enabled";
		}
	*/



		if($scope.companyCommonConfiguration != null && $scope.companyCommonConfiguration.enableVendorMgt == 'N'){
			$scope.selectedVendorReferaldisplay = "Disabled";
			$scope.enableVendor = false;
			$scope.showVendReferralXlUpload = false;
		}else {
			$scope.selectedVendorReferaldisplay = "Enabled";
			$scope.enableVendor = true;
			$scope.showVendReferralXlUpload = true;
		}


	 
		
		if($scope.employeeReferalStatus == 'Y') {
		    $scope.selectedEmployeeReferaldisplay = "Enabled";
		} else {
			
			$scope.selectedEmployeeReferaldisplay = "Disabled";
		}

		//enable company report status
		if($scope.companyCommonConfiguration != null && $scope.companyCommonConfiguration.reportStatus == 'N'){
			$scope.selectedEmployeeReportdisplay = "Disabled";
		}else {
			$scope.selectedEmployeeReportdisplay = "Enabled";
		}
		
		
	});
	
	//To get the master fields and its values for selection
	services.getMasterFieldsForEntity($scope.sessionId,"Company").then(function(data){
		$activityIndicator.startAnimating();
		$scope.dataList=data.data.editableFields;
		$timeout(function() { $.each($scope.dataList, function(key, value) {
			$scope.lowerCaseKey=key.replace(/ /g, '');
			$scope.lowerCaseKey=$scope.lowerCaseKey.toString().charAt(0).toLowerCase() + $scope.lowerCaseKey.slice(1);
			  $scope.CompaniesFields[key]=$scope.CompanyData[$scope.lowerCaseKey];
		});}, 1000);
		
		$activityIndicator.stopAnimating();
	});
	
	//values for selection
	services.getMasterData("masterData").then(function(data){
		   $scope.dataValueList = data.data;
		   
	});
}
	
	$scope.sessionId=localStorage.getItem('sessionId');
	$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
	 services.getcompanysubscriptionDetails($scope.sessionId,$scope.loginUserId).then(function(data){
		 $scope.getcompanysubscriptionDetails=data.data;
		 $scope.subscriptionActivestatus=$scope.getcompanysubscriptionDetails.active;
		 $scope.subscriptionPaymentStatus=$scope.getcompanysubscriptionDetails.paymentStatus;
		 localStorage.setItem('subscriptionActivestatus',$scope.subscriptionActivestatus);
		 localStorage.setItem('subscriptionPaymentStatus', $scope.subscriptionPaymentStatus);
		 
		 
	});	
	 // Getting ATS configuration
    $scope.getATSconfiguration = function(cmpny_id) {
    	$scope.configsubmit=false;
    	
    	$scope.sessionId=localStorage.getItem('sessionId');
    	$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
    	
    	services.getATSConfiguration(cmpny_id,$scope.sessionId,$scope.loginUserId).then(function(data){
    		
    		if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
    			
    			growl.error(UNAUTHORIZED_ERROR_MSG);
    			$('#logout').click();
    			return;
    		}


    		$scope.configurationExternalSystem = data.data;
    		if($scope.configurationExternalSystem.hirecraftUrl !=null && $scope.configurationExternalSystem.hirecraftUrl !="null"){
    			
    			$scope.selectedATS=1;
    			$scope.atsEnabled=true;
    		}else if($scope.configurationExternalSystem.hireproUrl != null && $scope.configurationExternalSystem.hireproUrl !="null"){
    			$scope.selectedATS=2;
    			$scope.atsEnabled=true;
    		}
    		else
    		{
    			$scope.selectedATS="";
    			$scope.atsEnabled=false;
    		}
    		
    	});	    
    };
    
    $scope.getRecruiterWorflowConfig = function(cmpny_id) {
    	
    	$rootScope.isDefaultWorkflowNameChange = false;
    		
    	services.getRecruiterConfig(cmpny_id,$scope.sessionId,$scope.loginUserId).then(function(data){
    		
    		if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
    			
    			growl.error(UNAUTHORIZED_ERROR_MSG);
    			$('#logout').click();
    			return;
    		}


    		$scope.companyCommonConfiguration = data.data;
    		$scope.workflowName = $scope.companyCommonConfiguration.workflowName;
    		
    	services.getRecruiterWorkflowMaster($scope.sessionId,$scope.loginUserId).then(function(data){
    		
    		if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
    			growl.error(UNAUTHORIZED_ERROR_MSG);
    			$('#logout').click();
    			return;
    		}
    		
    		$scope.workflowNameList = data.data;
    		
     		var index = -1;

			_.each($scope.workflowNameList, function(data, idx) { 
			   if (_.isEqual(data.workflowName, $scope.workflowName)) {
			      index = idx;
			      return;
			   }
			});
			 
			$scope.workflowName = $scope.workflowNameList[index];
    	
    	// To get company departmentList
    	services.getCompanyDepartmentList(cmpny_id,$scope.sessionId,$scope.loginUserId).then(function(data){
    		if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
    			growl.error(UNAUTHORIZED_ERROR_MSG);
    			$('#logout').click();
    			return;
    		}
    		
    		$scope.departmentList = data.data;
    		
    		
    		$scope.departmentList = data.data;

   		 angular.forEach($scope.departmentList, function(dept) {
   			 var index = -1;
   			 _.each($scope.workflowNameList, function(data, idx) { 
   				 if (_.isEqual(data.workflowName, dept.workflowName)) {
   					 index = idx;
   					 return;
			   }
			   
			});
   			 dept.isWorkFlowNameChanged = 'N';
   			 dept.recruiterWorkflowMaster = $scope.workflowNameList[index];
    		
   		 });
    		
    	});
    	
    	});
    	
    	});
    	
    }
    
    $scope.validatePackage = function(compnayPackageService){
		
			 $scope.packageonlynumber =null;
			
			 if (compnayPackageService !== "" && !$.isNumeric(compnayPackageService)) {
					$scope.packageonlynumber = ONLY_NUMBER_ERROR;
				}
		 }
    
    // Getting ATS configuration
    $scope.getRecruiterConfig = function(cmpny_id) {
    	$scope.freemiumEnable = false;
    	services.getCompanyPackageServiceStatus(cmpny_id).then(function(data){
    		
    		$scope.compnayPackageService=data.data;
    	});
    	
    	$scope.sessionId=localStorage.getItem('sessionId');
    	$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
    	
    	services.getRecruiterConfig(cmpny_id,$scope.sessionId,$scope.loginUserId).then(function(data){
    		
    		if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
    			
    			growl.error(UNAUTHORIZED_ERROR_MSG);
    			$('#logout').click();
    			return;
    		}


    		$scope.companyCommonConfiguration = data.data;
    			
    		if($scope.companyCommonConfiguration != null &&  ($scope.companyCommonConfiguration.enableRequestApproval == 'N')) {
 	    	    
    			$scope.enableRequisitionDisplay = "Disabled";
 		        $scope.enableRequestApproval = false;
 		        $scope.enableJobCreationOnlyWithRequisition = false;
 		       
 	        }else{
    
 	        	$scope.enableRequisitionDisplay = "Enabled";
    			
    			
    			
    			if($scope.companyCommonConfiguration.enableRequestApproval == 'Y'){
    			
    				$scope.enableRequestApproval = true;
    				
    				if($scope.companyCommonConfiguration.enableJobCreationOnlyWithRequisition == 'Y'){
    					 $scope.enableJobCreationOnlyWithRequisition = true;
    				}else{
    					 $scope.enableJobCreationOnlyWithRequisition = false;
    				}
    				
    			} else {
    				$scope.enableRequestApproval = false;
    				 $scope.enableJobCreationOnlyWithRequisition = false;
    				
    			}
    		}

    	var subscriptionActivestatus=localStorage.getItem('subscriptionActivestatus');
    	var subscriptionPaymentStatus=localStorage.getItem('subscriptionPaymentStatus');
			if(subscriptionActivestatus == 'true' && ( subscriptionPaymentStatus == 'S' || subscriptionPaymentStatus == 'P'))
				{
				       $scope.isPremium = true;
				}
			else
				{
    		if($scope.companyCommonConfiguration != null &&  ($scope.companyCommonConfiguration.isPremium == 'N')) {
    			//$scope.otherSettingDisplay = "Disabled";
				$scope.isPremium = false;
 		       
 	        }else{
    
 	        	//$scope.otherSettingDisplay = "Enabled";
				$scope.isPremium = true;
    			
    		}
				}
    		// 
    		if($scope.companyCommonConfiguration != null &&  ($scope.companyCommonConfiguration.reportStatus == 'N')) {
				$scope.reportStatus = false;
 	        }else{
				$scope.reportStatus = true;
    			
    		}
    		
    	});	    
    };
    
    // saving ATS configuration
    $scope.saveAtsConfiguration = function() {
    	
    	if($scope.atsEnabled ==false){
    		
    		$scope.configurationExternalSystem.hirecraftUrl=null;
    		$scope.configurationExternalSystem.hirecraftReqDetail=null;
    		$scope.configurationExternalSystem.hirecraftResumeUrl=null;
    		$scope.configurationExternalSystem.hireproUrl=null;
    		$scope.configurationExternalSystem.hirproToken=null;
    		
    	}else if($scope.selectedATS ==2){
    		$scope.configurationExternalSystem.hirecraftUrl=null;
    		$scope.configurationExternalSystem.hirecraftReqDetail=null;
    		$scope.configurationExternalSystem.hirecraftResumeUrl=null;
    	}
    	else if($scope.selectedATS==1){
    		$scope.configurationExternalSystem.hireproUrl=null;
    		$scope.configurationExternalSystem.hirproToken=null;
    	}
    	
    	$scope.sessionId=localStorage.getItem('sessionId');
    	$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
    	 
    	services.saveAtsConfiguration($scope.configurationExternalSystem,growl,$scope.sessionId,$scope.loginUserId).then(function (response) {
    		
    		 $('#ATSintegration').modal('hide');
    		 
    		 	if(response.data.webserviceAPIResponseCode == UNAUTHORIZED){
    				
    				growl.error(UNAUTHORIZED_ERROR_MSG);
    				$('#logout').click();
    				return;
    			}

	         
	  		   if (response.status == 200) {
	  			 growl.success("ATS configuration settings changed successfully");	 
	  			 $scope.getcompantdetails();    
	             } else {
	          	 growl.error("Something went wrong. Please try again.");
	          	
	          	 $scope.getcompantdetails();    
	             }
	  		
	  	     });   	
    };
    
    $scope.isChangedDepartmentWorkflowName = function(department){
      		
    	$rootScope.isDefaultWorkflowNameChange = false;
    	department.isWorkFlowNameChanged = 'Y';
    	
    }
    
    // To enable recruiter workflow
    $scope.toEnableRecruiterWorkflow = function(operation){
    	
    $scope.toChangeCompanyConfigSetting(operation);
    	
    }
    

	$scope.clearSearch = function() {
 		$scope.uploadExclpop="no";
 		$scope.Invalidxlsfile="N";
 		$scope.uploadExclpopVendor="no";
 		
 		
 	}
	$scope.ClearPopUp = function() {
 		$scope.uploadExclpop="no";
 		$scope.uploadExclpopVendor="no";
 		
 	}
 
    // enable employee referral
    var uploadedFile = null;
     
     $scope.getEmployeeReferralStatus = function(cmpny_id) {
     	
        $('#employeeReferralUploadFile').val("");
     	
        $scope.sessionId=localStorage.getItem('sessionId');
        $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
     	
        services.getEmployeeReferralStatus(cmpny_id,$scope.sessionId,$scope.loginUserId).then(function(data){
        	
        	var response = data.data.result;
           $scope.redeemPointsConf = {};
           $scope.isRedeemablePointsCheckPass = true;
           if(response.enableEmployeeReferral == 'true' || response.enableEmployeeReferral == true){
        	   $scope.enableEmployeeReferral = true; 
        	   $scope.showEmpReferralXlUpload = true;
           }else{
        	   $scope.enableEmployeeReferral = false; 
        	   $scope.showEmpReferralXlUpload = false;
           }
           if(response.enableIjp == 'true' || response.enableIjp == true){
        	   $scope.enableIJPUploadReferral = true; 
           }else{
        	   $scope.enableIJPUploadReferral = false; 
           }
           if(response.enableBulkUploadReferral == 'true' || response.enableBulkUploadReferral == true){
        	   $scope.enableBulkUploadReferral = true; 
           }else{
        	   $scope.enableBulkUploadReferral = false; 
           }
     	   $scope.erPointsEnable = response.erPointsEnable;
     	   $scope.erPolicyEnable = response.erPolicyEnable;
     	   if(response.enableHomePage == 'true' || response.enableHomePage == true){
     		   $scope.enableHomePage = true; 
     	   }else{
     		   $scope.enableHomePage = false; 
     	   }
     	   $scope.enableFindYourSpot = response.enableFindYourSpot === "true";
     	   $scope.isRedeemablePointsEnable = false;
    	   $scope.redeemPointsConf.redeemablePointsPerJoinee = parseInt(response.maxRedeemablepoints, 10);
    	   
    	   if($scope.redeemPointsConf.redeemablePointsPerJoinee > 0)
    		  $scope.isRedeemablePointsEnable = true;
    	   
     	  if( response.erPointsEnable == "Y"){
     		 $scope.erPointsEnable = true;
     	  }else{
     		 $scope.erPointsEnable = false;
     	  }	  
        });
     }
         
     $scope.getCompanyCommonConfig = function(companyId){
    	 $scope.sessionId=localStorage.getItem('sessionId');
    	 $scope.loginUserId=localStorage.getItem('loginUserIdAdmin'); 
    	 services.getCompanyCommonConfigurationForAdmin(companyId,$scope.sessionId,$scope.loginUserId).then(function(data){
        	
        	 if (data.data.code == 200) {
        		 $scope.GDPRFeature = data.data.result.GDPRFeature;
             }else if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
     			
     			growl.error(UNAUTHORIZED_ERROR_MSG);
     			$('#logout').click();
     			return;
     		} else {
          	 growl.error("Something went wrong. Please try again.");
             }       	   	  
         });
     }
     
     $scope.enableOutlookIntigrationFeature = function(cmpny_id,exchangeURL) {    	
         $scope.sessionId=localStorage.getItem('sessionId');
         $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');   	
         services.enableOutlookIntigrationFeature(cmpny_id,$scope.sessionId,$scope.loginUserId,$scope.enableOutlookIntigration,exchangeURL).then(function(data){
        	 $('#OutlookIntegrationPopUp').modal('hide');
        	 if (data.data.code == 200) {
	  			 growl.success("Outlook Integration  settings changed successfully");	 
	             } else {
	          	 growl.error("Something went wrong. Please try again.");
	             }       	   	  
         });
      }
     
     $scope.enableRecruiterNameFeature = function(cmpny_id) {    	
         $scope.sessionId=localStorage.getItem('sessionId');
         $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');   	
         services.enableRecruiterNameFeature(cmpny_id,$scope.sessionId,$scope.loginUserId,$scope.recruiterNameEnable).then(function(data){
        	 $('#recruiterNameConfigPopUp').modal('hide');
        	 if (data.data.code == 200) {
	  			 growl.success("Recruiter name  settings changed successfully");	 
	             } else {
	          	 growl.error("Something went wrong. Please try again.");
	             }       	   	  
         });
      }
     
     $scope.getVenodrConfiguration = function(cmpny_id) {
    	 
      	
         $('#employeeReferralUploadFile').val("");
      	
         $scope.sessionId=localStorage.getItem('sessionId');
         $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
      	
         services.getVenodrConfiguration(cmpny_id,$scope.sessionId,$scope.loginUserId).then(function(data){
      		
      	   $scope.enableEmployeeReferral = data.data;  
      	   if(data.data.ShowVendorName == 'true' || data.data.ShowVendorName == true ) {
      		 $scope.ShowVendorName = true;
      	   }else{
      		 $scope.ShowVendorName = false;
      	   }
      	   if(data.data.enableBulkUpload == 'true' || data.data.enableBulkUpload == true ) {
      		 $scope.enableBulkUpload = true;
      	   }else{
      		 $scope.enableBulkUpload = false;
      	   }      	  
      	   if($scope.enableEmployeeReferral == 'true') {
         		
         		$scope.showEmpReferralXlUpload = true;
         		$scope.ShowVendorName = true;
         		$scope.enableBulkUpload = true;	
         	   } else {
         		
         		$scope.showEmpReferralXlUpload = false;
         	   
         	   }
         });
      
      }
     var employeeReferralFile = null;
     var vendorReferralFile = null;
    
     $scope.setemployeeReferralUploadedFile = function(fileInput) {
    	 var uploadedFile = null;
    	 var file = fileInput.value;
 		var filename = file.replace(/^.*[\\\/]/, '');
 		$scope.fileName = filename;
 		uploadedFile=$scope.fileName;
 		var fileExt = uploadedFile.substring(uploadedFile.lastIndexOf('.'));
 		if(fileExt==".xls"){
 	   employeeReferralFile =  employeeReferralUploadFile.files[0];
 	  $scope.Invalidxlsfile="N";
 		}else{
 			 $scope.Invalidxlsfile="Y";
 		}
 	};
 	

 	$scope.toggleEmpReferralXlUpload = function() {
 		
         if($scope.enableEmployeeReferral == true) {
     		
     		$scope.showEmpReferralXlUpload = true;
     		$scope.ShowVendorName = true;
     		$scope.enableBulkUpload = true;
     		
     		
     	} else {
     		
     		$scope.showEmpReferralXlUpload = false;
     		$scope.uploadExclpop='no';
     		$scope.companyEmployeeLists=null;
     		employeeReferralFile=null;
     		$scope.referralfile=null
     	}
 		
 	}
 	
 	$scope.resetErrorField = function(){
 		$scope.isRedeemablePointsCheckPass = true;
 		$scope.errorMsgForRedeemablePoints = '';
 	 }
 	
     $scope.toEnableEmployeeReferral = function(companyId) {
     	
     	$scope.sessionId=localStorage.getItem('sessionId');
         $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
         
     	if($scope.enableEmployeeReferral == true || $scope.enableEmployeeReferral == 'true') {
     		
     		$scope.enableEmployeeReferral == 'true'
     		
     		var employeeReferralStatus = 'Y';
     		
     		$scope.selectedEmployeeReferaldisplay = 'Enabled';
     		
     		
     	} else {
     		
     		var employeeReferralStatus = 'N';
     		
     		$scope.selectedEmployeeReferaldisplay = 'Disabled';
     		
     	}
     	
     	$scope.sessionId=localStorage.getItem('sessionId');
     	$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
     	 $activityIndicator.startAnimating();
     	 
     	 if(!$scope.enableIJPUploadReferral){
     		$scope.enableIJPUploadReferral = false;
     	 }
     	 
     	 if($scope.isRedeemablePointsEnable && ($scope.redeemPointsConf.redeemablePointsPerJoinee == null || $scope.redeemPointsConf.redeemablePointsPerJoinee == undefined)){
      		$scope.isRedeemablePointsCheckPass = false;
      		$scope.errorMsgForRedeemablePoints = '* Redeemable points should not be empty';
      		$activityIndicator.stopAnimating(); 
      		return;
      	 }
      	 else if($scope.isRedeemablePointsEnable && $scope.redeemPointsConf.redeemablePointsPerJoinee == 0){
      		$scope.isRedeemablePointsCheckPass = false;
      		$scope.errorMsgForRedeemablePoints = '* Redeemable points should be greater than zero';
      		$activityIndicator.stopAnimating(); 
      		return;
      	 }
      	 else if(!$scope.isRedeemablePointsEnable){
      		$scope.redeemPointsConf.redeemablePointsPerJoinee = 0;
      	 }
     	 
       if($scope.erPointsEnable == true || $scope.erPointsEnable == 'true') { 		
     		$scope.erPointsEnable = 'Y'; 		
     	} else {   		
     		$scope.erPointsEnable = 'N';   		
     	}
       if($scope.erPolicyEnabled != undefined && ($scope.erPolicyEnabled == true || $scope.erPolicyEnabled == 'true')) { 		
    		$scope.erPolicyEnable = 'Y'; 		
    	} else {   		
    		$scope.erPolicyEnable = 'N';   		
    	}
       
       if($scope.enableFindYourSpot) { 		
    		$scope.enableFindYourSpot = 1; 		
    	} else {   		
    		$scope.enableFindYourSpot = 0;   		
    	}
       
       	if($scope.enableHomePage) { 		
       		$scope.enableHomePage = true; 		
       	}else {   		
   			$scope.enableHomePage = false;   		
   		}
       
     	services.enableEmployeeReferral(companyId,growl,employeeReferralFile,employeeReferralStatus,
     			$scope.enableBulkUploadReferral,$scope.enableIJPUploadReferral,$scope.sessionId,$scope.loginUserId,
     			$scope.erPointsEnable, $scope.redeemPointsConf.redeemablePointsPerJoinee,$scope.erPolicyEnable,$scope.enableFindYourSpot,$scope.enableHomePage).
     			then(function(response){
     		//$('#employeeReferral').modal('hide');
     		$activityIndicator.stopAnimating();
     		$('#employeeReferralUploadField').html(' ');
     		
     		$scope.companyEmployeeLists=null;
    		$scope.totalRecordsPresentInWorkSheet=null;
    		$scope.companyEmployeeListLength=null;
    		$scope.uploadExclpop=null;
    		$scope.referralfile=employeeReferralFile;
    		$scope.companyEmployeeLists= response.data.companyEmployeeList;
     		if (response.data.data9 == false) {
     			if(employeeReferralStatus == 'Y' & employeeReferralFile == null) {
     				$('#employeeReferral').modal('hide');
     				 $scope.uploadExclpop="no";
                    growl.success("Employee referral successfully enabled");  
                    employeeReferralFile=null;
                   
                    
                 
              } 
     			else if(employeeReferralStatus == 'Y' & employeeReferralFile != null){
     				$('#employeeReferral').modal('hide');
     				$scope.uploadExclpop="no";
                    growl.success("Employee referral successfully enabled");  
                    employeeReferralFile=null;
                    
     			}
     					
     					else if(employeeReferralStatus == 'N'){
                 
     						$('#employeeReferral').modal('hide');
     						$scope.uploadExclpop="no";
                  growl.success("Employee referral successfully disabled");
              }
     		}else if(response.data.data9 == 'true' || response.data.data9 == true ){
            	  if (employeeReferralStatus == 'Y' && employeeReferralFile != null) {
  	    			$scope.uploadExclpop="no";
  	    			$scope.totalRecordsPresentInWorkSheet= response.data.data10;
		    		$scope.companyEmployeeListLength=$scope.companyEmployeeLists.length;
		    		
  		    		$scope.uploadExclpop="Yes";	  
  		    		$('#uploadEmployeeDataModal').modal('Show');
  	    		}
            	  }
              
    else {
 	          	 growl.error("Something went wrong. Please try again.");
 	          	
 	        }
     		
     	 });
     	
     }


     $scope.setvendorUploadedFile = function(fileInput) {
    	 var uploadedFile = null;
    	 var file = fileInput.value;
 		var filename = file.replace(/^.*[\\\/]/, '');
 		$scope.fileName = filename;
 		uploadedFile=$scope.fileName;
 		var fileExt = uploadedFile.substring(uploadedFile.lastIndexOf('.'));
 		if(fileExt==".xls"){
 	   vendorReferralFile =  vendorReferralUploadFile.files[0];
 	  $scope.InvalidxlsfileV="N";
 		}else{
 			 $scope.InvalidxlsfileV="Y";
 		}
 	};
 	

 	$scope.toggleVendorXlUpload = function() {
 		
         if($scope.enableVendor == true) {
     		
     		$scope.showVendReferralXlUpload = true;
     		//$scope.ShowVendorName = true;
     		
     	} else {
     		
     		$scope.showVendReferralXlUpload = false;
     		$scope.uploadExclpopV='no';
     		$scope.companyEmployeeLists=null;
     		vendorReferralFile=null;
     		$scope.uploadExclpopV=null
     	}
 		
 	}
 	
     $scope.toEnableVendor = function(companyId) {
     	
     	$scope.sessionId=localStorage.getItem('sessionId');
         $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
         
     	if($scope.enableVendor == true || $scope.enableVendor == 'true') {
     		
     		var vendorReferralStatus = 'Y';
     		
     		$scope.selectedVendorReferaldisplay = 'Enabled';
     		
     		
     	} else {
     		
     		var vendorReferralStatus = 'N';
     		
     		$scope.selectedVendorReferaldisplay = 'Disabled';
     		
     	}
     	
     	$scope.sessionId=localStorage.getItem('sessionId');
     	$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
     	 $activityIndicator.startAnimating();
     	 
     	services.enableVendorReferral(companyId,growl,vendorReferralFile,vendorReferralStatus,$scope.ShowVendorName,$scope.enableBulkUpload,$scope.sessionId,$scope.loginUserId).then(function(response){
     	
     		//$('#vendor').modal('hide');
     		$activityIndicator.stopAnimating();
     		$('#vendorUploadField').html(' ');
     		
     		$scope.companyEmployeeLists=null;
    		$scope.totalRecordsPresentInWorkSheetV=null;
    		$scope.companyVendorLength=null;
    		$scope.uploadExclpopVendor=null;
    		$scope.referralfile=vendorReferralFile;


	$scope.companyEmployeeLists=null;
    		$scope.totalRecordsPresentInWorkSheet=null;
    		$scope.companyEmployeeListLength=null;
    		$scope.uploadExclpopVendor=null;
    		$scope.referralfile=vendorReferralFile;

    		$scope.companyvendorLists= response.data.companyVendorList;
     		if (response.data.data9 == false) {
     			if(vendorReferralStatus == 'Y' & vendorReferralFile == null) {
     				$('#vendor').modal('hide');
     				 $scope.uploadExclpopVendor="no";
                    growl.success("Partner login enabled successfully");  
                    vendorReferralFile=null;
                   
                    
                 
              } 
     			else if(vendorReferralStatus == 'Y' & vendorReferralFile != null){
     				$('#vendor').modal('hide');
     				$scope.uploadExclpopVendor="no";
                    growl.success("Partner login enabled successfully");  
                    vendorReferralFile=null;
                    
     			}
     					
     					else if(vendorReferralStatus == 'N'){
                 
     						$('#vendor').modal('hide');
     						$scope.uploadExclpopVendor="no";
                  growl.success("Partner login disabled successfully");
              }
     		}else if(response.data.data9 == 'true' || response.data.data9 == true ){
            	  if (vendorReferralStatus == 'Y' && vendorReferralFile != null) {
					$scope.uploadExclpopVendor="no";
  	    			$scope.totalRecordsPresentInWorkSheetV= response.data.data10;
		    		$scope.companyVendorLength=$scope.companyvendorLists.length;
		    		
  		    		$scope.uploadExclpopVendor="Yes"; 
  		    		$('#showVendReferralXlUpload').modal('Show');
  		    		vendorReferralFile=null;
  		    		
  	    		}
            	  }
              
    else {
 	          	 growl.error("Something went wrong. Please try again.");
 	          	
 	        }
     		
     	 });
     	
     }
     
     $scope.enableBlackListFeature = function(companyId) {
    	 
    	
    	 
    	 
    	 
      	$scope.sessionId=localStorage.getItem('sessionId');
     	$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
     	 $activityIndicator.startAnimating();
     	 
     	
     	services.enableBlackListFeature(companyId,growl,$scope.enableBlackListCompany,$scope.sessionId,$scope.loginUserId).then(function(response){
     		
    		$scope.companyvendorLists= response.data.companyVendorList;
    		$activityIndicator.stopAnimating();
    		$('#BlackListed').modal('hide');
    		if (response.data.responseCode == 200) {
    			
    			if($scope.enableBlackListCompany){
    				growl.success("Black List feature is enabled successfully");	
    			}else{
    				growl.success("Black List feature is disabled successfully");
    			}
     	
     			  
                
     		}
              
     		else {
 	          	 growl.error("Something went wrong. Please try again.");
 	          	
 	        }
     		
     	 })
    	 
     }
     
     
     $scope.enableSalaryBreakupFeature = function(companyId) {
    	 
     	$scope.sessionId=localStorage.getItem('sessionId');
      	$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
      	$activityIndicator.startAnimating();
      	 
      	services.enableSalaryBreakupFeature(companyId,growl,$scope.enableSalaryBreakup,$scope.sessionId,$scope.loginUserId).then(function(response){
      		
     		$scope.companyvendorLists= response.data.companyVendorList;
     		$activityIndicator.stopAnimating();
     		$('#salaryBreakUp').modal('hide');
     		if (response.data.responseCode == 200) {
     			
     			if($scope.enableBlackListCompany){
     				growl.success("Salary Breakup feature is enabled successfully");	
     			}else{
     				growl.success("Salary Breakup feature is disabled successfully");
     			}
      	         
      		}
               
      		else {
  	          	 growl.error("Something went wrong. Please try again.");
  	          	
  	        }
      		
      	 });
     	 
      }
     
     
     $scope.assessmentChangeSettings = function(companyId) {
    	 
      	$scope.sessionId=localStorage.getItem('sessionId');
       	$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
       	$activityIndicator.startAnimating();
       	 
       	services.assessmentChangeSettings(companyId,growl,$scope.assessmentEnable,$scope.sessionId,$scope.loginUserId).then(function(response){
       		
      		$activityIndicator.stopAnimating();
      		$('#assessmentConfigPopUp').modal('hide');
      		if (response.data.code == 200) {
      			if($scope.enableBlackListCompany){
      				growl.success("Assessment is enabled successfully");	
      			}else{
      				growl.success("Assessment is disabled successfully");
      			}
       		}
       		else {
   	          	 growl.error("Something went wrong. Please try again.");
   	          	
   	        }
       		
       	 });
      	 
       }
     
    

	services.getConfiguration($scope.sessionId,cmpId).then(function(data){
		
		if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
			
			growl.error(UNAUTHORIZED_ERROR_MSG);
			$('#logout').click();
			return;
		}

		
		$scope.emailConfiguration = data.data.emailConfiguration;
        $scope.configurationSeo = data.data.configurationSeo;
        $scope.configurationExternalSystem = data.data.configurationExternalSystem;
        $scope.enableOutlookIntigration = $scope.configurationExternalSystem.enableOutlookIntigration;
        $scope.exchangeServiceURL = $scope.configurationExternalSystem.exchangeServiceURL;
        $scope.recruiterNameEnable = $scope.configurationExternalSystem.isShowreferralName;
        $scope.companyCommonConfiguration = data.data.companyCommonConfiguration;     
        $scope.enableBlackListCompany = data.data.companyCommonConfiguration.enableBlackListCompany;     
        $scope.enableSalaryBreakup = data.data.companyCommonConfiguration.enableSalaryBreakup;      
        $scope.assessmentEnable = data.data.companyCommonConfiguration.enableAssessment;
      
    });

      	
    $scope.toEnableRequisition = function(operation){
   
        if($scope.enableRequestApproval){
    		
    		$scope.companyCommonConfiguration.enableRequestApproval = 'Y';
    		
    		if($scope.enableJobCreationOnlyWithRequisition){
    			$scope.companyCommonConfiguration.enableJobCreationOnlyWithRequisition = 'Y';
    		}else{
    			$scope.companyCommonConfiguration.enableJobCreationOnlyWithRequisition = 'N';
    		}
    		
    	} else {
    		
    		$scope.companyCommonConfiguration.enableRequestApproval = 'N';
    		$scope.companyCommonConfiguration.enableJobCreationOnlyWithRequisition = 'N';
    		
    	}
        $scope.companyCommonConfiguration.requisitionJobVisibility = $scope.reqJobVisibility;
        $scope.toChangeCompanyConfigSetting(operation);
    }
    
    $scope.gdprOnChangeFunction = function(){
    	if(!$scope.GDPRFeature){    
    		$scope.GDPRFeature = false;
    	}else{
    		$scope.GDPRFeature = true;
    	}
    	
    }
    
    $scope.saveCompanyCommonConfigurations = function(companyId,GDPRFeature){
    	 $scope.sessionId=localStorage.getItem('sessionId');
    	 $scope.loginUserId=localStorage.getItem('loginUserIdAdmin'); 
    	 $activityIndicator.startAnimating();
    	 services.saveCompanyCommonConfigurations(companyId,$scope.sessionId,$scope.loginUserId,GDPRFeature).then(function(data){
    		 $activityIndicator.stopAnimating();
    		 $('#companyCommonConfigurationsPopUp').modal('hide');
        	 if (data.data.code == 200) {
        		
        		 growl.success("Company information saved successfully",);	 
             }else if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
     			growl.error(UNAUTHORIZED_ERROR_MSG);
     			$('#logout').click();
     			
     		}else {
     			growl.error("Something went wrong. Please try again.");
            }       	   	  
         });
    }
    
    $scope.outlookIntegrationEnableFunction = function(){
    	if(!$scope.enableOutlookIntigration){    
    		$scope.enableOutlookIntigration = false;
    	}else{
    		$scope.enableOutlookIntigration = true;
    	}
    	
    }
    
     $scope.toSetPremiumCompany = function(operation){
        if($scope.isPremium){
    		
    		$scope.companyCommonConfiguration.isPremium = 'Y';
    		
    	} else {
    		
    		$scope.companyCommonConfiguration.isPremium = 'N';
    		
    	}
        
        $scope.toChangeCompanyConfigSetting(operation);
    }
     
     $scope.toSetFreemiumstatus = function(operation){
    	 $scope.sessionId=localStorage.getItem('sessionId');
 		 $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
    	 services.updateCompanyPackageServiceStatus($scope.compnayPackageService,$scope.loginUserId,$scope.sessionId).then(function(response){
    		 if(response.data.code == UNAUTHORIZED){
    	   			growl.error(UNAUTHORIZED_ERROR_MSG);
    		 }else if(response.data.code == 501){
    			 	growl.error("Exception While update package");
    		 }
    		 
    	 });
     }
     
     
     //
     $scope.toSetCompanyReport = function(operation){
	$rootScope.isDefaultWorkflowNameChange = false;
         if($scope.reportStatus){
     		
     		$scope.companyCommonConfiguration.reportStatus = 'Y';
     		
     	} else {
     		
     		$scope.companyCommonConfiguration.reportStatus = 'N';
     		
     	}
         
         $scope.toChangeCompanyConfigSetting(operation);
     }
     
    $scope.isEnableRecruiterWorkflow = function(){ 
    	
    	$rootScope.isDefaultWorkflowNameChange = true;
       
       $scope.companyCommonConfiguration.workflowName = $scope.workflowName.workflowName;
       angular.forEach($scope.departmentList, function(dept) {
    	 
 			 var index = -1;
 			 _.each($scope.workflowNameList, function(data, idx) { 
 				 if (_.isEqual(data.workflowName, $scope.workflowName.workflowName)) {
 					 index = idx;
 					 return;
			   }
			   
			});
 			
 			 dept.recruiterWorkflowMaster = $scope.workflowNameList[index];
 			 dept.workflowName = $scope.companyCommonConfiguration.workflowName;
 		 });
       
    } 

 
    
    $scope.toChangeCompanyConfigSetting = function(operation){
    	$scope.sessionId=localStorage.getItem('sessionId');
    	$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
    	
    	if(typeof $scope.departmentList != 'undefined' && $scope.departmentList && $scope.departmentList.length > 0){
    		$scope.companyCommonConfiguration.departmentList = $scope.departmentList;
    	}
    	
    	$scope.companyCommonConfiguration.isDefaultWorkflowNameChange = $rootScope.isDefaultWorkflowNameChange;
	if($scope.companyCommonConfiguration.departmentList){
    		angular.forEach($scope.companyCommonConfiguration.departmentList, function(dept) {
    			
    			if(dept.isWorkFlowNameChanged == 'Y'){
    				dept.workflowName = dept.recruiterWorkflowMaster.workflowName;
    			} else {
    				//do nothing
    			}
  		
 		 	});
	}
    	services.saveCommonConfiguration($scope.companyCommonConfiguration,growl,$scope.sessionId,$scope.loginUserId).then(function (response) {
    		
   	     $('#requisitionModel').modal('hide'); 
   		 $('#recruiterModel').modal('hide');
		 $('#otherSettingPopUp').modal('hide');
		 
   		 
   		if(response.data.webserviceAPIResponseCode == UNAUTHORIZED){
   			
   			growl.error(UNAUTHORIZED_ERROR_MSG);
   			$('#logout').click();
   			return;
   		}

   		 
	  		   if (response.status == 200 && operation == 'W') {
	  			   growl.success("Recruiter workflow settings changed successfully.");	 
	  			   $scope.getcompantdetails();    
	             } else if (response.status == 200 && operation == 'R') {
	            	 growl.success("Requisition settings changed successfully.");	 
		  			   $scope.getcompantdetails();    
	             } else if (response.status == 200 && operation == 'A') {
	            	 growl.success("Settings saved successfully.");	 
		  			   $scope.getcompantdetails();    
	             }else {
	             
	          	 growl.error("Something went wrong. Please try again.");
	          	
	          	 $scope.getcompantdetails();    
	             }
	  		
	  	     }); 
    }
 
    $scope.isEnableRequisition = function(){
    	
    	 if(!$scope.enableRequestApproval){
    		 $scope.enableRequestApproval = false;
    		 $scope.enableJobCreationOnlyWithRequisition = false;
    }
    
    }
    	 
    	 $scope.isSetPremiumCompany = function(){
    	    	
        	 if(!$scope.isPremium){
        		 $scope.isPremium = false;
        	 }
    
    }
    	 
  //  	 
   $scope.isEnabledCompanyPDF = function(){ 	
   if(!$scope.reportStatus){
       $scope.reportStatus = false;
     }
    }


	$scope.freemiumEnableOnClick = function () {
		
			if (!$scope.freemiumEnable) {
				$scope.freemiumEnable = false;
			}
		} 
   // 
    
   // 	 
    $scope.backtoCompanyList = function() {
    	$("body,html").animate({scrollTop: companyListPaaageYaxisOffeset}, "slow");
    	
		}

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.format="dd-MMMM-yyyy";
  $scope.dates = [{date:'01-05-2001'}, {date:'05-05-2014'}, {date:'10-11-2008'}]
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yyyy',
      startingDay: 1,
      showWeeks:'false'
    };
   
    $scope.dotCheck="true";
    $scope.checkDotValidation=function(){
		 if($scope.CompanyData.website.contains("."))
			 {
			 $scope.dotCheck="true";
			 }else{
				 $scope.dotCheck="false";
			 }
		
	 }
	
    $scope.checkWebSiteOrDomainDuplication = function() { 
    	 $scope.webSiteCheck=true;
    	services.checkWebSiteOrDomainDuplication($scope.CompanyData.id,$scope.CompanyData.website,$scope.CompanyData.domainName).then(function (response) {
    	
    	if(response.data.code==201){
    		 $scope.webSiteCheck=false;
    	}
    	});
    };
	
$scope.getRewardProvider = function(companyId) {
    var companyProviderlist;
	 services.getactiveRewardProviderlist(companyId).then(function(data){
    		 companyProviderlist=data.data;
		   });
	 
    	services.getAllRewardProvider().then(function(data){
			var providerList=[];
			
			for (var i = 0; i < data.data.length; i++) {
				var ischecked=false;
				  for (var j = 0; j < companyProviderlist.length; j++) {
				         if(companyProviderlist[j].masterTypeId==data.data[i].id)
						   ischecked=true;
					  	 }
				   if(ischecked)
				    data.data[i].checked = true;
					providerList.push(data.data[i]);
             }
		$scope.rewardProviderList= providerList;
			
			});
    	
    }
$scope.saverewardprovider = function(companyId) {
    var providersId = [];

			 for (var i = 0; i < this.rewardProviderList.length; i++) {
				 if (this.rewardProviderList[i].checked) {
					 providersId.push(this.rewardProviderList[i].id);
				}
			 }
	 		services.saveRewardproviderdata(companyId,providersId).then(function(data){
					 if (data.data.code == 200 ) {
						  growl.success("Reward provider saved successfully");	 
							 $('#reedeempoints').modal('hide');
						  $scope.getRewardProvider();
						} else {

							 growl.error("Something went wrong. Please try again.");
						 }

			  });
	}
    
    $scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
   
    $scope.saveCompany = function($valid) {
    	$activityIndicator.startAnimating();
		if($scope.configurationExternalSystemcompany.linkedInCompanyId){
			var linkedinId = $scope.configurationExternalSystemcompany.linkedInCompanyId;
		}
		if($scope.configurationExternalSystemcompany.distributionName){
			var distributionName = $scope.configurationExternalSystemcompany.distributionName;
		}
    	if($valid){
    		$scope.CompanyData.linkedInDistributionName = distributionName;
    		$scope.CompanyData.linkedInCompanyId = linkedinId;
    		$scope.CompanyData.dateOfRegistration = $filter('date')(new Date($scope.CompanyData.dateOfRegistration), 'yyyy-MM-dd');
    		$scope.companySuccess=true;
   	
    		
    	services.saveCompany($scope.CompanyData,$scope.loginUserId).then(function (response) {
    				
    		if($rootScope.companyEditIndex != undefined){
    			$rootScope.company[$rootScope.companyEditIndex] = $scope.CompanyData;
    		}
    			
    		
    		  if (response.status == 200) {
    			  $scope.companySuccess=true;
	             
	             } else {
	            	 $scope.companySuccess=false;
	             }
    	});
    	if( $scope.companySuccess){
    	services.saveJobOrCompanyMasterDetails("Company",$scope.CompanyData.id,$scope.CompaniesFields).then(function(data){
    		$activityIndicator.stopAnimating();
			 if (data.data.code == 200 ) {
	  			  	 console.log("saved");
				  growl.success("Company information edited successfully");	 
		  			 $('#editCompany').modal('hide');
		  			$scope.CompaniesFields={};
	             } else {
	             
	            	 growl.error("Something went wrong. Please try again.");
	             }
			 });
    	}
    }
    }
    
    $scope.userNameList = {};
    services.getAllUsersName().then(function (response) {
    		$scope.userNameList = response.data;
    });
    
    
/*Offer Fitment Fields Configuaration Code Start*/
  $scope.changeWorkflow = function(companyId)
  {
		$activityIndicator.startAnimating();
	  var workflowName;
	  workflowName = $scope.workflowName.workflowName;
	  services.getOfferFitmentFieldsConfiguration(companyId,workflowName).then(function(data){
	    	 $scope.fitmentFieldsConfiguration = data.data;
	    	 $scope.r1 = [];
	    		$activityIndicator.stopAnimating();
	    	 $scope.fileds = [{"filedName" :'First Name'} ,
	 			{"filedName" :'Last Name'},
	 			{"filedName" : 'Current CTC'},
	 			{"filedName" : 'Expected CTC'},
	 			{"filedName" : 'Offered CTC'},
	 			{"filedName" : 'Reason For Leaving'},
	 			{"filedName" : 'Qualification'}, 
	 			{"filedName" : 'Relevant Experience'},
	 			{"filedName" : 'Grade'},
	 			{"filedName" : 'Designation'},
	 			{"filedName" : 'Joining Location'},
	 			{"filedName" : 'Justification'}
	 		];
	    		
	    		var listval =null;
				for(i in $scope.fitmentFieldsConfiguration){
					
					if($scope.fitmentFieldsConfiguration[i]["isVisibleByDefault"]  == 'Y'){

						if(listval == null){
							listval = $scope.fitmentFieldsConfiguration[i]["fieldName"];
						}else{
							listval = listval + ','+ $scope.fitmentFieldsConfiguration[i]["fieldName"];
						}
					}
				}
				if($scope.fileds != null && $scope.fileds.length > 0 ){
					for(var a in $scope.fileds){
						if(listval.indexOf($scope.fileds[a]["filedName"]) === -1){
						
							$scope.r1.push({"filedName" :$scope.fileds[a]["filedName"] });
						}
					}
					}
							
							$scope.fileds = $scope.r1;
						
	    });
	  
  }
  
  $scope.getWorkflow = function(cmpny_id)
  {
	  
	  $rootScope.isDefaultWorkflowNameChange = false;
		
  	services.getRecruiterConfig(cmpny_id,$scope.sessionId,$scope.loginUserId).then(function(data){
  		
  		if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
  			
  			growl.error(UNAUTHORIZED_ERROR_MSG);
  			$('#logout').click();
  			return;
  		}


  		$scope.companyCommonConfiguration = data.data;
  		$scope.workflowName = $scope.companyCommonConfiguration.workflowName;
  		
  	services.getRecruiterWorkflowMaster($scope.sessionId,$scope.loginUserId).then(function(data){
  		
  		if(data.data.webserviceAPIResponseCode == UNAUTHORIZED){
  			growl.error(UNAUTHORIZED_ERROR_MSG);
  			$('#logout').click();
  			return;
  		}
  		
  		$scope.workflowNameList = data.data;
  		
   		var index = -1;

			_.each($scope.workflowNameList, function(data, idx) { 
			   if (_.isEqual(data.workflowName, $scope.workflowName)) {
			      index = idx;
			      return;
			   }
			});
			 
			$scope.workflowName = $scope.workflowNameList[index];
  	
  	});
  	
    $scope.insertFields(cmpny_id , $scope.workflowName);
  	
  	});
  	
  	
	  
  }
  
    $scope.insertFields =  function(companyId,workflowName)
    
    {
    	
    		services.getOfferFitmentFieldsConfiguration(companyId,workflowName).then(function(data){
    	    	 $scope.fitmentFieldsConfiguration = data.data;
    	    	 $scope.r1 =[];
    	    	  $rootScope.err = false;
    			  $rootScope.errDupFieldOpt = false;
    	    	 $scope.fileds = [{"filedName" :'First Name'} ,
    	 			{"filedName" :'Last Name'},
    	 			{"filedName" : 'Current CTC'},
    	 			{"filedName" : 'Expected CTC'},
    	 			{"filedName" : 'Offered CTC'},
    	 			{"filedName" : 'Reason For Leaving'},
    	 			{"filedName" : 'Qualification'}, 
    	 			{"filedName" : 'Relevant Experience'},
    	 			{"filedName" : 'Grade'},
    	 			{"filedName" : 'Designation'},
    	 			{"filedName" : 'Joining Location'},
    	 			{"filedName" : 'Justification'}
    	 		];
    	    	 
    	    	 $scope.fieldOptions = [];
    	    	 var listval =null;
    	    	 
					for(i in $scope.fitmentFieldsConfiguration){
						if($scope.fitmentFieldsConfiguration[i]["isVisibleByDefault"]  == 'Y'){
					
							if(listval == null){
								listval = $scope.fitmentFieldsConfiguration[i]["fieldName"];
							}else{
								listval = listval + ','+ $scope.fitmentFieldsConfiguration[i]["fieldName"];
							}
						}
						$scope.optionAlreadySelected = null;
						$scope.fieldOptionsForRule = [];
						
						if($scope.fitmentFieldsConfiguration[i]["isMandatory"]  == 'Y' && ($scope.fitmentFieldsConfiguration[i]["fieldType"] == "C"|| $scope.fitmentFieldsConfiguration[i]["fieldType"] == "R" || $scope.fitmentFieldsConfiguration[i]["fieldType"] == "D")){

							$scope.values = {"id":$scope.fitmentFieldsConfiguration[i]["id"],"value":$scope.fitmentFieldsConfiguration[i]["fieldName"],"index":$scope.fitmentFieldsConfiguration[i]["fieldOrder"]-1};
							 $scope.fieldOptionsForRule.push($scope.values);
							 if(typeof $scope.ruleConfiguration != "undefined" && $scope.ruleConfiguration != "" && $scope.ruleConfiguration != null && $scope.ruleConfiguration != undefined && $scope.ruleConfiguration.reqFieldId == $scope.fitmentFieldsConfiguration[i]["id"]){
								 $scope.optionAlreadySelected = $scope.values;
							 }
							
						}
						
					if($scope.fitmentFieldsConfiguration[i]["fieldOptions"] != null){
						var inviteCandidateTagsSplit = $scope.fitmentFieldsConfiguration[i]["fieldOptions"].split(',');
						for(j in inviteCandidateTagsSplit){
					
							  $scope.reqOpt = {"text":inviteCandidateTagsSplit[j],
									  		   "value":inviteCandidateTagsSplit[j],
									  			"fieldName":$scope.fitmentFieldsConfiguration[i]["fieldName"],
									  			"fieldType":$scope.fitmentFieldsConfiguration[i]["fieldType"],
									  			"index":i
									  			};
							  $scope.fieldOptions.push($scope.reqOpt); 
						}
						}
						
					 }
					if($scope.fileds != null && $scope.fileds.length > 0 ){
					for(var a in $scope.fileds){
						if(listval.indexOf($scope.fileds[a]["filedName"]) === -1){
						
							$scope.r1.push({"filedName" :$scope.fileds[a]["filedName"] });
						}
					}
					}
							
							$scope.fileds = $scope.r1;
		   					$scope.laoderLoad = false;
    	    	 
    	    	 
    	    });
    		
    	
} 
    
    $scope.addReqFieldRow = function (index) {
    	
    	$rootScope.saveReqLevel = $rootScope.requisitionlevel;
    	$scope.configsubmit=false;        
         index=index+1;
         var added = {	"text":null,
			  		   	"value":null,
			  			"fieldName":null,
			  			"fieldType":null,
			  			"fieldOrder":index
			  		 };
            
         var jobNoteList = $scope.fitmentFieldsConfiguration;    
         jobNoteList.splice(index,0,added); 
   	     $scope.fitmentFieldsConfiguration = jobNoteList;
     };
     
   //initialize data. you would normally use a $http.get() here
     
	 $scope.newFitmentSortIndexes = [];   
	  // add sortable to <ul>
	  var fitmentSort = document.getElementById("fitment-Sort");
	  new Sortable(fitmentSort, {
		 
	    onUpdate: function (evt){
	      // get new sort order based on indexes
	      var newFitmentSortIndexes = [];
	      var liElements = fitmentSort.getElementsByTagName("li");
	      for (var i=0; i<liElements.length; i++) {
	    	  newFitmentSortIndexes.push(liElements[i].getAttribute('data-index'));
	      }
	      
	      // process change
	      $scope.newFitmentSortIndexes = newFitmentSortIndexes;
	      $scope.fitmentFieldsConfiguration = getSorted($scope.fitmentFieldsConfiguration, newFitmentSortIndexes);
	      $scope.$apply();
	    }
	  });  
     
 
   // ///////////////////////////////////////
	  $scope.newPartnerSortIndexes = [];   
	  // add sortable to <ul>
	  var partnerSort = document.getElementById("partner-Sort");
	  new Sortable(partnerSort, {
		 
	    onUpdate: function (evt){
	      // get new sort order based on indexes
	      var newPartnerSortIndexes = [];
	      var liElements = partnerSort.getElementsByTagName("li");
	      for (var i=0; i<liElements.length; i++) {
	    	  newPartnerSortIndexes.push(liElements[i].getAttribute('data-index'));
	      }
	      
	      // process change
	      $scope.newPartnerSortIndexes = newPartnerSortIndexes;
	      $scope.partnerFieldsConfiguration = getSorted($scope.partnerFieldsConfiguration, newPartnerSortIndexes);
	      $scope.$apply();
	    }
	  });  
     
     
     $scope.deleteReqCustomFieldRow = function (data) {
		 $scope.addNew = false;
		 $scope.addNewOpt = false;
		 var listVal1 ="Grade,Joining Location,Justification,Role,Maximum Years Of Experience,Minimum Years Of Experience,Tags,Designation,Qualification,Salary,Reference Number,Short Descripton,Offered CTC,Remarks";
		 $scope.displayFieldSelect = false;
	        var index = $scope.fitmentFieldsConfiguration.indexOf(data);
	        $scope.fitmentFieldsConfiguration.splice(index, 1);
	    
	        if(listVal1 != null && data.fieldName != null && data.fieldName != "" && data.fieldName != 'null'
	        	&& typeof data.fieldName != "undefined" && data.fieldName != undefined){
				if(listVal1.indexOf(data.fieldName) > -1){
					$scope.fileds.push({"filedName" :data.fieldName });
				}
				
	        }
	       
	    };
	    
	    $scope.checkAddNew = function(fieldName,index,option,data,reqLevelAddNew) {
			  $rootScope.err = false;
			  $scope.results = null;
		  if(option == 'S'){
				
					  if(fieldName == "?undefined:undefined?") {
				
				      $scope.addNew = true;
				      $scope.indexReq = index;
				    } else {
				      $scope.addNew = false;
				    if(fieldName != "" && typeof fieldName != "undefined" && fieldName != undefined && fieldName != null && fieldName != 'null'){
				      $scope.results = $filter('filter')($scope.fitmentFieldsConfiguration, {fieldName : fieldName}, true);
				    
				  if($scope.results  != null && $scope.results  != "" && $scope.results  != "null" && typeof $scope.results  != "undefined"){
			
					  $rootScope.err = true;
					  $scope.eqIndex = index;

				  }else{
					  
					  var visibl = 'N';
					  if(fieldName == 'Designation'  || fieldName == 'Offered CTC' || fieldName == 'Joining Date' 
						  || fieldName == 'Joining Location' || fieldName == 'Justification' || fieldName == 'Remarks' || fieldName == 'Notice Period'){
						  data["fieldType"] = 'T';
						  visibl = 'Y';
					  }else if(fieldName == 'Grade'){
						  
						 visibl = 'Y';
					  }else{
						  visibl = 'N';
					  }
					  
					  
				  $scope.newOption = {"isVisibleByDefault":visibl, "fieldType":data["fieldType"],"fieldName":fieldName};	
				 
				  angular.extend(data, $scope.newOption);
				  $scope.addNew = false;
				  if($scope.fieldOptions){
						 for(a in $scope.fieldOptions){
							
				  if($scope.fieldOptions[a]["fieldName"] == null || $scope.fieldOptions[a]["fieldName"] == "null" || typeof $scope.fieldOptions[a]["fieldName"] == "undefined" || $scope.fieldOptions[a]["fieldName"] == undefined || $scope.fieldOptions[a]["fieldName"] == ""){
					  $scope.fieldOptions[a]["fieldName"] = fieldName;
				  }
				  }
						 }
				  }
				 
				  for(var a in $scope.fileds){
					  if($scope.fileds[a]["filedName"] == fieldName){
						  
					  var index = $scope.fileds.indexOf($scope.fileds[a]);
					  $scope.fileds.splice(index, 1);   
					  }
				  }
				    }
				  }
					
			  }else{
				  if(fieldName == "?undefined:undefined?") {
						
					
				      $scope.addNewOpt = true;
				      $scope.indexReqOpt = index;
				    } else {
				      $scope.addNewOpt = false;
				    }
				 // $('#selectFieldOptions' + index).val("");
			  }
		  }
	    
	      $scope.ind = "";
		  $scope.newfieldOpt = "";
		  $scope.dataIn = "";
		  $scope.reqlevelIn = "";
		  $scope.enterPressedForReqCustFields = false;
			 $scope.blockDropDownCustFieldsAdd = function(event,opt,value,index,data,reqlevel) {
				 if(event.keyCode == 13){ 
					 event.preventDefault();
					 $scope.enterPressedForReqCustFields = true;
				 $scope.ind = index;
				  $scope.newfieldOpt = value;
				  $scope.dataIn = data;
				  $scope.reqlevelIn =reqlevel;
					 $timeout(function() {
						
							 if(opt =='O'){
						    $('#addFieldClick').click();
							 }
						}, 0);
					 $scope.fieldOptionsList = "";
					 
				 }
		 }
	    $scope.fieldOptions = [];
	    $scope.fieldDropdownForRule = [];
		  $scope.errAddOption = false;
		  $scope.errAddOptionTitle = false;
	    $scope.addToDropDown = function(value,index,option,data,reqLevelAddNew) {
			  
			  $rootScope.err = false;
			  $rootScope.errDupFieldOpt = false;
			  if($scope.enterPressedForReqCustFields == true && ($scope.newfieldOpt != null && $scope.newfieldOpt !== "" && typeof $scope.newfieldOpt !="undefined" && $scope.newfieldOpt != "null" && $scope.newfieldOpt != undefined &&
					  $scope.ind != null && $scope.ind !== "" && typeof $scope.ind !="undefined" && $scope.ind != "null" && $scope.ind != undefined)){
			  value = $scope.newfieldOpt;
			  index = $scope.ind;
			  data = $scope.dataIn ;
			  reqLevelAddNew = $scope.reqlevelIn ;
			  $scope.enterPressedForReqCustFields = false;
			  }
			  if(value != null){
				  $scope.errAddOption = false;  
				  $scope.errAddOptionTitle = false;
			  if(option == 'S'){
				  $scope.checkAddNew(value,index,'S',data,reqLevelAddNew);
		
			  }else{
				  if($scope.fieldOptions){
					 
					  
						      $scope.results = $filter('filter')($scope.fieldOptions, {"value":value,"index":index});
						    
						  if($scope.results  != null && $scope.results  != "" && $scope.results  != "null" && typeof $scope.results  != "undefined"){
					
							  $rootScope.errDupFieldOpt = true;
							  $scope.eqIndexDupField = index;

						  }else{
						
					  $scope.reqOpt = {"text":value,"value":value,"fieldName":data["fieldName"],"fieldType":data["fieldType"],"index":index};
					  $scope.fieldOptions.push($scope.reqOpt);
					  $scope.fieldDropdownForRule.push($scope.reqOpt);
						  }
					   
				  }else{
					  $scope.fieldOptions = {"text":value,"value":value,"fieldName":data["fieldName"],"fieldType":data["fieldType"],"index":index};
					  $scope.fieldDropdownForRule = {"text":value,"value":value,"fieldName":data["fieldName"],"fieldType":data["fieldType"],"index":index};

				  }
				  $scope.addNewOpt = false;
			  }
			  value = '';
			  }else{
				  if(option == 'S'){
					  $scope.errAddOptionTitle = true;
				  }else{
					  $scope.errAddOption = true;
				  }
				 
				  $scope.errAddOptionIndex = index;
			  }
			  
		  }
     
	    $scope.saveFitmentConfiguration = function(companyId)
	    {
	    	$activityIndicator.startAnimating();
	    	$scope.companyId = companyId;
	    	for(i=0;i<$scope.fitmentFieldsConfiguration.length;i++){
	    		
	    		$scope.fitmentFieldsConfiguration[i].workflowName = $scope.workflowName.workflowName;
	    		$scope.fitmentFieldsConfiguration[i].fitmentConfigurationName = $scope.fitmentConfigName;
	    	}
	    	
	    	for(tech in $scope.fitmentFieldsConfiguration){
				if($scope.fieldOptions != null){
					 for(a in $scope.fieldOptions){
						if($scope.fitmentFieldsConfiguration[tech]["fieldType"] == $scope.fieldOptions[a]["fieldType"] && $scope.fitmentFieldsConfiguration[tech]["fieldName"] == $scope.fieldOptions[a]["fieldName"]){
						if($scope.fitmentFieldsConfiguration[tech]["fieldType"]){
							if($scope.fitmentFieldsConfiguration[tech]["fieldOptions"] != undefined){
							var fieldOptIndex = $scope.fitmentFieldsConfiguration[tech]["fieldOptions"].split(",");
							}
							var fieldSingle =$scope.fieldOptions[a]["value"];
				
							if($scope.fitmentFieldsConfiguration[tech]["fieldOptions"] && fieldOptIndex.indexOf(fieldSingle) === -1){
								$scope.fitmentFieldsConfiguration[tech]["fieldOptions"] = $scope.fitmentFieldsConfiguration[tech]["fieldOptions"] + "," + $scope.fieldOptions[a]["value"] ;
							}else{ 
								$scope.fitmentFieldsConfiguration[tech]["fieldOptions"] = $scope.fieldOptions[a]["value"] ; 
						   }
							
						}
						}
					}
				}
			}
	    	
	    	services.saveOfferFitmentFields($scope.fitmentFieldsConfiguration,$scope.companyId,$scope.workflowName.workflowName).then(function(response){
	    		$activityIndicator.stopAnimating();
		    	 if(response.data.code == 200){
		    		 $('#offerFitmentFieldsConfigurationModal').modal('hide');
		    		 growl.success(ClientAdminOfferFitmentConfigurationSuccess);
		    	 }
	    	});
	    }
    
	   /* Offer fitment fields configuration code end*/
	    
	    $scope.getPartnerFieldsConfiguration = function(companyId){
	    	$scope.companyId = companyId ;
	    	$scope.type = "admin";
	    	services.getPartnerFieldsConfiguration($scope.companyId,$scope.type).then(function(data){
	    		if(data.status == 200){
		    		$scope.partnerFieldsConfiguration = data.data.partnerFieldsConfiguration;
		    		}
	    	});
	    }
	    
	    $scope.savePartnerFieldsConfiguration = function(companyId){
	    	$scope.companyId = companyId;
	    	$activityIndicator.startAnimating();
	    	services.savePartnerFieldsConfiguration($scope.partnerFieldsConfiguration,$scope.companyId).then(function(response){
	    		$activityIndicator.stopAnimating();
		    	 if(response.data.code == 200){
		    		 $('#partnerFieldsConfigurationModal').modal('hide');
		    		 growl.success(ClientAdminPartnerFieldsConfigurationSuccess);
		    	 }
	    	});
	    }
	    $scope.obj = {};
	    $scope.obj.fitmentTemplateName ="";
	    $scope.obj.fitmentTemplateFile;
	    $scope.obj.ERTemplateName = "";
	    $scope.obj.ERTemplateFile;
	    $scope.file_changed = function(element){
	    	var file = element.files[0];
	    	$scope.obj.fitmentTemplateFile = file;
	    }
	    $scope.file_changed1 = function(element){
	    	var file = element.files[0];
	    	$scope.obj.ERTemplateFile = file;
	    }
	    $scope.saveFitmentTemplate = function(companyId){
	    	
	    	$scope.companyId = companyId;
	    	$scope.sessionId=localStorage.getItem('sessionId');
	    	var templateName = $scope.obj.fitmentTemplateName;
	    	var fitmentTemplateFile = $scope.obj.fitmentTemplateFile;
	    	
			$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
	    	services.saveFitmentTemplate($scope.companyId,templateName,fitmentTemplateFile,$scope.sessionId,$scope.loginUserId).then(function(response){
		    	 if(response.data.code == 200){
		    		 growl.success(response.data.message);
		    		 $scope.fitmentUploadForm.$setPristine();
		    		 $scope.obj = {};
		    	 }
		    	 else{
		    		 growl.error(response.data.message);
		    	 }
	    	});
	    }
	    
	    $scope.saveEmployeeReferralTemplate = function(companyId){
	    	
	    	$scope.companyId = companyId;
	    	$scope.sessionId=localStorage.getItem('sessionId');
	    	var templateName = $scope.obj.ERTemplateName;
	    	var ERTemplateFile = $scope.obj.ERTemplateFile;
	    	
			$scope.loginUserId=localStorage.getItem('loginUserIdAdmin');
	    	services.saveEmployeeReferralTemplate($scope.companyId,templateName,ERTemplateFile,$scope.sessionId,$scope.loginUserId).then(function(response){
		    	 if(response.data.code == 200){
		    		 growl.success('File uploaded successfully!!');
		    		 $scope.fitmentUploadForm.$setPristine();
		    		 $scope.obj = {};
		    	 }
	    	});
	    }
	    
});





ccubeApp.controller('updateCtrl',['$scope','$rootScope','$http', function($scope,$rootScope,$http,services,localStorageService,growl){
	$scope.from;
	$scope.to;
	$scope.cid;

	
	$scope.updateDb = function(){
	var data = $.param({
	startDate:$scope.from,
	endDate:$scope.to,cId:$scope.cid});

	var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};  
	$http.post('/adminAPI/updateDb/', data, config)
	        .then(function (data, status, headers, config) {   

	        $('#myUpdate').modal('hide');
	        alert("Success");
	       })
	       .catch(function (data, status, header, config) {
	      alert("failed");
	       }); 
	}
	//updateDb2
	$scope.updateDb2 = function(){
		var data = $.param({
		startDate:$scope.from,
		endDate:$scope.to,cId:$scope.cid});
		
		var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};  
		$http.post('/adminAPI/updateDb2/', data, config)
		        .then(function (data, status, headers, config) {   
		          
		        $('#myUpdate').modal('hide');
		        alert("Success");
		       })
		       .catch(function (data, status, header, config) {
		      alert("failed");
		       }); 
		}
	
	
	$scope.importStatisticsDb = function(){
		var data = $.param({
		startDate:$scope.from,
		endDate:$scope.to,cId:$scope.cid});
		var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};  
		$http.post('/adminAPI/importStatisticsDb/', data, config)
		        .then(function (data, status, headers, config) {   
		          
		        $('#myUpdate').modal('hide');
		        alert("Success");
		       })
		       .catch(function (data, status, header, config) {
		      alert("failed");
		       }); 
		}
	
	}]);
//Rescoring
ccubeApp.controller('rescoringCtrl',['$scope','$rootScope','$http','services','growl', function($scope,$rootScope,$http,services,localStorageService,growl){
$scope.from;
$scope.to;
$scope.rangefrom;
$scope.rangeto;
$scope.nullable;
$scope.reScore = function(){
	
var data = $.param({
startDate:$scope.from,
endDate:$scope.to,
startScore:$scope.rangefrom,
endScore:$scope.rangeto,
includeNull:$scope.nullable
});
var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};  
$http.post('/adminAPI/reScore/', data, config)
        .then(function (data, status, headers, config) {   
        if(data.status == -100){
        alert("Session expired.Please login again to continue.");
        window.location.href="login.html"; 
        }       
        $('#score').prop("disabled",false);
        alert("Success");
        $('#myModal').modal('toggle');
       })
       .catch(function (data, status, header, config) {
    	   $('#score').prop("disabled",false);
    	   alert("failed");
    	   $('#myModal').modal('toggle');
       }); 	
	
}

$scope.appliesMigrationToMongoDb = function(){

		services.appliesMigrationToMongoDb($scope.companyIds,$scope.from,$scope.to,$scope.ids,$scope.workflowName,$scope.pastActions).then(function(response){
			 $('#score').prop("disabled",false);
		  if (response.data.code == 200) {
			    alert("Success");
			    $('#myModal').modal('toggle');
             
             } else {
            	 alert("failed");
            	 $('#myModal').modal('toggle');
             }
		});
}

$scope.reCreateFinalActions = function(){

	services.reCreateFinalActions($scope.companyIds,$scope.from,$scope.to,$scope.ids).then(function(response){
		 $('#score').prop("disabled",false);
	  if (response.data.code == 200) {
		    alert(response.data.message);
		    $('#myModal').modal('toggle');
         
         } else {
        	 alert("failed");
        	 $('#myModal').modal('toggle');
         }
	});
}

$('#score').click(function(){
	$('#score').prop("disabled",true);
});
}]);

//Quikr Data Migration
ccubeApp.controller('quikrDataMigrationCtrl',['$scope','$rootScope','$http','services','localStorageService','growl', function($scope,$rootScope,$http,services,localStorageService,growl){
$scope.from;
$scope.to;
$scope.rangefrom;
$scope.rangeto;
$scope.nullable;
$scope.format="dd/MM/yyyy";
$scope.dates = [{date:'01-05-2001'}, {date:'05-05-2014'}, {date:'10-11-2008'}]
  $scope.openfromdate = function($event) {
	$scope.selectedDate = null;
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openedfromdate = true;
    $scope.dtmax = new Date();
  };
  
  $scope.opentodate = function($event) {
		$scope.selectedDate = null;
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.openedtodate = true;
	    $scope.dtmax = new Date();
	  };
	 $scope.quikrDataMigration = function(){
	 $scope.dateval =  $scope.fromDate;
     $scope.day = ("0" + $scope.dateval.getDate()).slice(-2)
     $scope.month = ("0" + ($scope.dateval.getMonth()+1)).slice(-2)
     $scope.year = $scope.dateval.getFullYear();
     $scope.fdate = $scope.year + '-' + $scope.month + '-' + $scope.day;
     $scope.dateval =  $scope.toDate;
     $scope.day = ("0" + $scope.dateval.getDate()).slice(-2)
     $scope.month = ("0" + ($scope.dateval.getMonth()+1)).slice(-2)
     $scope.year = $scope.dateval.getFullYear();
     $scope.edate = $scope.year + '-' + $scope.month + '-' + $scope.day;
     $scope.startDate=$scope.fdate;
     $scope.endDate=$scope.edate;
/*var data = $.param({
startDate:$scope.fdate,
endDate:$scope.edate

});*/

services.quikrDataMigration($scope.startDate,$scope.endDate).then(function(response){
	if(response.data.code==200)
	{}
else if(response.data.code == 501){ 
	 growl.error("Something went wrong. Please try again");
} else {
    growl.error("Something went wrong. Please try again.");
} 

});


$("#quikrDataMigration").modal("hide");
$scope.fromDate=null;
$scope.toDate=null;


 growl.success("Request sent successfully");

 

 
     
/*var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};  
$http.post('/adminAPI/quikrDataMigration/', data, config)

        .then(function (data, status, headers, config) {
        	$scope.from = null;
        	$scope.to = null;
        	if(data.status == -100){
        		 alert("Session expired.Please login again to continue.");
        	    window.location.href="login.html"; 
        	    }  
            $('#quikrSubmit').prop("disabled",false);
            $('#quikrDataMigration').modal('toggle');
        	growl.success("Request sent successfully");
       })
       .catch(function (data, status, header, config) {
    	   $scope.from = null;
       	   $scope.to = null;
    	   $('#quikrSubmit').prop("disabled",false);
    	   $('#quikrDataMigration').modal('toggle');
    	   growl.error("Something went wrong. Please try again");
       }); 	*/
}

/*$('#quikrSubmit').click(function(){
	$('#quikrSubmit').prop("disabled",true);
});*/
}]);