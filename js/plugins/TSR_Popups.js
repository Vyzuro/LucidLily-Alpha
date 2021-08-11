//==========================================================================================
//=== TSR_Popups === A Plugin by The Northern Frog =========================================
//==========================================================================================

var TSR = TSR || {};
TSR.Popups = TSR.Popups || {};
TSR.Popups.version = 1.26;

var Imported = Imported || {};
Imported.TSR_Popups = true;

//==========================================================================================

/*:
 * @plugindesc v1.2.6 Provide multiple options for battle Popups.
 * @author TSR, The Northern Frog, 2020      
 * @help 
 * =========================================================================================
 * == About this Plugin ====================================================================
 * =========================================================================================
 * In addition to default engine popups, this Plugin will add:
 * 
 * EFFECT POPUPS
 * These includes Elemental Response popups (weak, resist, immune), a State
 * 'no effect' popup, and Overkill and Critical Hit popups.
 *
 *
 * TP POPUPS
 * This Plugin add TP damage/recovery to the Battle popups mechanic. Using
 * Notetags, you can now add 3 new Damage Types to your skills and items:
 *               
 *             TP Damage, TP Recovery and TP Drain.
 *
 * The Notetags will work independently of the damage type set in the skill/
 * item database so you can combine them. 
 *
 *         Exemple: A skill that deal HP damage and drain TP.
 * 
 * In the above exemple, the Target will lose both HP and TP while the user
 * will receive TP, and all popups will be shown accordingly.
 * 
 *      *Note that you can still use the Default editor skills/items
 *       effects. If you put a 'TP gain' effect on an item, popup will
 *       show accordingly without the need of any Notetags.
 *
 *
 * MP NOTETAGS
 * The Plugin also provide the same Notetags for MP. The reason for this  
 * is to give the option to combine MP damage to HP damage and/or TP damage. 
 *
 *
 * HP REGENERATE ELEMENT NOTETAG
 * You can put this notetag in a State notebox to give elemental effect to
 * the Hp regeneration rate X-Param of the State.  
 *
 *
 * NEW DAMAGE SPRITE SHEET
 * A new Damage sprite sheet called 'TSR_Damage' is used by this Plugin to
 * add various visual features to Battle popups. The sheet can be downloaded
 * for free on https://the-northern-frog.itch.io/. It is to be place in the  
 * img/system folder of your project.
 * 
 *
 * TEXT STRING POPUPS
 * Alternatively, you can use text string for battle popups. For each 
 * popup types, you can decide if you want it to be drawn from the sprite
 * sheet or as text string.
 *
 *
 * YANFLY ENGINE PLUGINS
 * If you're using YEP_BattleEngineCore, place TSR_Popups bellow it in the Plugin Manager, 
 * with all other battle-related Yanfly Plugins bellow.
 *
 *
 * =========================================================================================
 * == New Popups Visual Features ===========================================================
 * =========================================================================================
 * The Plugin provide a variety of visual features that can be
 * added to the Battle Scene. Bellow is a short explanation for 
 * each of them.
 *
 * MP/TP 'operators' and 'letters'
 * ===============================
 * This is for MP and TP sprite sheet popups. The Operators draw a 
 * minus '-' sign in front of damage popups and a plus '+' sign in
 * front of healing values. The Letters shows either 'MP' or 'TP',
 * depending of the affected stat, following the damage/recovery
 * popups.
 *
 *        Exemple: a 25 TP damage will be show as '-25TP'
 *
 * If you're using the  sprite sheet, you can toggle On/Off separately
 * Operators and Letters for both MP and TP popups. If you're using 
 * text string, you can write whatever you want before and after the
 * damage/recovery values.
 *
 *
 * Elemental effects
 * =================
 * This feature generate a popup bellow the damage digits to indicate
 * the element rate response of the target to the skill/item. These
 * popups are mutually exclusives, meaning that only one can appear
 * following the action. They are based on the final damage value after
 * element rate have been applied.
 *
 *   -If value after element rate calculation is lower than the base
 *    value, a 'RESIST' popup will be shown.
 * 
 *   -If value after element rate calculation is higher than the base
 *    value, a 'WEAK' popup will be shown.
 *
 *   -If value after element rate calculation is equal to 0 while the
 *    base value was > 0, the 'IMMUNE' popup will be shown.*
 *
 *      *If value is already equal to 0 before element calculation,
 *       the 'IMMUNE' popup won't appear. This is to diffenciate
 *       an attack that is too weak to damage the target from an
 *       attack that can't do damage out of elemetal resistance. 
 *
 * When using text string popups, you can call 'RESIST', 'WEAK' and
 * 'IMMUNE' how you like.
 *
 *
 * Attack States 'NO EFFECT'
 * =========================
 * The Plugin also do a check for States Resist and show a popup 
 * accordingly. This popup will be shown if the attack contains
 * at least one Attack State for wich the target have either the
 * corresponding State Resist Trait or a State Rate equal to 0%.
 * 'NO EFFECT' is what is drawn from the alternate sprite sheet.
 * Use text string popups to change it to what you want. This
 * popup only appears if the hit would have resulted in a state
 * inflict.
 *
 *     Example: An attack bears a 50% chance to inflict a
 *              state. The 'No effect' popup will only show
 *              when the 50% condition is met.
 *
 *
 * Critical Hit popup
 * ==================
 * When the action result in a Critical Hit, the Plugin will show a
 * 'CRITICAL HIT' popup bellow the damage digits along with a flash
 * screen effect and a SE. 
 *
 *     *For simplicity, the Critical Hit popup disable 'Element 
 *      Effect' and States 'NO EFFECT' popups when it is shown.
 *   
 *
 * Overkill popup
 * ==============
 * This will pop out an 'OVERKILL' sprite when the target is killed
 * by an amount equal or greater to the target maxHP ratio defined
 * in the corresponding Plugin parameter. It is shown alongside the
 * Critical Hit popup if both conditions are met.
 *
 *
 *
 * =========================================================================================
 * == Using text string popups =============================================================
 * =========================================================================================
 * All popups have a On/Off boolean parameter that allow turning the
 * popup into text string. If so, you get to write the text the popup
 * will actually show in another parameter text box.
 *
 *
 *      DAMAGE and RECOVERY popups
 *      ==========================
 *      When turned into string, these popups will show the damage and
 *      recovery values as text string. In their respective text box 
 *      parameter, you can write anything you wish to appear before or 
 *      after the keyword 'value'.
 *
 *         Exemple: if you have writed '-valueHP' and the resulting
 *                  damage is 1205, the popup will show '- 1205 HP'.
 *
 *      Each popup types (HP, MP or TP) have a separated text box for
 *      damage text string and recovery text string.
 *
 *         Exemple: writing '-valueMP' into the MP damage text box and
 *                  '+valueMp' into the MP recovery text box will show
 *                  a minus sign '-' before damage values and a plus
 *                  sign '+' when healing MP.
 *
 *      Note that the keyword 'value' MUST be present in the text box.
 *      Otherwise, popups won't appears. But you can also just write
 *      'value' alone and popups will only show the value.
 *
 *      EFFECT popups
 *      =============
 *      These popups are used to display additionnal info such as
 *      elemental weakness and critical hits. They do not show values,
 *      so there's no keywords for these popups. If you turn them into
 *      text string, just write what you want to appear in their
 *      corresponding text box.
 *
 *         Exemple: Default Plugin text for critical hits is 'CRITICAL'. 
 *                  Replace that by 'Potatoe' and this is what's going 
 *                  to appears whenever an attack result in a critical.
 *  
 *                
 *      String Popups Colors
 *      ====================
 *      Each string popups have an assigned default Plugin text color.
 *      Changing the text color of a string popup is rather simple since
 *      all you have to do is entering text color escape codes '\C[x]' in 
 *      the popup text box parameter. Yeah, but...
 *
 *      TSR_TextColorAddOn.js
 *      =====================
 *      ...Only problem is, battle popups are sprite based. They're not 
 *      windows. Therefore, the drawTextEx functions wich reads the
 *      escaped codes can't be used... Unless you have my other Plugin
 *      TSR_TextColorAddOn, wich brings the drawTextEx at the Bitmap
 *      class level. 
 *
 *      Having TSR_TextColorAddOn installed above this Plugin will allow
 *      you, not only to use the default text color codes (0 to 31) for
 *      your battle popups, but also import and use your own custom colors,
 *      change the text outline color, add text color gradients, and more...
 *
 *
 *
 * =========================================================================================
 * == Plugin Parameters ====================================================================
 * =========================================================================================
 *
 * General:
 * =========================================================================================
 *
 * Popups Duration:
 * =======================
 * Set the Duration (in frames) for all Battle Popups.
 *
 *         *If you use YEP_BattleEngineCore, this parameter will  
 *          overide the Popups Duration settings of Yanfly Plugin.
 *
 *
 * Popups Drop Down:
 * ====================
 * This is the little drop down move of popups in pixels. When popups
 * appears, they drop down this distance. Default is 40, but you can
 * change it if you want. This parameter affect all popups.
 *
 *
 * Popups Anchor:
 * ====================
 * This is the anchor change when popups stacks up (or down). Default
 * is 1, wich fit the alternate and default sprite sheet. But if you're
 * using string popups, you might want to change it (or not) to 0.7 or
 * something like that, depending of the chosen fontSize. This parameter 
 * affect all popups. If you're using YEP_BattleEngineCore, this param
 * will overwrite the Popup Overlap Rate param of YEP_BEC.
 *
 *
 * Enable Damage Sheet:
 * ====================
 * This parameter toggle On\Off the use of the alternate sprite sheet.
 * When it's turned On, the Plugin will refer to TSR_Damage.png for
 * sprite sheet popups. Turning it Off and the Plugin refer back to the
 * default Damage.png sheet. TP and MP Notetags, damage calculation and
 * most visual features like Critical Flash Screen effect, will work
 * no matter wich sprite sheet you are using. But keep in mind that if a
 * popup has no 'means of appearance', it just won't show. 
 *
 *     Exemple: You toggled Off this parameter and toggled On the 'show
 *              critical' parameter. When a critical hit occurs, the 
 *              screen will flash, but since the default sprite sheet
 *              doesn't have a 'critical hit' popup, no popup will show.
 *              
 *             *Of course, if you're using text strings for the
 *              critical popup, the sprite sheet won't matter.
 *
 *
 * String Damage Popups:
 * ============================
 * This parameter toggle On/Off the string popups for HP, MP and TP damage 
 * and recovery popups. It overide the sprite sheet popups (alternate or 
 * default). Note that this parameter doesn't affect the 'effect' popups 
 * such as critical hit or elemental response. Each of those have their 
 * own string popups On/Off parameter.
 *
 * 
 * String Popups Font Size
 * =======================
 * Default is 28. Set it to your liking. Of course, this has no effect 
 * on popups drawn from the sprite sheets. 
 *
 *
 * HP Popups:
 * =========================================================================================
 * These parameters for HP damage and recovery popups are used only if
 * the String Damage Popups parameter above is turned On.
 *
 * HP Damage String:
 * =================
 * This is a text box where the keyword 'value' represent the HP damage
 * value. Write whatever you want to appear before or after 'value'.
 * 
 *     Exemple: You enter -valueHP in the text box. Now let's say
 *              damage value is 1205. The popup will show '- 1205 HP'
 *
 * HP Recovery String:
 * ===================
 * This is a text box where the keyword 'value' represent the HP recovery
 * value. Write whatever you want to appear before or after 'value'.
 *
 *     Exemple: You enter +valueHP in the text box. Now let's say
 *              healing value is 524. The popup will show '+ 524 HP'
 *
 *
 * MP/TP Popups:
 * =========================================================================================
 * MP and TP popups each have their own parameters section. They use the
 * same parameters. Hence, descriptions bellow stands for both MP and TP
 * popups. First parameters are for the sprite sheet. At the end, you'll
 * find the damage and recovery text boxes for string popups.
 *
 * Color Schemes:
 * ==============
 * The Plugin new Damage sheet provide 2 different color sets for non-HP 
 * damage and recovery digits. When drawing popups from sprite sheet, 
 * you can choose between color schemes A or B:
 *
 *                -A: Yellow (damage) / Blue (recovery)
 *                -B: Orange (damage) / Purple (recovery)
 *
 *        *Without the alternate Damage sheet, both MP and TP will
 *         be set to color scheme A.
 *
 *
 * Operators:
 * ==========
 * Another parameter for the sprite sheet. It add a '+' or '-' sign in 
 * front of popups digits to indicate damage or recovery. This can be 
 * turn On/Off with this parameter.
 *
 *
 * Letters:
 * ========
 * Add 'MP' or 'TP' after popups digits to indicate the affected stat
 * when using sprite sheet popups. Turn it On/Off with this parameter.
 *
 *
 * MP/TP Damage String:
 * ====================
 * A text box where the keyword 'value' represent the MP/TP damage
 * value. Write whatever you want to appear before or after 'value'.
 * 
 *     Exemple: You enter -valueMP in the text box. Now let's say
 *              damage value is 45. The popup will show '- 45 MP'
 *
 * MP/TP Recovery String:
 * ======================
 * Here, the keyword 'value' represent the MP/TP recovery value. Write
 * whatever you want to appear before or after 'value'.
 *
 *     Exemple: You enter +valueTP in the text box. Now let's say
 *              healing value is 30. The popup will show '+ 30 TP'
 *
 *
 * ELEMENTS POPUPS
 * =========================================================================================
 * The Plugin allow to display popups to show elemental resistance, 
 * weakness or immunity.
 *
 * Show Elements Popups:    
 * =====================
 * You can Enable/Disable this feature with this parameter. This
 * affect both sprite sheet popups and string popups.
 * 
 *
 * Immune Flash Color:    
 * ===================
 * Along with the 'Immune' popup, a Flash Screen Effect 
 * will occurs. Use this parameter to set the color of the 
 * Flashing screen. Enter red, green, blue and alpha values 
 * (0 to 255) separated by comas.
 *
 *  *To disable the flash, set the alpha value to 0.
 *   Exemple: 0, 0, 0, 0 or 255, 255, 150, 0 render no flash.
 *
 *
 * Immune Flash Duration:    
 * ======================
 * With this parameter you can set the Duration (in frames) of the 
 * Flashing screen.
 *
 *
 * Immune SE:    
 * ==========
 * Along with the 'IMMUNE' popup, a Sound Effect will play. You can
 * change the SE to be played with this parameter. Leave it blank
 * if you don't want a sound to play.
 *
 *
 * String Elements Popups:
 * ======================
 * Turn this parameter On if you want to use text string popups for
 * the elemental response popups.
 * 
 *
 * Resist String:
 * ==============
 * This is the text box for elemental resistance. Write what you
 * want to show for that popup. 
 *
 * 
 * Weak String:
 * ==============
 * This is the text box for elemental weakness. Write what you
 * want to show for that popup. 
 *
 *
 * Immune String:
 * ==============
 * This is the text box for elemental immunity. Write what you
 * want to show for that popup. 
 *
 *
 * STATES POPUPS
 * =========================================================================================
 * Whenever a battler is hit by a skill or item that inflict a 
 * state, the Plugin will pop out a 'No Effect' if the battler 
 * is resistant to the state.
 *
 * Show States Popups:    
 * ===================
 * You can Enable/Disable this feature with this parameter. It
 * will affect both sprite sheet and string popups.
 * 
 *
 * String State Popups:
 * ====================
 * Turn this parameter On if you want to use text string popups
 * for the state response popups.
 * 
 *
 * State String:
 * ==============
 * This is the text box for state resistance. Write what you
 * want to show for that popup. 
 *
 *
 * CRITICAL HIT
 * =========================================================================================
 * The Plugin can display a 'Critical Hit' popup when the 
 * action result in a critical.
 *
 * Show Critical:    
 * ==============
 * You can Enable/Disable this feature with this parameter.
 * It will affect both sprite sheet and string popups.
 *
 * Critical Flash Color:    
 * =====================
 * Along with the 'Critical Hit' popup, a Flash Screen Effect 
 * will occurs. Use this parameter to set the color of the 
 * Flashing screen. Enter red, green, blue and alpha values 
 * (0 to 255) separated by comas.
 *
 *  *To disable the flash, set the alpha value to 0.
 *   Exemple: 0, 0, 0, 0 or 255, 255, 150, 0 render no flash.
 *
 *
 * Critical Flash Duration:    
 * ========================
 * With this parameter you can set the Duration (in frames)
 *  of the Flashing  screen.
 *
 *
 * Critical SE:    
 * ============
 * Along with the 'Critical Hit' popup, a Sound Effect will play.
 * You can change the SE to be played with this parameter. Leave
 * it blank if you don't want a sound to play.
 * 
 *
 * String Critical Popups:
 * ====================
 * Turn this parameter On if you want to use text string popups
 * for the critical hit popups.
 * 
 *
 * Critical String:
 * ==============
 * This is the text box for critical hit. You can call it what
 * you want.
 *
 *
 * OVERKILL
 * =========================================================================================
 * If you're using the Plugin new Damage sheet, an 'Overkill' 
 * popup will occurs when a target is killed with excessive 
 * damage.
 *
 * Show Overkill:   
 * ==============
 * You can Enable/Disable this feature with this parameter.
 * It will affect both sprite sheet and string popups.
 *
 *
 * Overkill Ratio:    
 * ===============
 * With this parameter, you can set the maxHP ratio value  
 * to be use for determining if the hit is an Overkill.
 *
 *       -Exemple: the Plugin default value is 0.75
 *
 * If left to this value, the 'Overkill' popup will show if 
 * the killing blow value is >= to (0.75 * target.mhp).
 *
 *
 * Overkill Flash Color:    
 * =====================
 * Along with the 'Overkill' popup, a Flash Screen Effect 
 * will occurs. Use this parameter to set the color of the 
 * Flashing screen. Enter red, green, blue and alpha values 
 * (0 to 255) separated by comas.
 *
 *  *To disable the flash, set the alpha value to 0.
 *   Exemple: 0, 0, 0, 0 or 255, 255, 150, 0 render no flash.
 * 
 *
 * Overkill Flash Duration:    
 * =====================
 * With this parameter you can set the Duration (in frames) 
 * of the Flashing screen.
 *
 *
 * Overkill SE:    
 * ============
 * Along with the 'Overkill' popup, a Sound Effect will play.
 * You can change the SE to be played with this parameter. 
 * Leave it blank if you don't want a sound to play.
 *
 *
 * String Overkill Popups:
 * =======================
 * Turn this parameter On if you want to use text string popups
 * for the Overkill popups.
 * 
 *
 * Overkill String:
 * ================
 * This is the text box for Overkill. You can change it to
 * whatever you want.
 *
 *
 *
 * =========================================================================================
 * == Notetags ===========================================================================
 * =========================================================================================
 * As said above, the Plugin provide Notetags that adds new TP damage 
 * types to your items and skills. For each of these TP damage types, 
 * 4 different Notetags can be use to set the TP damage value. All 
 * Notetags are explained bellow:
 *
 * Skills and Items Notetags
 * =========================
 *
 * <TP DAMAGE: x>       Set the TP damage to constant x.
 *
 * <TP DAMAGE: x%>      Set the TP damage to x% of target current TP.
 *
 * <TP DAMAGE FORMULA>  Set the TP damage to the damage formula in
 *                      the skill/item database*
 *
 * <TP DAMAGE EVAL>     Set the TP damage to your custom Java Script 
 *   code               formula. Use the variable 'TPvalue' to return 
 *   code               TP damage to be dealt by the skill or item.
 * </TP DAMAGE EVAL>
 *
 *      Exemple: <TP DAMAGE EVAL>
 *                 TPvalue = Math.round(25 * (user.luk / target.luk));
 *               </TP DAMAGE EVAL>
 *
 *
 * <TP RECOVER: x>       Set the TP recover to constant x.
 *
 * <TP RECOVER: x%>      Set the TP recover to x% of target current TP.
 *
 * <TP RECOVER FORMULA>  Set the TP recover to the damage formula in
 *                       the skill/item database*
 *
 * <TP RECOVER EVAL>     Set the TP recover to your custom Java Script 
 *   code                formula. Use the variable 'TPvalue' to return 
 *   code                TP recover to be dealt by the skill or item.
 * </TP RECOVER EVAL>
 *
 *      Exemple: <TP RECOVER EVAL>
 *                 TPvalue = Math.round(10 + 0.1 * user.level);
 *               </TP RECOVER EVAL>
 *
 *
 * <TP DRAIN: x>        Set the TP drain to constant x.
 *
 * <TP DRAIN: x%>       Set the TP drain to x% of target current TP.
 *
 * <TP DRAIN FORMULA>   Set the TP drain to the damage formula in
 *                      the skill/item database*
 *
 * <TP DRAIN EVAL>      Set the TP drain to your custom Java Script 
 *   code               formula. Use the variable 'TPvalue' to return 
 *   code               TP drain to be dealt by the skill or item.
 * </TP DRAIN EVAL>
 *
 *      Exemple:   <TP DRAIN EVAL>
 *                   TPvalue = 20;
 *                   if (user.tp <= 20) value * 2;
 *                 </TP DRAIN EVAL>
 *
 *     *You can put the TP Notetags in items/skills notebox without damage 
 *      type to make them affect only TP. You can still use the database
 *      formula for <TP DAMAGE/RECOVER/DRAIN FORMULA> Notetags by selecting
 *      HP DAMAGE type (or any other), enter your formula and put the damage
 *      type back to NONE. The Notetags will then be able to use the formula.
 *      
 *     *The TP DAMAGE, RECOVER and DRAIN damage types are user friendly.
 *      Hence, they are made to receive absolute values. For that matter,
 *      the use of Lunatic formulas that return floating or negative 
 *      values might render unexpected results. 
 *
 *
 * -MP Notetags
 * The MP notetags works the same way as those above. You can use them to
 * add MP effect to skills and items that already have a HP effect damage
 * type defined in the database. 
 *
 * The MP Notetags are listed bellow (see above for details on Notetags)
 *
 * <MP DAMAGE: x>           <MP RECOVER: x>           <MP DRAIN: x>
 *
 * <MP DAMAGE: x%>          <MP RECOVER: x%>          <MP DRAIN: x%>
 *
 * <MP DAMAGE FORMULA>      <MP RECOVER FORMULA>      <MP DRAIN FORMULA>
 *
 * <MP DAMAGE EVAL>         <MP RECOVER EVAL>         <MP DRAIN EVAL>
 *    code                     code                      code
 *    code                     code                      code
 * </MP DAMAGE EVAL>        </MP RECOVER EVAL>        </MP DRAIN EVAL>
 *
 *             *Use 'MPvalue' for EVAL Notetags.
 *
 *
 * -Combine 
 * By combining Default database HP damage type with TP and MP Notetags
 * provided by this Plugin, you can create skill or item that affect
 * HP, MP and TP in different manners.
 *
 *         Exemple: Database damage type: HP DAMAGE
 *                             Notetag 1: <MP drain: 10%>
 *                             Notetag 2: <TP recover formula>
 *
 * In the above exemple, the skill will damage target HP according to
 * the skill Damage Formula in the database. It will also recover TP
 * by the same amount while draining 10% of target MP. This means 4
 * damage sprites will pop out: 3 on the target (-HP, +TP, -MP) and
 * one the user (+MP).
 *
 * -Notes on combining
 * 
 *          -If you combine 2 or more of the same Notetags, only the
 *           last one in the skill/item notebox will be taken into
 *           account.
 *
 *          -If you combine 2 or more Notetags that affects the same
 *           stat (Ex: <TP damage> with <TP drain>), effects will 
 *           cumulate most of the time, but some combinations might 
 *           be conflicting. Only one popup will be shown with the
 *           value defined by the last Notetag of the skill notebox.
 *
 *          -If you combine Default database Damage Type with Notetags
 *           that affects the same stat, only one popup will be shown
 *           with the value defined by the Default database entry, but
 *           both effect will cumulate.
 *
 *               Exemple: Default database: MP DAMAGE
 *                                Notetags: <MP damage: 20>
 *
 *                        In this exemple, the skill will do MP damage
 *                        equal to the value defined by the database 
 *                        Damage Formula + 20, but popup will only show
 *                        the Damage formula value.
 *
 *          -If you put a DRAIN effect Notetag in a skill or item that
 *           target the user itself, popup will only show the healing 
 *           effect, but the actual stat will remain the same. 
 *           (Ex: Draining 10 TP means 10 TP lost and 10 TP gain, hence
 *           no change occurs).
 *
 *
 * State Notetag
 * =========================
 *
 *    <HP REGENERATE ELEMENT: x> 
 *                       Modify the State X-Param 'HP regenerate rate'
 *                       by the affected Battler elementRate(x).
 *
 *    This mean you can create HP depleting (or regenerating) States 
 *    that will be modified by the targeted Battler element rate.
 *    
 *      Example: 
 *         You make a State called 'Burn'. It has the X-Param 'HP Regenerate
 *         Rate' set to -10%. Like any basic 'poison' state, it will deplete
 *         the target HP by 10% each turn/action. Now we add the following
 *         notetag in the State Notebox:
 *
 *                        <HP REGENERATE ELEMENT: 4>
 *
 *         Let's say Element Id 4 is 'Fire'. If the State 'Burn' affect a
 *         a Battler that is resistant to 'Fire', let's say it has an 
 *         element rate 50% for 'Fire' (Element Id 4), it will deplete the
 *         Battler HP by 5% each turn\action, instead of 10%.
 * 
 *    Of course, the according Elemental Effect popup (resist or weak) will 
 *    pop along the damage. In the case above, it would be 'resist', cause 
 *    the resulting 5% damage rate is less than the expected 10%. 
 *
 *    You can put multiple Notetags in the same State Notebox to affect   
 *    more  elements. A Battler can also be affected by many states that 
 *    have elemental effect. 
 *
 *    No matter what, the final resulting damage compared to the initial 
 *    damage (the value expected without elemental effect) will dictate 
 *    the resulting 'weak' or 'resist' popup.
 *
 *       Example:
 *         Let's say the battler from the previous example is also affected
 *         by a State called 'Freeze', which also deplete 10% HP and bear        
 *         the Element 'ice'. If the battler have an element rate of 300% 
 *         for 'ice', the resulting damage rate would be 35% of his max HP,
 *         and a 'weak' popup would show (0.1 / 2 + 0.1 * 3 = 0.35).
 *
 *    The HP Regeneration Rate (HRG) of a battler is the sums of all of the
 *    HRG rates it have. It means that an element rate of 0% (immunity)
 *    can't bring down the damage to zero by itself; unless there is only
 *    one HRG trait nullified by the element rate.
 *
 *       Exemple:
 *          In the previous example, the damage came from 2 HRG traits of
 *          2 different States. Both trait rates are added, so even if the
 *          battler was 'immune' to 'ice', only the -10% HRG from the 'Freeze'
 *          State would be ignored, and damage would still be 5% from the
 *          'Burn' State (10% HRG halved by the 50% fire element rate).
 *
 *             *Of course, if the battler was only affected by 'Freeze',
 *              it would completely nullify the HP Regeneration rate and
 *              no HP damage nor Elemental Effect popups would show.
 *
 *
 *    You can put multiple copy of this Notetag in a single State Notebox to
 *    give the State multiple elemental effects. In this case, the HRG rate
 *    of the State would be multiplied by each element rate of the elements
 *    it bear. This means that if the battler have an element rate of 0% for
 *    one the State elements, it would effectively nullify the whole trait.
 *
 *       Example:
 *          Now we make a State called 'Burn & Freeze' with an HRG of -10%.
 *          We put the 2 following Notetags in the State Notebox:
 *
 *                        <HP REGENERATE ELEMENT: 4> ('fire')
 *                        <HP REGENERATE ELEMENT: 5> ('ice')
 *
 *          Now if the same battler from previous example (50% to 'fire' and
 *          0% to 'ice') is affected by that State, no damage will result 
 *          since both battler's element rates would be multiplied by the
 *          State HRG (0.1 * 0.5 * 0 = 0).
 *
 *
 *    Zero values
 *    ===========
 *    If by any means, the HRG rate is bring down to zero, neither HP damage  
 *    nor Elemental Effect popups will show.
 *
 * 
 *    Positive values
 *    ===============
 *    If by any means, the final HRG rate is positive (HP regeneration), no
 *    Elemental Effect popups will show.
 *
 *       Example:
 *         The battler have an HRG of +50% given by his armor, and is affected
 *         by the 'fire' elemental State 'Burn', for which it have a weakness
 *         of 200%. The final value will be an HRG of +30%, meaning that the
 *         battler will regenerate 30% of its max HP each turn/action. Even
 *         though the final value is less than expected, no Elemental Effect
 *         popup will show because it's still positive regeneration.
 *
 *         0.5 (armor HRG) + ( -0.1 (Burn State) * 2 (weakness) ) = 0.3
 *
 *
 *    YEP ElementCore.js   
 *    ==================
 *       If a battler have the <Absorb Element: x> Notetag from Yanfly Element
 *       Core Plugin, and is affected by a State that have an x elemental based
 *       HRG rate, the value will be modified by element x as follow:
 *
 *       If the State have an HP depleting effect (negative HRG), the battler
 *       will regenerate HP by the HRG rate each turn/action instead of deple- 
 *       ting HP.
 *
 *          Example:
 *             The 'Burn' State from above examples (-10% HRG) is affecting
 *             a battler that have the <Element absorb: 4 (fire)> Notetag 
 *             from YEP_ElementCore. It will regen 10% of his max HP each 
 *             turn/action.
 *
 *       If the State have an HP regenerate effect (positive HRG), the battler
 *       will also regenerate HP by the HRG rate each turn/action, but with
 *       a bonus corresponding to the ratio of the HRG rate by itself.
 *
 *          Example:
 *             You have made a State that as an HP regeneration effect, and
 *             added the <HP Regenerate Element: 4 (fire)> to give it a 'fire'
 *             elemental effect. Let's say the HRG is +20%. If a battler that
 *             have the <Element absorb: 4 (fire)> Notetag is affected by the
 *             State, it will regenerate 24% of max HP each turn/action. 
 *
 *                     0.2 (state HRG) + ( 0.2 * 0.2 ) = 0.24
 *
 *
 *
 *    YEP X_TickBaseRegen.js   
 *    ======================
 *       This extension Plugin from Yanfly's engine separate each of the
 *       battler's HRG traits, and pop damages separately for each of the
 *       traits in a tick-based manner. 
 *       
 *       It is NOT compatible with THIS FEATURE. 
 *
 *       Hence, if you have YEP_X_TickBaseRegen.js installed and toggled
 *       ON, it will disable the <HP REGENERATE ELEMENT: x> Notetag, and
 *       damage will be calculated normally without taking account of 
 *       elemental rates. In this case, Elemental effects (weak or resist)
 *       popups will be disabled during the regeneration battle phase.
 *        
 *
 *
 * =========================================================================================
 * == Terms of usage =======================================================================
 * =========================================================================================
 * Free to use in any RPG Maker MV projects, including commercials projects.
 *
 * Credit is required for using this Plugin. 
 * For crediting, use 'TSR' along with one of
 * the following terms: 
 *      'The Northern Frog' or 'A frog from the north'
 * 
 * Do not change the Header or the Terms of usage.
 *
 * Editing of the script is allowed, but it won't relieve from crediting
 * obligations. Remember that changing the name of functions and variables,
 * or even manually retyping the entire script, doesn't make you the author
 * of the Plugin.
 *
 * DO NOT REDISTRIBUTE!
 * If you want to share it, share the link to my itchi.io account: 
 * https://the-northern-frog.itch.io/ 
 *
 * ALTERNATE SPRITE SHEET
 * The TSR_Damage damage sprite sheet is free to download on my itchi.io 
 * account. Editing it to your liking is permited and no credit is asked 
 * for using it, but it shouldn't be used in games that don't use this
 * plugin, nor in a game not made with RPG Maker MV.
 *
 * This plugin was made for free use among the RMMV game dev community. 
 * Hence, it is free and will remain free. 
 * 
 * =========================================================================================
 * == Version and compatibility ============================================================
 * =========================================================================================
 * 2020/02/16 Initial work
 * 2020/02/17 TP damage calculations and popups mechanics
 * 2020/02/18 MP damage calculations and popups mechanics
 * 2020/02/20 Bug fixes and Yanfly BEC compatibility tunings
 * 2020/02/21 Add new damage sprite sheet and battle effects popups
 * 2020/02/23 More bug fixes and Yanfly BEC compatibility tunings
 * 2020/02/25 beta version 0.1
 * 2020/02/25 beta version 0.2 Add popups frame duration parameters
 * 2020/02/27 beta version 0.3.1 Add more parameters and fix an Overkill Ratio bug
 * 2020/02/28 beta version 0.4.1 Update the Check State Resist function
 * 2020/02/28 beta version 0.4.2 Small patch to ensure compatibility with TSR_Title
 * 2020/02/28 beta version 0.4.3 Minor fix and a few typos corrections
 * 2020/05/02 to 2020/06/06 Params restruct, add string popups, completed Plugin v1.1.4
 * 2020/07/27 Some fix following bugs reports and add string popup font param v1.1.6
 * 2020/07/28 Some fix following bugs reports v1.1.7
 * 2020/08/02 Fix bug with some effect popups and disable FlashColor for strings v1.1.8
 * 2020/08/03 Add <Hp Regenerate Element> state Notetag v1.1.9
 * 2020/09/10 Change the 'no effect' popup mechanics v1.2
 * 2020/09/11 Fix on 'no effect' popup mechanics based on report v1.2.1
 * 2020/11/12 to 2020/11/15 Fix absorb popup and weak/resist behaviors v1.2.4
 * 2021/06/10 Fix interference between dot and element dot v1.2.5
 * 2021/06/22 Change the state no effect popup behavior v1.2.6
 *
 * Compatible with Yanfly Engine Plugins Library. 
 *
 * Place it bellow YEP_BattleEngineCore.js, with all other Yanfly battle-related Plugins   
 * bellow TSR_Popups.
 *
 * Place it bellow TSR_TextColorAddOn.js 
 *
 * =========================================================================================
 * == END ==================================================================================                                             
 * =========================================================================================
 *
 *                              "Have fun!"
 *                                                  TSR, The Northern Frog
 *
 * =========================================================================================
 *
 *@param ---General---
 *
 * @param Popups Duration
 * @parent ---General---
 * @type number
 * @min 0
 * @desc Adjust the duration (in frames) of all popups.
 * Default: 90
 * @default 90
 *
 * @param Popups Drop Down
 * @parent ---General---
 * @desc Popups drop down in pixels.
 * Default: 40
 * @default 40
 *
 * @param Popups Anchor
 * @parent ---General---
 * @desc Space between each popups when stacks up.
 * Default: 1 (sheet) or 0.7 (string)
 * @default 1
 *
 * @param Enable Damage Sheet
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Use the plugin Damage Sheet?
 * 'TSR_Damage' must be in /img/system to enable this.
 * NO - false     YES - true
 * @default true
 *
 * @param String Damage Popups
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Use string for HP, MP and TP damage popups?
 * NO - false     YES - true
 * @default false
 *
 * @param String Popups Font Size
 * @parent ---General---
 * @desc Set the fontSize of all string popups.
 * Default: 28
 * @default 28
 *
 * @param String Popups Font
 * @parent ---General---
 * @desc Set the Font of all string popups.
 * Default: GameFont
 * @default GameFont
 *
 *
 *@param ---HP Popups---
 *
 * @param HP Damage String
 * @parent ---HP Popups---
 * @desc Set the HP damage string popups.
 * Write anything before or after value.
 * @default value
 *
 * @param HP Recovery String
 * @parent ---HP Popups---
 * @desc Set the HP recovery string popups.
 * Write anything before or after value.
 * @default value
 *
 * @param Miss String
 * @parent ---HP Popups---
 * @desc Set the Miss string popups.
 * Default: miss
 * @default miss
 *
 *
 *@param ---MP Popups---
 *
 * @param MP Color Scheme
 * @parent ---MP Popups---
 * @type combo
 * @option Yellow/Blue
 * @option Orange/Purple
 * @desc Select MP popups color sheme.
 * Damage color/Recovery color
 * @default Orange/Purple
 *
 * @param MP Operators
 * @parent ---MP Popups---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show MP operators?
 * NO - false     YES - true
 * @default true
 *
 * @param MP Letters
 * @parent ---MP Popups---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show MP letters?.
 * NO - false     YES - true
 * @default true
 *
 * @param MP Damage String
 * @parent ---MP Popups---
 * @desc Set the MP damage string popups.
 * Write anything before or after value.
 * @default -valueMP
 *
 * @param MP Recovery String
 * @parent ---MP Popups---
 * @desc Set the MP recovery string popups.
 * Write anything before or after value.
 * @default +valueMP
 *
 *
 *@param ---TP Popups---
 *
 * @param TP Color Scheme
 * @parent ---TP Popups---
 * @type combo
 * @option Yellow/Blue
 * @option Orange/Purple
 * @desc Select TP popups color sheme.
 * Damage color/Recovery color
 * @default Yellow/Blue
 *
 * @param TP Operators
 * @parent ---TP Popups---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show TP operators?
 * NO - false     YES - true
 * @default true
 *
 * @param TP Letters
 * @parent ---TP Popups---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show TP letters?.
 * NO - false     YES - true
 * @default true
 *
 * @param TP Damage String
 * @parent ---TP Popups---
 * @desc Set the TP recovery string popups.
 * Write anything before or after value.
 * @default -valueTP
 *
 * @param TP Recovery String
 * @parent ---TP Popups---
 * @desc Set the TP recovery string popups.
 * Write anything before or after value.
 * @default +valueTP
 *
 *
 *@param ---Elements Popups---
 *
 * @param Show Elements Popups
 * @parent ---Elements Popups---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show Elements Popups?.
 * NO - false     YES - true
 * @default true
 *
 * @param Immune Flash Color
 * @parent ---Elements Popups---
 * @desc Set the Flash Screen Color of Immune Hits.
 * red, green, blue, alpha Default: 255, 0, 255, 160
 * @default 255, 0, 255, 160
 *
 * @param Immune Flash Duration
 * @parent ---Elements Popups---
 * @type number
 * @min 0
 * @desc Set the frames duration of the Flash Screen.
 * Default: 30
 * @default 30
 *
 * @param Immune SE
 * @parent ---Elements Popups---
 * @desc Select the Sound Effect of Immune Hits.
 * Default: Parry
 * @default Parry
 *
 * @param String Element Popups
 * @parent ---Elements Popups---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Use string for Element effects popups?
 * NO - false     YES - true
 * @default false
 *
 * @param Resist String
 * @parent ---Elements Popups---
 * @desc Set the text string for elemental resistance.
 * Default: resist
 * @default resist
 *
 * @param Weak String
 * @parent ---Elements Popups---
 * @desc Set the text string for elemental weakness.
 * Default: weak
 * @default weak
 *
 * @param Immune String
 * @parent ---Elements Popups---
 * @desc Set the text string for elemental immunity.
 * Default: immune
 * @default immune
 *
 *@param ---States Popups---
 *
 * @param Show States Popups
 * @parent ---States Popups---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show States Popups?.
 * NO - false     YES - true
 * @default false
 *
 * @param String States Popups
 * @parent ---States Popups---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Use text string for States Popups?.
 * NO - false     YES - true
 * @default false
 *
 * @param State String
 * @parent ---States Popups---
 * @desc Set the text string for state resistance.
 * Default: no effect
 * @default no effect
 *
 *
 *@param ---Critical Popups---
 *
 * @param Show Critical Popups
 * @parent ---Critical Popups---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show Critical Popups?.
 * NO - false     YES - true
 * @default true
 *
 * @param Critical Flash Color
 * @parent ---Critical Popups---
 * @desc Set the Flash Screen Color of Critical Hit.
 * red, green, blue, alpha Default: 255, 255, 0, 160
 * @default 255, 255, 0, 160
 *
 * @param Critical Flash Duration
 * @parent ---Critical Popups---
 * @type number
 * @min 0
 * @desc Set the frames duration of the Flash Screen.
 * Default: 30
 * @default 30
 *
 * @param Critical SE
 * @parent ---Critical Popups---
 * @desc Select the Sound Effect of Critical Hits.
 * Default: Flash2
 * @default Flash2
 *
 * @param String Critical Popups
 * @parent ---Critical Popups---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Use text string for Critical Popups?.
 * NO - false     YES - true
 * @default false
 *
 * @param Critical String
 * @parent ---Critical Popups---
 * @desc Set the text string for Critical Hit.
 * Default: CRITICAL
 * @default CRITICAL
 *
 *
 *@param ---Overkill Popups---
 *
 * @param Show Overkill
 * @parent ---Overkill Popups---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show Overkill sprite?.
 * NO - false     YES - true
 * @default true
 *
 * @param Overkill Ratio
 * @parent ---Overkill Popups---
 * @desc Killing blow must be >= Ratio * target max HP
 * Default: 0.75
 * @default 0.75
 *
 * @param Overkill Flash Color
 * @parent ---Overkill Popups---
 * @desc Set the Flash Screen Color of Overkills.
 * red, green, blue, alpha Default: 255, 0, 0, 160
 * @default 255, 0, 0, 160
 *
 * @param Overkill Flash Duration
 * @parent ---Overkill Popups---
 * @type number
 * @min 0
 * @desc Set the frames duration of the Flash Screen.
 * Default: 45
 * @default 45
 *
 * @param Overkill SE
 * @parent ---Overkill Popups---
 * @desc Select the Sound Effect of Overkill.
 * Default: Collapse2
 * @default Collapse2
 *
 * @param String Overkill Popups
 * @parent ---Overkill Popups---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Use text string for Overkill popup?.
 * NO - false     YES - true
 * @default false
 *
 * @param Overkill String
 * @parent ---Overkill Popups---
 * @desc Set the text string for Overkill popups.
 * Default: OVERKILL
 * @default OVERKILL
 *
 *
 */
//== PARAMETERS ============================================================================

 TSR.Parameters = PluginManager.parameters('TSR_Popups');


   ///General

 TSR.Popups.popup_duration   = Number(TSR.Parameters['Popups Duration']);
 TSR.Popups.popup_drop       = String(TSR.Parameters['Popups Drop Down']);
 TSR.Popups.popup_drop       = eval(TSR.Popups.popup_drop);
 TSR.Popups.popup_anchor     = String(TSR.Parameters['Popups Anchor']);
 TSR.Popups.popup_anchor     = eval(TSR.Popups.popup_anchor);
 TSR.Popups.sheet_enable     = String(TSR.Parameters['Enable Damage Sheet']);
 TSR.Popups.sheet_enable     = eval(TSR.Popups.sheet_enable);
 TSR.Popups.string_enable    = String(TSR.Parameters['String Damage Popups']);
 TSR.Popups.string_enable    = eval(TSR.Popups.string_enable);
 TSR.Popups.string_fontSize  = String(TSR.Parameters['String Popups Font Size']);
 TSR.Popups.string_fontSize  = eval(TSR.Popups.string_fontSize);
 TSR.Popups.string_fontFace  = String(TSR.Parameters['String Popups Font']) || null;


   ///HP popup

 TSR.Popups.hp_stringDam  = String(TSR.Parameters['HP Damage String']);
 TSR.Popups.hp_stringRec  = String(TSR.Parameters['HP Recovery String']);
 TSR.Popups.hp_stringMis  = String(TSR.Parameters['Miss String']);


   ///MP popup

 TSR.Popups.mp_operators   = String(TSR.Parameters['MP Operators']);
 TSR.Popups.mp_operators   = eval(TSR.Popups.mp_operators);
 TSR.Popups.mp_letters     = String(TSR.Parameters['MP Letters']);
 TSR.Popups.mp_letters     = eval(TSR.Popups.mp_letters);
 TSR.Popups.mp_colorSheme  = String(TSR.Parameters['MP Color Scheme']);
 TSR.Popups.mp_stringDam   = String(TSR.Parameters['MP Damage String']);
 TSR.Popups.mp_stringRec   = String(TSR.Parameters['MP Recovery String']);


   ///TP popup

 TSR.Popups.tp_operators   = String(TSR.Parameters['TP Operators']);
 TSR.Popups.tp_operators   = eval(TSR.Popups.tp_operators);
 TSR.Popups.tp_letters     = String(TSR.Parameters['TP Letters']);
 TSR.Popups.tp_letters     = eval(TSR.Popups.tp_letters);
 TSR.Popups.tp_colorSheme  = String(TSR.Parameters['TP Color Scheme']);
 TSR.Popups.tp_stringDam   = String(TSR.Parameters['TP Damage String']);
 TSR.Popups.tp_stringRec   = String(TSR.Parameters['TP Recovery String']);


   ///Element popup

 TSR.Popups.element_show        = String(TSR.Parameters['Show Elements Popups']);
 TSR.Popups.element_show        = eval(TSR.Popups.element_show); 
 TSR.Popups.element_imFlashCol  = String(TSR.Parameters['Immune Flash Color']);
 TSR.Popups.element_imFlashDur  = Number(TSR.Parameters['Immune Flash Duration']);
 TSR.Popups.element_SE          = String(TSR.Parameters['Immune SE']);
 TSR.Popups.element_strEnb      = String(TSR.Parameters['String Element Popups']);
 TSR.Popups.element_strEnb      = eval(TSR.Popups.element_strEnb);
 TSR.Popups.element_resist      = String(TSR.Parameters['Resist String']) || null;
 TSR.Popups.element_weak        = String(TSR.Parameters['Weak String']) || null;
 TSR.Popups.element_immune      = String(TSR.Parameters['Immune String']) || null;


   ///State popup

 TSR.Popups.state_show    = String(TSR.Parameters['Show States Popups']);
 TSR.Popups.state_show    = eval(TSR.Popups.state_show);
 TSR.Popups.state_strEnb  = String(TSR.Parameters['String States Popups']);
 TSR.Popups.state_strEnb  = eval(TSR.Popups.state_strEnb);
 TSR.Popups.state_string  = String(TSR.Parameters['State String']) || null;;


   ///Critical hit popup
 
 TSR.Popups.critical_show      = String(TSR.Parameters['Show Critical Popups']);
 TSR.Popups.critical_show      = eval(TSR.Popups.critical_show);
 TSR.Popups.critical_flashCol  = String(TSR.Parameters['Critical Flash Color']);
 TSR.Popups.critical_flashDur  = Number(TSR.Parameters['Critical Flash Duration']);
 TSR.Popups.critical_SE        = String(TSR.Parameters['Critical SE']);
 TSR.Popups.critical_strEnb    = String(TSR.Parameters['String Critical Popups']);
 TSR.Popups.critical_strEnb    = eval(TSR.Popups.critical_strEnb);
 TSR.Popups.critical_string    = String(TSR.Parameters['Critical String']) || null;


   ///Overkill popup

 TSR.Popups.overkill_show      = String(TSR.Parameters['Show Overkill']);
 TSR.Popups.overkill_show      = eval(TSR.Popups.overkill_show);
 TSR.Popups.overkill_formula   = String(TSR.Parameters['Overkill Ratio']);
 TSR.Popups.overkill_formula   = eval(TSR.Popups.overkill_formula);
 TSR.Popups.overkill_flashCol  = String(TSR.Parameters['Overkill Flash Color']);
 TSR.Popups.overkill_flashDur  = Number(TSR.Parameters['Overkill Flash Duration']);
 TSR.Popups.overkill_SE        = String(TSR.Parameters['Overkill SE']);
 TSR.Popups.overkill_strEnb    = String(TSR.Parameters['String Overkill Popups']);
 TSR.Popups.overkill_strEnb    = eval(TSR.Popups.overkill_strEnb);
 TSR.Popups.overkill_string    = String(TSR.Parameters['Overkill String']) || null;
 
 TSR.Popups.checkFlashColor = function(color) {
    color = color.split(',');
    if (!color || color.length < 4) return [0, 0, 0, 0];
    let r = parseInt(/\d+/.exec(color[0])),
        g = parseInt(/\d+/.exec(color[1])),
        b = parseInt(/\d+/.exec(color[2])),
        a = parseInt(/\d+/.exec(color[3]));
    return [r, g, b, a];
 };
 TSR.Popups.element_imFlashCol = TSR.Popups.checkFlashColor(TSR.Popups.element_imFlashCol);
 TSR.Popups.critical_flashCol  = TSR.Popups.checkFlashColor(TSR.Popups.critical_flashCol);
 TSR.Popups.overkill_flashCol  = TSR.Popups.checkFlashColor(TSR.Popups.overkill_flashCol);

 TSR.Popups.makeSoundObj = function(soundName) {
   let SEname = soundName || null,
          vol = 100,
        pitch = 100,
          pan = 100;
   if (SEname) return {name: SEname, volume: vol, pitch: pitch, pan: pan};
   return false;
 };
 TSR.Popups.element_SE  = TSR.Popups.makeSoundObj(TSR.Popups.element_SE);
 TSR.Popups.critical_SE = TSR.Popups.makeSoundObj(TSR.Popups.critical_SE);
 TSR.Popups.overkill_SE = TSR.Popups.makeSoundObj(TSR.Popups.overkill_SE);


   ///String objects
 
 TSR.Popups.getString = function(string) {
   if (!string) return {};
   string = string.replace(/\\C/g, '\\c');
   if (!string.toLowerCase().includes('value')) {
     let color  = '';
     if (string.includes('\\c[')) {
        color = string.slice(string.indexOf('\\c['), string.indexOf(']') + 1);
        string = string.slice(0, string.indexOf('\\c[')) +
                 string.slice(string.indexOf(']') + 1);
     }
     return {string: string, color: color};
   } else {
     let pre    = string.slice(0, string.indexOf('value'));
     let suf    = string.slice(string.indexOf('value') + 5);
     let color  = '';
     if (pre.includes('\\c[')) {
        color = pre.slice(pre.indexOf('\\c['), pre.indexOf(']') + 1);
     }
     string = {};
     string.prefix = pre.trim();
     string.suffix = suf.trim();
     string.color  = color.trim();
     return string;
   }
 };
 TSR.Popups.digitInfo = {}
 TSR.Popups.digitInfo.hp = {
     damage:   TSR.Popups.getString(TSR.Popups.hp_stringDam),
     recovery: TSR.Popups.getString(TSR.Popups.hp_stringRec)
   }
 TSR.Popups.digitInfo.mp = {
     damage:   TSR.Popups.getString(TSR.Popups.mp_stringDam),
     recovery: TSR.Popups.getString(TSR.Popups.mp_stringRec)
   }
 TSR.Popups.digitInfo.tp = {
     damage:   TSR.Popups.getString(TSR.Popups.tp_stringDam),
     recovery: TSR.Popups.getString(TSR.Popups.tp_stringRec)
   }
 TSR.Popups.effectInfo = {}
 TSR.Popups.effectInfo.miss  = TSR.Popups.getString(TSR.Popups.hp_stringMis);
 TSR.Popups.effectInfo.miss.enb = TSR.Popups.string_enable;
 TSR.Popups.effectInfo.miss.col = 0;
 TSR.Popups.effectInfo.miss.row = 4;
 TSR.Popups.effectInfo.miss.wid = 4;
 TSR.Popups.effectInfo.state = TSR.Popups.getString(TSR.Popups.state_string);
 TSR.Popups.effectInfo.state.enb = TSR.Popups.state_strEnb;
 TSR.Popups.effectInfo.state.col = 4;
 TSR.Popups.effectInfo.state.row = 4;
 TSR.Popups.effectInfo.state.wid = 6;
 TSR.Popups.effectInfo.critical = TSR.Popups.getString(TSR.Popups.critical_string);
 TSR.Popups.effectInfo.critical.enb = TSR.Popups.critical_strEnb;
 TSR.Popups.effectInfo.critical.col = 0;
 TSR.Popups.effectInfo.critical.row = 7;
 TSR.Popups.effectInfo.critical.wid = 9;
 TSR.Popups.effectInfo.overkill = TSR.Popups.getString(TSR.Popups.overkill_string);
 TSR.Popups.effectInfo.overkill.enb = TSR.Popups.overkill_strEnb;
 TSR.Popups.effectInfo.overkill.col = 9;
 TSR.Popups.effectInfo.overkill.row = 7;
 TSR.Popups.effectInfo.overkill.wid = 6;
 TSR.Popups.effectInfo.resist = TSR.Popups.getString(TSR.Popups.element_resist);
 TSR.Popups.effectInfo.resist.enb = TSR.Popups.element_strEnb;
 TSR.Popups.effectInfo.resist.col = 10;
 TSR.Popups.effectInfo.resist.row = 0;
 TSR.Popups.effectInfo.resist.wid = 4;
 TSR.Popups.effectInfo.weak = TSR.Popups.getString(TSR.Popups.element_weak);
 TSR.Popups.effectInfo.weak.enb = TSR.Popups.element_strEnb;
 TSR.Popups.effectInfo.weak.col = 10;
 TSR.Popups.effectInfo.weak.row = 1;
 TSR.Popups.effectInfo.weak.wid = 3;
 TSR.Popups.effectInfo.immune = TSR.Popups.getString(TSR.Popups.element_immune);
 TSR.Popups.effectInfo.immune.enb = TSR.Popups.element_strEnb;
 TSR.Popups.effectInfo.immune.col = 10;
 TSR.Popups.effectInfo.immune.row = 4;
 TSR.Popups.effectInfo.immune.wid = 5;


//== DATAMANAGER ===========================================================================
  
    TSR.Popups.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
  DataManager.isDatabaseLoaded = function() {
    if (!TSR.Popups.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!TSR.Popups._loaded) {
      this.read_Tp_Notetag($dataSkills);
      this.read_Tp_Notetag($dataItems);
      this.read_Mp_Notetag($dataSkills);
      this.read_Mp_Notetag($dataItems);
      this.read_regenElement_Notetag($dataStates);
      TSR.Popups._loaded = true;
    }
    return true;
  };

  DataManager.read_regenElement_Notetag = function(group) {
    let noteTickElDMG = /<(?:HP REGENERATE ELEMENT|ELEMENT HP REGENERATE):[ ](\d+)>/i;
    for (let n = 1; n < group.length; n++) {
      let obj = group[n];
      let notedata = obj.note.split(/[\r\n]+/);
      obj._tickElementDMG = [];
      for (let i = 0; i < notedata.length; i++) {
        let line = notedata[i];
        if (line.match(noteTickElDMG)) {
           let val = parseInt(RegExp.$1);
           if (val <= $dataSystem.elements.length) obj._tickElementDMG.push(val);
        }
      }
    }
  }; 

  DataManager.read_Tp_Notetag = function(group) {
    let noteTDamage1 = /<(?:TP DAMAGE|DAMAGE TP):[ ](\d+)>/i;
    let noteTDamage2 = /<(?:TP DAMAGE|DAMAGE TP):[ ](\d+)([%％])>/i;
    let noteTDamage3 = /<(?:TP DAMAGE FORMULA|DAMAGE TP FORMULA)>/i;

    let noteTRecover1 = /<(?:TP RECOVER|RECOVER TP):[ ](\d+)>/i;
    let noteTRecover2 = /<(?:TP RECOVER|RECOVER TP):[ ](\d+)([%％])>/i;
    let noteTRecover3 = /<(?:TP RECOVER FORMULA|RECOVER TP FORMULA)>/i;

    let noteTDrain1 = /<(?:TP DRAIN|DRAIN TP):[ ](\d+)>/i;
    let noteTDrain2 = /<(?:TP DRAIN|DRAIN TP):[ ](\d+)([%％])>/i;
    let noteTDrain3 = /<(?:TP DRAIN FORMULA|DRAIN TP FORMULA)>/i;
   
    for (let n = 1; n < group.length; n++) {
      let obj = group[n];
      let notedata = obj.note.split(/[\r\n]+/);
      let TPformulaEnable = false;

       obj.TSR_TPdamage = undefined;
       obj.TSR_TPrecover = undefined; 
       obj.TSR_TPdrain = undefined;
       obj.TSR_customTPdamage = false;

      for (let i = 0; i < notedata.length; i++) {
        let line = notedata[i];
        if (line.match(noteTDamage1)) {
           obj.TSR_TPdamage = true;
           let val = parseInt(RegExp.$1);
           obj.TSR_TPdamageValue = val;
           obj.damage.type = obj.damage.type || 7;

        } else if (line.match(noteTDamage2)) {
             obj.TSR_TPdamage = true;
             let val = parseFloat(RegExp.$1) * 0.01;
             obj.TSR_TPdamageRatioValue = val;
             obj.damage.type = obj.damage.type || 7;

        } else if (line.match(noteTDamage3)) {
               obj.TSR_TPdamage = true;
               obj.damage.type = obj.damage.type || 7; 

        } else if (line.match(/<(?:TP DAMAGE EVAL)>/i)) {
	         TPformulaEnable = true;
                 obj.TSR_TPdamage = true;
                 obj.TSR_customTPformula = '';
                 obj.TSR_customTPdamage = true;
                 obj.damage.type = obj.damage.type || 7; 

	} else if (line.match(/<\/(?:TP DAMAGE EVAL)>/i)) {
	         TPformulaEnable = false;

	} else if (TPformulaEnable) {
               obj.TSR_customTPformula = obj.TSR_customTPformula + line + '\n';
        } 
      }

      for (let i = 0; i < notedata.length; i++) {
        let line = notedata[i];
        if (line.match(noteTRecover1)) {    
           obj.TSR_TPrecover = true;
           obj.TSR_TPrecoverValue = parseInt(RegExp.$1);
           obj.damage.type = obj.damage.type || 8;

        } else if (line.match(noteTRecover2)) {
             obj.TSR_TPrecover = true;
             let val = parseFloat(RegExp.$1) * 0.01;
             obj.TSR_TPrecoverRatioValue = val;
             obj.damage.type = obj.damage.type || 8;

        } else if (line.match(noteTRecover3)) {
               obj.TSR_TPrecover = true;
               obj.damage.type = obj.damage.type || 8; 

        } else if (line.match(/<(?:TP RECOVER EVAL)>/i)) {
	         TPformulaEnable = true;
                 obj.TSR_TPrecover = true;
                 obj.TSR_customTPformula = '';
                 obj.TSR_customTPdamage = true;
                 obj.damage.type = obj.damage.type || 8; 

	} else if (line.match(/<\/(?:TP RECOVER EVAL)>/i)) {
	         TPformulaEnable = false;

	} else if (TPformulaEnable) {
                 obj.TSR_customTPformula = obj.TSR_customTPformula + line + '\n';
        }
      }
      
      for (let i = 0; i < notedata.length; i++) {
        let line = notedata[i];
        if (line.match(noteTDrain1)) {    
           obj.TSR_TPdrain = true;
           obj.TSR_TPdrainValue = parseInt(RegExp.$1);
           obj.damage.type = obj.damage.type || 9;

        } else if (line.match(noteTDrain2)) {
             obj.TSR_TPdrain = true;
             let val = parseFloat(RegExp.$1) * 0.01;
             obj.TSR_TPdrainRatioValue = val;
             obj.damage.type = obj.damage.type || 9;

        } else if (line.match(noteTDrain3)) {
               obj.TSR_TPdrain = true;
               obj.damage.type = obj.damage.type || 9; 

        } else if (line.match(/<(?:TP DRAIN EVAL)>/i)) {
	         TPformulaEnable = true;
                 obj.TSR_TPdrain = true;
                 obj.TSR_customTPformula = '';
                 obj.TSR_customTPdamage = true;
                 obj.damage.type = obj.damage.type || 9; 

	} else if (line.match(/<\/(?:TP DRAIN EVAL)>/i)) {
	         TPformulaEnable = false;

	} else if (TPformulaEnable) {
                 obj.TSR_customTPformula = obj.TSR_customTPformula + line + '\n';
        }
      }
    }
  };
  
  DataManager.read_Mp_Notetag = function(group) {
    let noteMDamage1 = /<(?:MP DAMAGE|DAMAGE MP):[ ](\d+)>/i; 
    let noteMDamage2 = /<(?:MP DAMAGE|DAMAGE MP):[ ](\d+)([%％])>/i;
    let noteMDamage3 = /<(?:MP DAMAGE FORMULA|DAMAGE MP FORMULA)>/i;

    let noteMRecover1 = /<(?:MP RECOVER|RECOVER MP):[ ](\d+)>/i;
    let noteMRecover2 = /<(?:MP RECOVER|RECOVER MP):[ ](\d+)([%％])>/i;
    let noteMRecover3 = /<(?:MP RECOVER FORMULA|RECOVER MP FORMULA)>/i;

    let noteMDrain1 = /<(?:MP DRAIN|DRAIN MP):[ ](\d+)>/i;
    let noteMDrain2 = /<(?:MP DRAIN|DRAIN MP):[ ](\d+)([%％])>/i;
    let noteMDrain3 = /<(?:MP DRAIN FORMULA|DRAIN MP FORMULA)>/i;
   
    for (let n = 1; n < group.length; n++) {
      let obj = group[n];
      let notedata = obj.note.split(/[\r\n]+/);
      let MPformulaEnable = false;

       obj.TSR_MPdamage = undefined;
       obj.TSR_MPrecover = undefined; 
       obj.TSR_MPdrain = undefined;
       obj.TSR_customMPdamage = false;

      for (let i = 0; i < notedata.length; i++) {
        let line = notedata[i];
        if (line.match(noteMDamage1)) {
           obj.TSR_MPdamage = true;
           let val = parseInt(RegExp.$1);
           obj.TSR_MPdamageValue = val;
           obj.damage.type = obj.damage.type || 2;

        } else if (line.match(noteMDamage2)) {
             obj.TSR_MPdamage = true;
             let val = parseFloat(RegExp.$1) * 0.01;
             obj.TSR_MPdamageRatioValue = val;
             obj.damage.type = obj.damage.type || 2;

        } else if (line.match(noteMDamage3)) {
               obj.TSR_MPdamage = true;
               obj.damage.type = obj.damage.type || 2; 

        } else if (line.match(/<(?:MP DAMAGE EVAL)>/i)) {
	         TPformulaEnable = true;
                 obj.TSR_MPdamage = true;
                 obj.TSR_customMPformula = '';
                 obj.TSR_customMPdamage = true;
                 obj.damage.type = obj.damage.type || 2; 

	} else if (line.match(/<\/(?:MP DAMAGE EVAL)>/i)) {
	         MPformulaEnable = false;

	} else if (MPformulaEnable) {
               obj.TSR_customMPformula = obj.TSR_customMPformula + line + '\n';
        } 
      }

      for (let i = 0; i < notedata.length; i++) {
        let line = notedata[i];
        if (line.match(noteMRecover1)) {    
           obj.TSR_MPrecover = true;
           obj.TSR_MPrecoverValue = parseInt(RegExp.$1);
           obj.damage.type = obj.damage.type || 4;

        } else if (line.match(noteMRecover2)) {
             obj.TSR_MPrecover = true;
             let val = parseFloat(RegExp.$1) * 0.01;
             obj.TSR_MPrecoverRatioValue = val;
             obj.damage.type = obj.damage.type || 4;

        } else if (line.match(noteMRecover3)) {
               obj.TSR_MPrecover = true;
               obj.damage.type = obj.damage.type || 4; 

        } else if (line.match(/<(?:MP RECOVER EVAL)>/i)) {
	         MPformulaEnable = true;
                 obj.TSR_MPrecover = true;
                 obj.TSR_customMPformula = '';
                 obj.TSR_customMPdamage = true;
                 obj.damage.type = obj.damage.type || 4; 

	} else if (line.match(/<\/(?:MP RECOVER EVAL)>/i)) {
	         MPformulaEnable = false;

	} else if (MPformulaEnable) {
                 obj.TSR_customMPformula = obj.TSR_customMPformula + line + '\n';
        }
      }
      
      for (let i = 0; i < notedata.length; i++) {
        let line = notedata[i];
        if (line.match(noteMDrain1)) {    
           obj.TSR_MPdrain = true;
           obj.TSR_MPdrainValue = parseInt(RegExp.$1);
           obj.damage.type = obj.damage.type || 6;

        } else if (line.match(noteMDrain2)) {
             obj.TSR_MPdrain = true;
             let val = parseFloat(RegExp.$1) * 0.01;
             obj.TSR_MPdrainRatioValue = val;
             obj.damage.type = obj.damage.type || 6;

        } else if (line.match(noteMDrain3)) {
               obj.TSR_MPdrain = true;
               obj.damage.type = obj.damage.type || 6; 

        } else if (line.match(/<(?:MP DRAIN EVAL)>/i)) {
	         MPformulaEnable = true;
                 obj.TSR_MPdrain = true;
                 obj.TSR_customMPformula = '';
                 obj.TSR_customMPdamage = true;
                 obj.damage.type = obj.damage.type || 6; 

	} else if (line.match(/<\/(?:MP DRAIN EVAL)>/i)) {
	         MPformulaEnable = false;

	} else if (MPformulaEnable) {
                 obj.TSR_customMPformula = obj.TSR_customMPformula + line + '\n';
        }
      }
    }
  };


//== GAME ==================================================================================

//== Game_Battler =====================================

TSR.Popups._Game_BattlerBase_initMembers = 
Game_BattlerBase.prototype.initMembers;
Game_BattlerBase.prototype.initMembers = function() {
  TSR.Popups._Game_BattlerBase_initMembers.call(this);
  this.tickElementRate = {};
  this.tickBaseRate = {};
};

if (Imported.YEP_BattleEngineCore) {
  Game_Battler.prototype.startDamagePopup = function() {
    var result = this.result();
    if (result.missed || result.evaded) {
      var copyResult = JsonEx.makeDeepCopy(result);
      copyResult.hpAffected = false;
      copyResult.mpDamage = 0;
      this._damagePopup.push(copyResult);
    }
    if (result._StateResistRequest && !result.hpAffected) {
      var copyResult = JsonEx.makeDeepCopy(result);
      this._damagePopup.push(copyResult);
    }
    if (result.tpDamage !== 0) {
      var copyResult = JsonEx.makeDeepCopy(result);
      copyResult.hpAffected = false;
      copyResult.mpDamage = 0;
      this._damagePopup.push(copyResult);
    }
    if (result.mpDamage !== 0) {
      var copyResult = JsonEx.makeDeepCopy(result);
      copyResult.hpAffected = false;
      copyResult.tpDamage = 0;
      this._damagePopup.push(copyResult);
    }    
    if (result.hpAffected) {
      var copyResult = JsonEx.makeDeepCopy(result);
      copyResult.mpDamage = 0;
      this._damagePopup.push(copyResult);
    }
  };
};
 
    TSR.Popups._Game_Battler_addState = Game_Battler.prototype.addState;
  Game_Battler.prototype.addState = function(stateId) {
    TSR.Popups._Game_Battler_addState.call(this, stateId);
    if (this.isEnemy()) {
      if (!BattleManager._isTickElementSetted) {
        BattleManager._isTickElementSetted = true;
        if (!this.tickElementRate[stateId]) this.setTickElementRate(stateId);
      }
    } else {
      if (!this.tickElementRate[stateId]) this.setTickElementRate(stateId);
    }
  };

    TSR.Popups._Game_Battler_removeState = Game_Battler.prototype.removeState;
  Game_Battler.prototype.removeState = function(stateId) {
    TSR.Popups._Game_Battler_removeState.call(this, stateId);
    BattleManager._isTickElementSetted = false;
    if (this.tickElementRate[stateId]) this.tickElementRate[stateId] = 0;
    if (this.tickBaseRate[stateId]) this.tickBaseRate[stateId] = 0;
  };

  Game_Battler.prototype.setTickElementRate = function(stateId) {
    let state = $dataStates[stateId]
    let traits = state.traits;
    for (let i = 0; i < traits.length; ++i) {
      let trait = traits[i];
      if (trait.code === 22 && trait.dataId === 7) { 
        let value = trait.value;
        if (!this.tickBaseRate[stateId]) this.tickBaseRate[stateId] = value;
        let elementList = state._tickElementDMG;
        if (elementList.length >= 1) {
          for (let t in state._tickElementDMG) {
            let rate = this.elementRate(state._tickElementDMG[t]);
            if (value > 0 && rate > 1) rate = -rate;
            if (value > 0 && rate < 0) {
              rate = -rate;
              value += Math.pow(value, 2);
              value = Math.floor(value * 100) / 100
            }
            if (!this.tickElementRate[stateId]) {
              this.tickElementRate[stateId] = value * rate;
            } 
          }
        } else {
          if (!this.tickElementRate[stateId]) {
              this.tickElementRate[stateId] = value;
          } 
        }
      }
    }
  };

  Game_BattlerBase.prototype.getTickElementRate = function() {
      let rate = 0
      for (let i in this.tickElementRate) {
        let elementRate = this.tickElementRate[i]
        rate += (elementRate)? 
                  this.tickElementRate[i] - this.tickBaseRate[i] : 0;
        if (elementRate === 0 && this.tickBaseRate[i] !== 0) this._elementImmune = true;
      }
      if (rate === 0 && this._elementImmune) return 0;
      else return rate + this.hrg;
  };

  Game_Battler.prototype.regenerateHp = function() {
    if (Imported.YEP_X_TickBasedRegen) {
      var value = Math.floor(this.mhp * this.hrg);
      value = Math.max(value, -this.maxSlipDamage());
      if (value) {
        this.gainHp(value);
      }
      this.result()._haveElementEffect = false
    } else {
      let preValue = Math.floor(this.mhp * this.hrg);
      preValue = Math.max(preValue, -this.maxSlipDamage());
      let value = Math.floor(this.mhp * this.getTickElementRate());
      value = Math.max(value, -this.maxSlipDamage());
      if (!Imported.YEP_X_ExtDoT) {
        this.checkElementalPopup(preValue, value);
      }
      if (value) {
        this.gainHp(value);
      }
    }
    this.result()._StateResistRequest = false
  };

  Game_Battler.prototype.checkElementalPopup = function(before, after) {
     let result = this.result();
     if (after !== before) { 
         if (after >= 0) {
           result._haveElementEffect = false;
           return;
         }
         if (after < before) {
            result.ElementWeak = true;
         } else if (after > before) {
            result.ElementResist = true;
         } 
         result.ElementImmune = 0;
         result._haveElementEffect = true;
     } else {
         result._haveElementEffect = false;
     }
  };

 
//== Game_Action =====================================

  Game_Action.prototype.itemEffectAddState = function(target, effect) {
    const stateId = effect.dataId;
    if (target.stateRate(stateId) === 0 ||
        target.isStateResist(stateId)) {
          target.result()._StateResistRequest = true;
    }
    if (stateId === 0) {
        this.itemEffectAddAttackState(target, effect);
    }   else {
        this.itemEffectAddNormalState(target, effect);
    }
  };

  Game_Action.prototype.executeDamage = function(target, value) {
    var result = target.result();
    result._haveElementEffect = (value < 0)? false : this.checkElementalResponse(target);
    let immune = result.ElementImmune
    if (value === 0 || !this.isHpEffect() || immune) {
        result.critical = false;
    }
    if (this.isHpEffect()) {
        if (target.hp <= 0) result.NoOverkill = true
        this.executeHpDamage(target, value);
        result.ReceivedHpDamage = true
    }
    if (this.isMpEffect() && !immune && target.hp > 0) {
        this.executeMpDamage(target, value);
        result.ReceivedMpDamage = true
    }
    if (this.isTpEffect() && !immune && target.hp > 0) {
        this.executeTpDamage(target, value);
        result.ReceivedTpDamage = true
    }
    if (result.critical && TSR.Popups.critical_show) {
        result._StateResistRequest = false
        result._haveElementEffect = false;
    }
  };
  
  Game_Action.prototype.isMpEffect = function() {
      return this.item().TSR_MPdamage ||
             this.item().TSR_MPrecover ||
             this.item().TSR_MPdrain ||
             this.checkDamageType([2, 4, 6]);
  };

  Game_Action.prototype.isTpEffect = function() {
      return this.item().TSR_TPdamage ||
             this.item().TSR_TPrecover ||
             this.item().TSR_TPdrain;
  };
  
  Game_Action.prototype.checkElementalResponse = function(target) {
    let result = target.result();
    let elementResponse = 1 * this.calcElementRate(target);
    if (elementResponse !== 1) { 
        if (elementResponse === 0) {
            result.ElementImmune = true;
        } else if (elementResponse === -1) {
          return false
        } else if (elementResponse < 1) {
            result.ElementResist = true;
        } else if (elementResponse > 1) {
            result.ElementWeak = true;
        } 
      return true;
    } 
  };

  Game_Action.prototype.executeTpDamage = function(target, value) {
    this.makeSuccess(target);
    let type = this.item();
    let val = value
    if (type.TSR_TPdamage) {
      if (type.TSR_TPdamageValue) {
        val = type.TSR_TPdamageValue;
      } else if (type.TSR_TPdamageRatioValue) {
        val = Math.floor(target.tp * type.TSR_TPdamageRatioValue);
      } else if (type.TSR_customTPdamage) {
        val = this.evalTPformula(target); 
      }
      target.gainTp(-val);
    }
    if (type.TSR_TPrecover) {
      if (type.TSR_TPrecoverValue) {
        val = type.TSR_TPrecoverValue;
      } else if (type.TSR_TPrecoverRatioValue) {
        val = Math.floor(target.tp * type.TSR_TPrecoverRatioValue);
      } else if (type.TSR_customTPdamage) {
        val = this.evalTPformula(target); 
      }
      target.gainTp(val);
    }
    if (type.TSR_TPdrain) {
      if (type.TSR_TPdrainValue) {
        val = type.TSR_TPdrainValue;
      } else if (type.TSR_TPdrainRatioValue) {
        val = Math.floor(target.tp * type.TSR_TPdrainRatioValue);
      } else if (type.TSR_customTPdamage) {
        val = this.evalTPformula(target); 
      }
      target.gainTp(-val);
      this.gainDrainedTP(val)
    }
  };

  Game_Action.prototype.executeMpDamage = function(target, value) {
    if (value !== 0) this.makeSuccess(target);
    let type = this.item();
    let val = value
    if (!type.TSR_MPdamage && !type.TSR_MPrecover && !type.TSR_MPdrain) {
      target.gainMp(-val);
      this.gainDrainedMp(val)
    }
    if (type.TSR_MPdamage) {
      if (type.TSR_MPdamageValue) {
        val = type.TSR_MPdamageValue;
      } else if (type.TSR_MPdamageRatioValue) {
        val = Math.floor(target.mp * type.TSR_MPdamageRatioValue);
      } else if (type.TSR_customMPdamage) {
        val = this.evalMPformula(target); 
      }
      target.gainMp(-val);
    }
    if (type.TSR_MPrecover) {
      if (type.TSR_MPrecoverValue) {
        val = type.TSR_MPrecoverValue;
      } else if (type.TSR_MPrecoverRatioValue) {
        val = Math.floor(target.mp * type.TSR_MPrecoverRatioValue);
      } else if (type.TSR_customMPdamage) {
        val = this.evalMPformula(target); 
      }
      target.gainMp(val);
    }
    if (type.TSR_MPdrain) {
      if (type.TSR_MPdrainValue) {
        val = type.TSR_MPdrainValue;
      } else if (type.TSR_MPdrainRatioValue) {
        val = Math.floor(target.mp * type.TSR_MPdrainRatioValue);
      } else if (type.TSR_customMPdamage) {
        val = this.evalMPformula(target); 
      }
      target.gainMp(-val);
      this.gainDrainedMp(val)
    }
  };
  
  Game_Action.prototype.gainDrainedTP = function(value) {
    let TPreceiver = this.subject();
    if (this._reflectionTarget !== undefined) {
      TPreceiver = this._reflectionTarget;
    }
    TPreceiver.gainTp(value);
  };
  
  Game_Action.prototype.setupBattle = function() {
    if (this.item()) Game_Action.prototype.setupBattle.call(this);
  };

  Game_Action.prototype.evalMPformula = function(target) {
   try {
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var subject = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var MPvalue = 0;
     if (item.TSR_customMPdamage) {
       eval(item.TSR_customMPformula);
       MPvalue = Math.max(MPvalue, 0);
     } else {
      MPvalue = Math.max(eval(item.TSR_customMPformula), 0);
     }
      return MPvalue;
    } catch (e) {
      return 0;
    }
  };

  Game_Action.prototype.evalTPformula = function(target) {
   try {
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var subject = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var TPvalue = 0;
     if (item.TSR_customTPdamage) {
       eval(item.TSR_customTPformula);
       TPvalue = Math.max(TPvalue, 0);
     } else {
      TPvalue = Math.max(eval(item.TSR_customTPformula), 0);
     }
      return TPvalue;
    } catch (e) {
      return 0;
    }
  };


//== SCENE ================================================================================
  
//== Scene_Boot =====================================

    TSR.Popups.loadSystemImages = Scene_Boot.loadSystemImages
  Scene_Boot.loadSystemImages = function() {
    TSR.Popups.loadSystemImages.call(this);
    if (TSR.Popups.sheet_enable) {
      ImageManager.reserveSystem('TSR_Damage');
    } else {
      ImageManager.reserveSystem('Damage');
    }
  };
  

//== SPRITE ================================================================================
  
//== Sprite_Damage =====================================

    TSR.Popups.Sprite_Damage_initialize = Sprite_Damage.prototype.initialize;
  Sprite_Damage.prototype.initialize = function() {
    TSR.Popups.Sprite_Damage_initialize.call(this);
    this._duration = TSR.Popups.popup_duration || 90;
    if (TSR.Popups.sheet_enable) {
      this._damageBitmap = ImageManager.loadSystem('TSR_Damage');
    } else {
      this._damageBitmap = ImageManager.loadSystem('Damage');
    }
  };


if (Imported.YEP_BattleEngineCore) {
  Sprite_Damage.prototype.setup = function(target) {
    this._result = target.shiftDamagePopup();
    let result = this._result;
    let dam = result.tpDamage || 0;
    let damm = result.mpDamage || 0;
    let critical = result.critical;
    let overkill = this.CheckOverkill(target, result) 
    let alive = target.isAlive() && target.hp > 0;
    if (result.missed || result.evaded) {
        if (TSR.Popups.sheet_enable || TSR.Popups.string_enable) {
          this.createEffects('miss');
        } else {
          this.createMiss();
        } 
    } else {
      if (this.isStateElementVisible(critical, overkill)) {
        if (result._StateResistRequest && TSR.Popups.state_show && alive) {
          this.createEffects('state');
        }  
      }
      if (result.hpAffected) {
          this.createDigits(0, result.hpDamage, 'hp'); 
          if (critical && TSR.Popups.critical_show) {
            this.setupCriticalEffect();
            this.createEffects('critical');
          } else if (critical) {
            this._flashColor = [255, 0, 0, 160];
            this._flashDuration = 60;
          }           
          if (overkill && TSR.Popups.overkill_show) {
            this.setupOverkillEffect();
            this.createEffects('overkill');
          } 
          if (this.isStateElementVisible(critical, overkill)) {
            if (result._haveElementEffect && TSR.Popups.element_show && alive) {
              this.prepareElementalEffect(result);
            }        
          }
      } else if (alive && damm !== 0) {
          let row = this.getMPdamageRow();
          this.createDigits(row, damm, 'mp');
      } else if (alive && dam !== 0) {
          let row = this.getTPdamageRow();
          this.createDigits(row, dam, 'tp');
      } 
    }
  };

} else {
  Sprite_Damage.prototype.setup = function(target) {
    let result = target.result();
    this._result = result;
    let dam = result.tpDamage || 0;
    let damm = result.mpDamage || 0;
    let critical = result.critical;
    let overkill = this.CheckOverkill(target, result) 
    let alive = target.isAlive() && target.hp > 0;
    if (result.missed || result.evaded) {
        if (TSR.Popups.sheet_enable || TSR.Popups.string_enable) {
          this.createEffects('miss');
        } else {
          this.createMiss();
        } 
    } else {
      if (this.isStateElementVisible(critical, overkill)) {
        if (result._StateResistRequest && TSR.Popups.state_show && alive) {
          this.createEffects('state');
        }     
      }   
       if (result.hpAffected) {
           this.createDigits(0, result.hpDamage, 'hp');   
           if (critical && TSR.Popups.critical_show) {
             this.setupCriticalEffect();
             this.createEffects('critical');
           } else if (critical) {
             this._flashColor = [255, 0, 0, 160];
             this._flashDuration = 60;
           }
           if (overkill && TSR.Popups.overkill_show) {
             this.setupOverkillEffect();
             this.createEffects('overkill');
           } 
           if (this.isStateElementVisible(critical, overkill)) {
             if (result._haveElementEffect && TSR.Popups.element_show && alive) {
               this.prepareElementalEffect(result);
             }        
           }        
       }
       if (alive && damm !== 0) {
         let row = this.getMPdamageRow();
         this.createDigits(row, damm, 'mp');
       } 
       if (alive && dam !== 0) {
         let row = this.getTPdamageRow();
         this.createDigits(row, dam, 'tp');
       }        
    }
  };
};

  Sprite_Damage.prototype.isStateElementVisible = function(critical, overkill) {
     if (critical && TSR.Popups.critical_show) return false
     if (overkill && TSR.Popups.overkill_show) return false
     return true;
  };

  Sprite_Damage.prototype.getMPdamageRow = function() {
    if (TSR.Popups.sheet_enable) {
      if (TSR.Popups.mp_colorSheme === 'Orange/Purple') return 5;
      else return 2;
    } else {
      return 2;
    }
  };
  
  Sprite_Damage.prototype.getTPdamageRow = function() {
   if (TSR.Popups.sheet_enable) {
      if (TSR.Popups.tp_colorSheme === 'Yellow/Blue') return 2;
      else return 5;
    } else {
      return 2;
    }
  };
  
  Sprite_Damage.prototype.CheckOverkill = function(target, result) {
       let ratio = TSR.Popups.overkill_formula
       let damage = result.hpDamage
       let nooverkill = result.NoOverkill
       return target.hp <= 0 && !nooverkill && damage >= ratio * target.mhp;
  };

  Sprite_Damage.prototype.digitWidth = function() {
    if (TSR.Popups.sheet_enable) {
      return this._damageBitmap ? this._damageBitmap.width / 15 : 0;
    } else {
      return this._damageBitmap ? this._damageBitmap.width / 10 : 0;
    } 
  };

  Sprite_Damage.prototype.digitHeight = function() {
    if (TSR.Popups.sheet_enable) {
      return this._damageBitmap ? this._damageBitmap.height / 8 : 0;
    } else {
      return this._damageBitmap ? this._damageBitmap.height / 5 : 0;
    } 
    
  };
  
  Sprite_Damage.prototype.setupOverkillEffect = function() {
    let ScreenFlashColor = TSR.Popups.overkill_flashCol;
    let ScreenFlashDuration = TSR.Popups.overkill_flashDur;
    let SE = TSR.Popups.overkill_SE;
    if (SE) AudioManager.playSe(SE);
    $gameScreen.startFlash(ScreenFlashColor, ScreenFlashDuration);
  };

  Sprite_Damage.prototype.setupCriticalEffect = function() {
    let ScreenFlashColor = TSR.Popups.critical_flashCol;
    let ScreenFlashDuration = TSR.Popups.critical_flashDur;
    let SE = TSR.Popups.critical_SE;
    if (SE) AudioManager.playSe(SE);
    $gameScreen.startFlash(ScreenFlashColor, ScreenFlashDuration);
  };

  Sprite_Damage.prototype.setupImmuneEffect = function() {
    let ScreenFlashColor = TSR.Popups.element_imFlashCol;
    let ScreenFlashDuration = TSR.Popups.element_imFlashDur;
    let SE = TSR.Popups.element_SE;
    if (SE) AudioManager.playSe(SE);
    $gameScreen.startFlash(ScreenFlashColor, ScreenFlashDuration);
  };

  Sprite_Damage.prototype.createDigits = function(baseRow, value, info) {
    let string = Math.abs(value).toString();
    let row = baseRow + (value < 0 ? 1 : 0);
    let enableString = TSR.Popups.string_enable;
    if (!enableString) {
      if (TSR.Popups.sheet_enable && (info === 'mp' || info === 'tp')) {
        if (TSR.Popups.mp_operators ||
            TSR.Popups.tp_operators) this.createOperators(row, string, info);
        if (TSR.Popups.mp_letters ||
            TSR.Popups.tp_letters) this.createLetters(row, string, info);
      }
      let w = this.digitWidth();
      let h = this.digitHeight();
      for (var i = 0; i < string.length; i++) {
          let sprite = this.createChildSprite(info);
          let n = Number(string[i]);
          sprite.setFrame(n * w, row * h, w, h);
          sprite.x = (i - (string.length - 1) / 2) * w;
          sprite.dy = -i;
      }
    } else {
      if (value !== 0) this.createPrefix(string, row, info)
      this.createSuffix(string, row, info)
      for (var i = 0; i < string.length; i++) {
          let sprite = this.createStringChildSprite(string[i], row, info);
          let w = sprite.bitmap.measureTextWidth(string[i])
          sprite.x = (i - (string.length - 1) / 2) * w;
          sprite.dy = -i;
      }      
    }
  };

  Sprite_Damage.prototype.createChildSprite = function(info) {
    var sprite = new Sprite();
    sprite.bitmap = this._damageBitmap;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = this.getAnchor(info);
    sprite.y = -1 * TSR.Popups.popup_drop;
    sprite.ry = sprite.y;
    this.addChild(sprite);
    return sprite;
  };

  Sprite_Damage.prototype.createStringChildSprite = function(string, row, info) {
    let color;
    if (TSR.Popups.digitInfo[info]) {
      color = (row === 0 || row === 2 || row === 5)? 
                       TSR.Popups.digitInfo[info].damage.color || '':
                     TSR.Popups.digitInfo[info].recovery.color || '';
    } else {
      color = TSR.Popups.effectInfo[info].color || '';
    }
    let fontSize = TSR.Popups.string_fontSize;
    let pad = fontSize * 0.36;
    let height = fontSize + pad;
    let sprite = new Sprite(new Bitmap(190, height));
    sprite.bitmap.fontSize = fontSize;
    sprite.bitmap.fontFace = TSR.Popups.string_fontFace || 'GameFont';
    sprite.bitmap.textColor = this.getPopupDefaultColor(row, info)
    sprite.bitmap.outlineColor = '#000000';
    sprite.bitmap.outlineWidth = 5;
    sprite.anchor.x = 0;
    sprite.anchor.y = this.getAnchor(info);
    sprite.y = -1 * TSR.Popups.popup_drop;
    sprite.ry = sprite.y;
    sprite.bitmap.drawText(color + string, 10, 0, 200, height);
    this.addChild(sprite);
    return sprite;
  };

  Sprite_Battler.prototype.pushDamageSprite = function(sprite) {
    var heightBuffer = TSR.Popups.popup_anchor;
    if (Yanfly.Param.BECNewPopBottom) {
      this._damages.push(sprite);
      this._damages.forEach(function(spr) {
        for (var i = 0; i < spr.children.length; i++) {
          childSprite = spr.children[i];
          childSprite.anchor.y += heightBuffer;
        }
      }, this);
    } else {
      this._damages.push(sprite);
      heightBuffer *= this._damages.length
      for (var i = 0; i < sprite.children.length; i++) {
        childSprite = sprite.children[i];
        childSprite.anchor.y += heightBuffer;
      }
    }
  };

  Sprite_Damage.prototype.createPrefix = function(string, row, info) {
    if (TSR.Popups.string_enable) {
      let prefix = (row === 0 || row === 2 || row === 5)?
                                  TSR.Popups.digitInfo[info].damage.prefix || '' :
                                  TSR.Popups.digitInfo[info].recovery.prefix || '';
      let sprite = this.createStringChildSprite(prefix, row, info);
      let w = sprite.bitmap.measureTextWidth(string[0]);
      sprite.x -= ((string.length - (string.length - 1) / 2) * w) + w / 2;  
      sprite.dy = 0;
    }
  };

  Sprite_Damage.prototype.createSuffix = function(string, row, info) {
    if (TSR.Popups.string_enable) {
      let suffix = (row === 0 || row === 2 || row === 5)?   
                                  TSR.Popups.digitInfo[info].damage.suffix || '' :
                                  TSR.Popups.digitInfo[info].recovery.suffix || '';
      let sprite = this.createStringChildSprite(suffix, row, info);
      let w = sprite.bitmap.measureTextWidth(string[0]);
      sprite.x = ((string.length - (string.length - 1) / 2) * w) + w / 2; 
      sprite.dy = -string.length;
    }
  };

  Sprite_Damage.prototype.getPopupDefaultColor = function(row, info) {
    if (info === 'mp') {
      return (row === 0 || row === 2 || row === 5)? '#E9967a' : '#ba55d3';
    } else if (info === 'tp') {
      return (row === 0 || row === 2 || row === 5)? '#f0e68c' : '#87cefa';
    } else if (info === 'critical') {
      return '#ff4500';
    } else if (info === 'overkill') {
      return '#ffa500';
    } else if (info === 'immune') {
      return '#ba55d3';
    } else if (info === 'resist') {
      return '#3cb371';
    } else if (info === 'weak') {
      return '#f0e68c';
    } else {
      return (row % 2 === 0)? '#ffffff' : '#7fff00';
    }
  };
 
  Sprite_Damage.prototype.getAnchor = function(info) {
    let anc = TSR.Popups.popup_anchor;
    let anchor = 1;
    let result = this._result;
    if (info === 'mp') {
      if (result.ReceivedHpDamage && !Imported.YEP_BattleEngineCore) anchor += anc;
    } else if (info === 'tp') {
      if (result.ReceivedHpDamage && !Imported.YEP_BattleEngineCore) anchor += anc;
      if (result.ReceivedMpDamage && !Imported.YEP_BattleEngineCore) anchor += anc;
    } else if (info === 'critical' ||
               info === 'resist'   ||
               info === 'weak'     ||
               info === 'immune'   ) {
      anchor -= anc;
    } else if (info === 'overkill') {
      anchor -= anc;
      if (this._result.critical) anchor -= anc;
    } else if (info === 'state') {
      anchor -= anc;
      if (this._result._haveElementEffect) anchor -= anc;
    } 
    return anchor;   
  };

  Sprite_Damage.prototype.createOperators = function(row, string, info) {
      let w = this.digitWidth();
      let h = this.digitHeight();
      let sprite = this.createChildSprite(info);
      sprite.setFrame(14 * w, row * h, w, h);
      let length = string.length;
      sprite.x -= ((length - (length - 1) / 2) * w); 
      sprite.dy = 0;
  };

  Sprite_Damage.prototype.createLetters = function(row, string, info) {
      let w   = this.digitWidth();
      let h   = this.digitHeight();
      let col = (info === 'tp')? 10 : 12;
      let sprite = this.createChildSprite(info);
      sprite.setFrame(col * w, row * h, 2 * w, h);
      let length = string.length;
      sprite.x = ((length - (length - 1) / 2) * w) + 12;
      sprite.dy = -length;  
  };

  Sprite_Damage.prototype.createEffects = function(info) {
           let w = this.digitWidth(),
               h = this.digitHeight(),
             col = TSR.Popups.effectInfo[info].col,
             row = TSR.Popups.effectInfo[info].row,
             wid = TSR.Popups.effectInfo[info].wid,
          string = TSR.Popups.effectInfo[info].string,
    enableString = TSR.Popups.effectInfo[info].enb;
    if (!enableString) {
      if (TSR.Popups.sheet_enable) {
        let sprite = this.createChildSprite(info);
        sprite.setFrame(col * w, row * h, wid * w, h);
        sprite.dy = 0;
      }
    } else if (string) {
      for (var i = 0; i < string.length; i++) {
          let sprite = this.createStringChildSprite(string[i], 0, info);
          let w = sprite.bitmap.measureTextWidth(string[i])
          sprite.x = (i - (string.length - 1) / 2) * w;
          sprite.dy = -i;
      }      
    }
  };

  Sprite_Damage.prototype.prepareElementalEffect = function(result) {
     let info = '';
     if (result.ElementImmune) {
        info = 'immune';
        this.setupImmuneEffect();
     } else if (result.ElementResist) {
        info = 'resist';
        if (!TSR.Popups.effectInfo[info].enb) {
          this._flashColor = [0, 255, 150, 160];
          this._flashDuration = 60;
        }
     } else if (result.ElementWeak) {
        info = 'weak';
        if (!TSR.Popups.effectInfo[info].enb) {
          this._flashColor = [180, 180, 0, 160];
          this._flashDuration = 60;
        }
     }
     if (info) this.createEffects(info);
  };


//== END ===================================================================================
//==========================================================================================